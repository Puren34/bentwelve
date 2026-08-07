import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const product = await prisma.products.findUnique({ where: { id_produk: id } });
    if (!product) return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });

    return NextResponse.json({
      id_produk: product.id_produk,
      title: product.nama_produk,
      price: Number(product.harga),
      category: product.kategori,
      img: product.gambar || '/default-image.jpg',
      description: product.deskripsi || 'Deskripsi tidak tersedia.',
      created_at: product.created_at,
      total_sold: product.total_sold,
      image: product.image,
    });
  } catch (error) {
    console.error('Kesalahan saat mengambil produk:', error);
    return NextResponse.json({ error: 'Gagal mengambil produk' }, { status: 500 });
  }
}
