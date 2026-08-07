import { prisma } from '@/app/lib/prisma';

export interface Product { id: string; name: string; price: number; category: string; image: string; }
export interface MonthlyRevenue { month: string; revenue: number; }
export interface MonthlyExpense { month: string; expenses: number; }
export interface MostSoldProduct { id_produk: string; nama_produk: string; total_sold: number; }
export interface Invoice { id: string; name: string; email: string; amount: number; date: string; status: 'paid' | 'pending' | 'overdue'; image_url: string; }
export interface Transaction { id_transaksi: string; id_produk: string; nama_pembeli: string; tanggal: string; total_harga: number; status?: string; }

const PAGE_SIZE = 10;
const searchWhere = (searchTerm = '') => ({ nama_produk: { contains: searchTerm, mode: 'insensitive' as const } });
const mapProduct = (product: any): Product => ({ id: product.id_produk, name: product.nama_produk, price: Number(product.harga), category: product.kategori, image: product.gambar || '' });
const toMonth = (date: Date, short = false) => date.toLocaleString('en-US', { month: short ? 'short' : '2-digit', year: short ? undefined : 'numeric', timeZone: 'UTC' }).replace(',', '').replace(' ', short ? '' : '-');

export async function fetchProducts(searchTerm = '', currentPage = 1) {
  const products = await prisma.products.findMany({ where: searchWhere(searchTerm), orderBy: { created_at: 'desc' }, skip: (currentPage - 1) * PAGE_SIZE, take: PAGE_SIZE });
  return products.map(mapProduct);
}
export async function fetchAllProducts(searchTerm = '') { return (await prisma.products.findMany({ where: searchWhere(searchTerm), orderBy: { created_at: 'desc' } })).map(mapProduct); }
export async function fetchProductCount(searchTerm = '') { return prisma.products.count({ where: searchWhere(searchTerm) }); }
export async function fetchTotalUsers() { return prisma.users.count(); }
export async function fetchTransactions(currentPage = 1) {
  const rows = await prisma.transactions.findMany({ orderBy: { tanggal: 'desc' }, skip: (currentPage - 1) * PAGE_SIZE, take: PAGE_SIZE });
  return rows.map((row) => ({ ...row, total_harga: Number(row.total_harga) }));
}

