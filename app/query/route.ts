import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Endpoint diagnostik sederhana untuk memastikan koneksi Prisma bekerja.
export async function GET() {
  try {
    const products = await prisma.products.findMany({
      select: { nama_produk: true, harga: true },
      take: 10,
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(products.map((product) => ({ ...product, harga: Number(product.harga) })));
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data database.' }, { status: 500 });
  }
}
