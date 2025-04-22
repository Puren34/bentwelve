import { neon } from '@neondatabase/serverless';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Interface for a product (matches the database schema)
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

// Define the props type for a dynamic route with params
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FlowerDetailPage({ params }: PageProps) {
  // Validate environment variable
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  const sql = neon(process.env.DATABASE_URL);

  // Await the params Promise to get the dynamic route parameter
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  // Validate the productId
  if (isNaN(productId)) {
    notFound(); // Redirect to 404 page if the ID is invalid
  }

  // Fetch the product from the database
  let product: Product | null = null;
  try {
    const result = (await sql`
      SELECT id, name, price, category, image, stock
      FROM public.products
      WHERE id = ${productId}
    `) as Product[];
    product = result[0] || null;
    console.log('Fetched product:', product); // Debug log
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound(); // Redirect to 404 page if there's an error
  }

  // If no product is found, redirect to 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="p-6 md:p-8 min-h-screen">
      {/* Header with Flower Details and ProfileSummary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 relative">
        <h1 className="text-3xl font-bold text-gray-800">Detail Bunga</h1>
        <div className="fixed top-6 right-4 flex items-center gap-4 p-4 bg-white text-black rounded-2xl shadow-lg w-64 z-50 mt-4 md:mt-0">
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

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-48 h-48 rounded-lg object-cover mx-auto md:mx-0"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">Price: Rp {product.price.toLocaleString('id-ID')}</p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}