export async function fetchMonthlyRevenue(): Promise<MonthlyRevenue[]> {
  const [transactions, expenses] = await Promise.all([
    prisma.transactions.findMany({ where: { tanggal: { gte: new Date('2025-01-01'), lt: new Date('2025-07-01') } }, select: { tanggal: true, total_harga: true } }),
    prisma.expenses.findMany({ where: { tanggal: { gte: new Date('2025-01-01'), lt: new Date('2025-07-01') } }, select: { tanggal: true, jumlah_pengeluaran: true } }),
  ]);
  const totals = new Map<string, number>();
  for (const row of transactions) { const key = toMonth(row.tanggal); totals.set(key, (totals.get(key) || 0) + Number(row.total_harga)); }
  for (const row of expenses) { const key = toMonth(row.tanggal); totals.set(key, (totals.get(key) || 0) - Number(row.jumlah_pengeluaran)); }
  return [...totals].sort(([a], [b]) => a.localeCompare(b)).map(([month, revenue]) => ({ month, revenue }));
}
export async function fetchMostSoldProduct(): Promise<MostSoldProduct | null> {
  const product = await prisma.products.findFirst({ orderBy: { total_sold: 'desc' } });
  return product ? { id_produk: product.id_produk, nama_produk: product.nama_produk, total_sold: product.total_sold } : null;
}
export async function fetchFilteredInvoices(_query = '', _currentPage = 1): Promise<Invoice[]> { return []; }
export async function fetchFilteredTransactions(query = '', currentPage = 1) {
  const rows = await prisma.transactions.findMany({ where: { nama_pembeli: { contains: query, mode: 'insensitive' } }, orderBy: { tanggal: 'desc' }, skip: (currentPage - 1) * PAGE_SIZE, take: PAGE_SIZE });
  return rows.map((row) => ({ ...row, total_harga: Number(row.total_harga) }));
}
export async function fetchTransactionCount(query = '') { return prisma.transactions.count({ where: { nama_pembeli: { contains: query, mode: 'insensitive' } } }); }
export async function fetchTotalTransactions() { return prisma.transactions.count(); }
export async function fetchMonthlyExpenses(): Promise<MonthlyExpense[]> {
  const rows = await prisma.expenses.findMany({ where: { tanggal: { gte: new Date('2025-01-01'), lt: new Date('2025-07-01') } } });
  const totals = new Map<string, number>();
  for (const row of rows) { const key = toMonth(row.tanggal); totals.set(key, (totals.get(key) || 0) + Number(row.jumlah_pengeluaran)); }
  return [...totals].sort(([a], [b]) => a.localeCompare(b)).map(([month, expenses]) => ({ month, expenses }));
}
export interface MonthlySales { month: string; sales: number; }
export async function fetchMonthlySales(): Promise<MonthlySales[]> {
  const rows = await prisma.transactions.findMany({ select: { tanggal: true, total_harga: true } });
  const totals = new Map<string, number>();
  for (const row of rows) { const key = toMonth(row.tanggal, true); totals.set(key, (totals.get(key) || 0) + Number(row.total_harga)); }
  return [...totals].map(([month, sales]) => ({ month, sales }));
}
export async function fetchCardData() {
  const snapshot = new Date('2025-05-31T23:59:59');
  const [totalProducts, totalUsers, transactions, expenses, prevProducts, prevUsers, prevTransactions, prevExpenses] = await Promise.all([
    prisma.products.count(), prisma.users.count(), prisma.transactions.findMany({ select: { total_harga: true } }), prisma.expenses.findMany({ select: { jumlah_pengeluaran: true } }),
    prisma.product_history.count({ where: { snapshot_date: snapshot } }), prisma.user_history.count(),
    prisma.transaction_history.findMany({ where: { snapshot_date: snapshot }, select: { total_harga: true } }), prisma.expense_history.findMany({ where: { snapshot_date: snapshot }, select: { jumlah_pengeluaran: true } }),
  ]);
  const sum = (rows: any[], field: string) => rows.reduce((total, row) => total + Number(row[field] || 0), 0);
  const totalProfit = sum(transactions, 'total_harga') - sum(expenses, 'jumlah_pengeluaran');
  const prevProfit = sum(prevTransactions, 'total_harga') - sum(prevExpenses, 'jumlah_pengeluaran');
  return { totalProducts, totalUsers, totalProfit, productChange: totalProducts - prevProducts, userChange: totalUsers - prevUsers, profitChange: prevProfit ? ((totalProfit - prevProfit) / Math.abs(prevProfit)) * 100 : 0 };
}
export interface BestSellingProduct { name: string; sales: number; price: number; }
export async function fetchBestSellingProducts(): Promise<BestSellingProduct[]> {
  const rows = await prisma.products.findMany({ orderBy: { total_sold: 'desc' }, take: 5 });
  return rows.map((row) => ({ name: row.nama_produk, sales: row.total_sold, price: Number(row.harga) }));
}
export interface LatestTransaction { title: string; date: string; status: string; total_harga: number; }
export async function fetchLatestTransactions(): Promise<LatestTransaction[]> {
  const rows = await prisma.transactions.findMany({ orderBy: { tanggal: 'desc' }, take: 3 });
  return rows.map((row) => ({ title: row.nama_pembeli, date: row.tanggal.toISOString(), status: row.status, total_harga: Number(row.total_harga) }));
}
export async function fetchProductById(id: string) { const product = await prisma.products.findUnique({ where: { id_produk: id } }); return product ? mapProduct(product) : null; }
