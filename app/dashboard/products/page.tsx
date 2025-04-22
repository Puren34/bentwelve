import { neon } from '@neondatabase/serverless';
import Image from 'next/image';
import { redirect } from 'next/navigation';

// Interface for products (matches the database schema)
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export default async function ProductsPage({ searchParams }: { searchParams: { search?: string } }) {
  // Validate environment variable
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  const sql = neon(process.env.DATABASE_URL);

  // Get search term from query params
  const searchTerm = searchParams.search || '';

  // Fetch products from the database
  let products: Product[] = [];
  try {
    products = (await sql`
      SELECT id, name, price, category, image
      FROM public.products
      WHERE name ILIKE ${'%' + searchTerm + '%'}
    `) as Product[];
    console.log('Fetched products:', products); // Debug log
  } catch (error) {
    console.error('Error fetching products:', error);
    products = []; // Fallback to empty array
  }

  // Server action to handle search form submission
  async function search(formData: FormData) {
    'use server';
    const searchTerm = formData.get('search')?.toString() || '';
    redirect(`/dashboard/products?search=${encodeURIComponent(searchTerm)}`);
  }

  // Server actions for navigation
  async function handleAdd() {
    'use server';
    redirect('/dashboard/products/tambah');
  }

  async function handleEdit(id: number) {
    'use server';
    redirect(`/dashboard/products/edit?id=${id}`);
  }

  return (
    <div className="p-6 min-h-screen">
      {/* Products Header with ProfileSummary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <div className="flex items-center gap-4 p-4 bg-white text-black rounded-2xl shadow-lg w-64 mt-4 md:mt-0">
          <Image
            src="/Kucing.png"
            alt="User Profile"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-4 border-green-500"
          />
          <div className="text-right flex-1">
            <p className="font-semibold text-base">Welcome, Monkey</p>
            <p className="text-sm text-gray-500 truncate">monkey@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-16">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 text-lg">
            🔍
          </span>
          <form action={search as any}>
            <input
              type="text"
              name="search"
              placeholder="Search Menu"
              defaultValue={searchTerm}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-sm focus:outline-none focus:ring-0 focus:shadow-none"
              style={{ outline: "none", boxShadow: "none", border: "1px solid #ddd" }}
            />
          </form>
        </div>

        <form action={handleAdd as any}>
          <button
            type="submit"
            className="ml-6 bg-pink-500 text-white px-5 py-2 rounded shadow"
            style={{ backgroundColor: '#D3628B' }}
          >
            + Add New
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 items-start">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-4 flex flex-col items-center w-56"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={128}
                height={128}
                className="rounded-full w-32 h-32 object-cover -mt-12 z-10 shadow"
              />
              <h3 className="font-semibold text-lg mt-10">{product.name}</h3>
              <p className="text-black-600 mt-6">Rp.{product.price}</p>
              <p className="text-sm mb-6 text-[#8A4F2F]">{product.category}</p>

              <div className="flex gap-3">
                <form action={handleEdit.bind(null, product.id) as any}>
                  <button
                    type="submit"
                    className="text-gray-600 hover:text-black text-lg"
                  >
                    ✏️
                  </button>
                </form>
                <button className="text-red-500 hover:text-red-700 text-lg">
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}