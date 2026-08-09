// Seeder Prisma untuk data contoh SIWEB.
// Jalankan setelah tabel dibuat: npm run db:deploy && npm run seed

import { loadEnv } from './scripts/load-env.mjs';
loadEnv();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

if (!process.env.DATABASE_URL) {
  console.error('\n[ERROR] DATABASE_URL tidak ditemukan. Isi .env atau .env.local terlebih dahulu.');
  process.exit(1);
}

const prisma = new PrismaClient();

const USERS = [
  { name: 'Admin Toko', email: 'admin@siweb.test', password: 'admin123', role: 'admin' },
  { name: 'kalpin', email: 'kalpin@example.com', password: '123', role: 'admin' },
  { name: 'budi', email: 'budi@example.com', password: 'budi', role: 'user' },
  { name: 'Budi Santoso', email: 'budi@siweb.test', password: 'password123', role: 'user' },
  { name: 'Siti Aminah', email: 'siti@siweb.test', password: 'password123', role: 'user' },
  { name: 'Andi Wijaya', email: 'andi@siweb.test', password: 'password123', role: 'user' },
  { name: 'Rina Marlina', email: 'rina@siweb.test', password: 'password123', role: 'user' },
];

const PRODUCTS = [
  ['Buket Mawar Merah', 250000, 'Bunga Potong', 'Rangkaian mawar merah segar, cocok untuk hadiah spesial.'],
  ['Buket Mawar Putih', 230000, 'Bunga Potong', 'Mawar putih melambangkan ketulusan.'],
  ['Bunga Matahari Segar', 150000, 'Bunga Potong', 'Sekumpulan bunga matahari cerah.'],
  ['Anggrek Bulan', 320000, 'Bunga Potong', 'Anggrek bulan elegan dalam vas kaca.'],
  ['Rangkaian Bunga Pernikahan', 750000, 'Rangkaian Bunga', 'Rangkaian mewah untuk dekorasi pernikahan.'],
  ['Rangkaian Bunga Ulang Tahun', 300000, 'Rangkaian Bunga', 'Rangkaian ceria untuk hari ulang tahun.'],
  ['Rangkaian Bunga Duka Cita', 400000, 'Rangkaian Bunga', 'Rangkaian bunga papan duka cita.'],
  ['Buket Bunga Tulip', 280000, 'Bunga Potong', 'Tulip impor warna-warni.'],
  ['Karangan Bunga Wisuda', 220000, 'Rangkaian Bunga', 'Karangan bunga untuk perayaan wisuda.'],
  ['Buket Bunga Lily', 260000, 'Bunga Potong', 'Lily putih dengan aroma lembut.'],
  ['Buket Bunga Baby Breath', 180000, 'Bunga Potong', 'Baby breath minimalis dan estetik.'],
  ['Standing Flower Pembukaan Toko', 850000, 'Rangkaian Bunga', 'Standing flower untuk grand opening.'],
];

const EXPENSE_ITEMS = ['Pembelian bunga segar dari supplier', 'Sewa tempat toko', 'Gaji karyawan', 'Listrik dan air', 'Biaya pengiriman', 'Pembelian vas dan kemasan', 'Biaya pemasaran online', 'Perawatan kendaraan operasional'];
const BUYERS = ['Dewi Lestari', 'Fajar Nugroho', 'Putri Ayu', 'Hendra Gunawan', 'Maya Sari', 'Yusuf Ramadhan', 'Nadia Putri', 'Rudi Hartono'];
const pick = (items) => items[Math.floor(Math.random() * items.length)];
const randomDate = (start, end) => new Date(new Date(start).getTime() + Math.random() * (new Date(end).getTime() - new Date(start).getTime()));

async function seedUsers() {
  const users = [];
  for (const user of USERS) {
    const password = await bcrypt.hash(user.password, 10);
    users.push(await prisma.users.upsert({
      where: { email: user.email },
      update: { name: user.name, password, role: user.role },
      create: { name: user.name, email: user.email, password, role: user.role },
    }));
  }
  console.log(`  - users: ${users.length} baris`);
  return users;
}

