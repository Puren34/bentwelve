import { neon } from '@neondatabase/serverless';

// Interface for products (matches the database schema)
export interface Product {
  id_produk: string;
  nama_produk: string;
  harga: string;
  kategori: string;
  gambar: string;
}

// Interface for transactions (matches the database schema)
export interface Transaction {
  id_transaksi: string;
  id_produk: string;
  nama_pembeli: string;
  tanggal: string;
  total_harga: string;
}

// Interface for monthly sales data
export interface MonthlySales {
  month: string;
  sales: number;
}

// Interface for most sold product
export interface MostSoldProduct {
  id_produk: string;
  nama_produk: string;
  total_sold: number;
}

// Initialize database connection
function getDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  return neon(process.env.DATABASE_URL);
}

// Fetch products with optional search term
export async function fetchProducts(searchTerm: string = ''): Promise<Product[]> {
  const sql = getDatabase();
  try {
    const products = await sql`
      SELECT id_produk, nama_produk, harga, kategori, gambar
      FROM public.products
      WHERE nama_produk ILIKE ${'%' + searchTerm + '%'}
    ` as Product[];
    console.log('Fetched products:', products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch transactions
export async function fetchTransactions(): Promise<Transaction[]> {
  const sql = getDatabase();
  try {
    const transactions = await sql`
      SELECT id_transaksi, id_produk, nama_pembeli, tanggal, total_harga
      FROM public.transactions
      ORDER BY tanggal DESC
    ` as Transaction[];
    console.log('Fetched transactions:', transactions);
    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

// Fetch total number of products
export async function fetchTotalProducts(): Promise<number> {
  const sql = getDatabase();
  try {
    const result = await sql`
      SELECT COUNT(*) as total
      FROM public.products
    `;
    return Number(result[0].total) || 0;
  } catch (error) {
    console.error('Error fetching total products:', error);
    return 0;
  }
}

// Fetch total revenue from transactions
export async function fetchTotalRevenue(): Promise<number> {
  const sql = getDatabase();
  try {
    const result = await sql`
      SELECT SUM(CAST(REPLACE(total_harga, 'Rp', '') AS INTEGER)) as total
      FROM public.transactions
    `;
    return Number(result[0].total) || 0;
  } catch (error) {
    console.error('Error fetching total revenue:', error);
    return 0;
  }
}

// Fetch most sold product
export async function fetchMostSoldProduct(): Promise<MostSoldProduct | null> {
  const sql = getDatabase();
  try {
    const result = await sql`
      SELECT t.id_produk, p.nama_produk, COUNT(t.id_produk) as total_sold
      FROM public.transactions t
      JOIN public.products p ON t.id_produk = p.id_produk
      GROUP BY t.id_produk, p.nama_produk
      ORDER BY total_sold DESC
      LIMIT 1
    ` as MostSoldProduct[];
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching most sold product:', error);
    return null;
  }
}

// Fetch monthly sales data for the chart
export async function fetchMonthlySales(): Promise<MonthlySales[]> {
  const sql = getDatabase();
  try {
    const result = await sql`
      SELECT 
        TO_CHAR(tanggal, 'Mon') as month,
        SUM(CAST(REPLACE(total_harga, 'Rp', '') AS INTEGER)) as sales
      FROM public.transactions
      WHERE tanggal >= '2025-01-01' AND tanggal < '2025-07-01'
      GROUP BY TO_CHAR(tanggal, 'Mon'), EXTRACT(MONTH FROM tanggal)
      ORDER BY EXTRACT(MONTH FROM tanggal)
    ` as MonthlySales[];
    return result;
  } catch (error) {
    console.error('Error fetching monthly sales:', error);
    return [];
  }
}