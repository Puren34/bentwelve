import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.max(1, Number(searchParams.get('limit')) || 10);
  const where = {
    kategori: { in: ['Bunga Potong', 'Rangkaian Bunga'] },
    nama_produk: { contains: query, mode: 'insensitive' as const },
  };

  try {
    const [rows, totalCount] = await prisma.$transaction([
      prisma.products.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.products.count({ where }),
    ]);

    const products = rows.map((product) => ({
      id_produk: product.id_produk,
      title: product.nama_produk,
      price: Number(product.harga),
      img: product.gambar || '/default-image.jpg',
      category: product.kategori,
      description: product.deskripsi || 'Deskripsi tidak tersedia.',
      createdAt: product.created_at.toISOString(),
      total_sold: product.total_sold,
    }));

    return NextResponse.json({ products, totalCount });
  } catch (error) {
    console.error('Kesalahan saat mengambil daftar produk:', error);
    return NextResponse.json({ error: 'Gagal mengambil daftar produk.' }, { status: 500 });
  }
}