async function seedProducts() {
  const products = [];
  for (const [nama_produk, harga, kategori, deskripsi] of PRODUCTS) {
    const existing = await prisma.products.findFirst({ where: { nama_produk } });
    const data = { harga, kategori, deskripsi, gambar: '/placeholder-product.png' };
    products.push(existing
      ? await prisma.products.update({ where: { id_produk: existing.id_produk }, data })
      : await prisma.products.create({ data: { nama_produk, ...data } }));
  }
  console.log(`  - products: ${products.length} baris`);
  return products;
}

async function seedTransactions(users, products) {
  if (await prisma.transactions.count()) {
    console.log('  - transactions: sudah ada, dilewati');
    return;
  }

  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < 60; i++) {
      const selected = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, () => pick(products));
      const items = selected.map((product) => ({ id_produk: product.id_produk, jumlah: 1 + Math.floor(Math.random() * 3) }));
      const total_harga = items.reduce((total, item) => total + Number(selected.find((product) => product.id_produk === item.id_produk).harga) * item.jumlah, 0);
      await tx.transactions.create({
        data: {
          id_produk: selected[0].id_produk,
          id_user: pick(users).id,
          nama_pembeli: pick(BUYERS),
          tanggal: randomDate('2025-01-01', '2025-06-30'),
          total_harga,
          status: Math.random() > 0.3 ? 'paid' : 'pending',
          transaction_items: { create: items },
        },
      });
      for (const item of items) {
        await tx.products.update({ where: { id_produk: item.id_produk }, data: { total_sold: { increment: item.jumlah } } });
      }
    }
  });
  console.log('  - transactions: 60 baris (dengan transaction_items)');
}

async function seedExpenses(users) {
  if (await prisma.expenses.count()) {
    console.log('  - expenses: sudah ada, dilewati');
    return;
  }
  await prisma.expenses.createMany({ data: Array.from({ length: 30 }, () => ({
    id_user: pick(users).id,
    tanggal: randomDate('2025-01-01', '2025-06-30'),
    jumlah_pengeluaran: 50000 + Math.floor(Math.random() * 500000),
    keterangan: pick(EXPENSE_ITEMS),
  })) });
  console.log('  - expenses: 30 baris');
}

async function seedHistory() {
  if (await prisma.user_history.count()) {
    console.log('  - history: sudah ada, dilewati');
    return;
  }
  const snapshot_date = new Date('2025-05-31T23:59:59Z');
  const [products, users, transactions, expenses] = await Promise.all([
    prisma.products.findMany({ take: 8 }), prisma.users.findMany({ take: 4 }),
    prisma.transactions.findMany({ where: { tanggal: { lte: snapshot_date } } }),
    prisma.expenses.findMany({ where: { tanggal: { lte: snapshot_date } } }),
  ]);
  await prisma.$transaction([
    prisma.product_history.createMany({ data: products.map((product) => ({ id_produk: product.id_produk, nama_produk: product.nama_produk, snapshot_date })) }),
    prisma.user_history.createMany({ data: users.map((user) => ({ id_user: user.id, snapshot_date })) }),
    prisma.transaction_history.createMany({ data: transactions.map((transaction) => ({ id_transaksi: transaction.id_transaksi, total_harga: transaction.total_harga, tanggal: transaction.tanggal, snapshot_date })) }),
    prisma.expense_history.createMany({ data: expenses.map((expense) => ({ jumlah_pengeluaran: expense.jumlah_pengeluaran, tanggal: expense.tanggal, snapshot_date })) }),
  ]);
  console.log('  - product_history / user_history / transaction_history / expense_history: terisi');
}

async function main() {
  try {
    console.log('Menyambung ke database dengan Prisma...');
    console.log('\nMengisi data contoh:');
    const users = await seedUsers();
    const products = await seedProducts();
    await seedTransactions(users, products);
    await seedExpenses(users);
    await seedHistory();
    console.log('\nSelesai! Database berhasil di-seed.');
    console.log('\nAkun login untuk dicoba:');
    USERS.forEach((user) => console.log(`  - ${user.email} / ${user.password} (role: ${user.role})`));
  } catch (error) {
    console.error('\n[ERROR] Seeding gagal:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
