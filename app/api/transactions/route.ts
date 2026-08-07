import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

type TransactionItem = { id_produk: string; jumlah: number };

export async function POST(request: Request) {
  try {
    const { nama_pembeli, tanggal, total_harga, id_user, status = 'paid', items } = await request.json();

    if (!id_user) return NextResponse.json({ success: false, error: 'ID pengguna tidak ditemukan' }, { status: 400 });
    if (!Array.isArray(items) || items.length === 0 || items.some((item: TransactionItem) => !item.id_produk || !Number.isInteger(item.jumlah) || item.jumlah < 1)) {
      return NextResponse.json({ success: false, error: 'Item transaksi tidak valid' }, { status: 400 });
    }

    const transaction = await prisma.$transaction(async (tx) => {
      const created = await tx.transactions.create({
        data: {
          nama_pembeli,
          tanggal: new Date(tanggal),
          total_harga,
          id_user,
          status,
          id_produk: items[0].id_produk,
          transaction_items: { create: items.map((item: TransactionItem) => ({ id_produk: item.id_produk, jumlah: item.jumlah })) },
        },
      });

      await Promise.all(items.map((item: TransactionItem) =>
        tx.products.update({
          where: { id_produk: item.id_produk },
          data: { total_sold: { increment: item.jumlah } },
        }),
      ));
      return created;
    });

    return NextResponse.json({ success: true, id_transaksi: transaction.id_transaksi });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ success: false, error: 'Gagal membuat transaksi.' }, { status: 500 });
  }
}
