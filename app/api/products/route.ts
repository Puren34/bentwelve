import { NextResponse } from "next/server";
import { Pool } from "pg";

// Configure the database connection (replace with your NeonDB credentials)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g., "postgresql://user:password@host:port/dbname"
  ssl: true,
});

// GET request to fetch products
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT id_produk, nama_produk, harga, gambar, kategori, deskripsi FROM products");
    await client.release();

    const products = result.rows.map((row) => ({
      id_produk: row.id_produk,
      title: row.nama_produk,
      price: row.harga,
      img: row.gambar || "/default-image.jpg", // Fallback image if gambar is null
      category: row.kategori,
      description: row.deskripsi || "No description available.", // Fallback if deskripsi is null
    }));

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}