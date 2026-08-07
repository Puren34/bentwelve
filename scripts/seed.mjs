// scripts/seed.mjs
//
// Seeder untuk database SIWEB (bentwelve).
// Menyiapkan tabel-tabel yang dipakai di app/lib/data.ts, app/lib/actions.ts,
// app/lib/authOptions.ts, dan app/api/**, lalu mengisinya dengan data contoh.
//
// Cara pakai:
//   npm run seed
//
// Pastikan file .env.local (atau .env) sudah berisi DATABASE_URL yang valid
// sebelum menjalankan perintah di atas.

import { loadEnv } from './load-env.mjs';
loadEnv();

import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error(
    '\n[ERROR] DATABASE_URL (atau POSTGRES_URL) tidak ditemukan.\n' +
    'Tambahkan DATABASE_URL="postgres://user:password@host:port/db" ke file .env.local lalu jalankan lagi.\n'
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
});

// ---------- Helper ----------
function randomDate(startStr, endStr) {
  const start = new Date(startStr).getTime();
  const end = new Date(endStr).getTime();
  const t = start + Math.random() * (end - start);
  return new Date(t);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function toDateOnly(d) {
  return d.toISOString().slice(0, 10);
}

// ---------- Data dasar ----------
const USERS = [
  { name: 'Admin Toko', email: 'admin@siweb.test', password: 'admin123', role: 'admin' },
  { name: 'Budi Santoso', email: 'budi@siweb.test', password: 'password123', role: 'user' },
  { name: 'Siti Aminah', email: 'siti@siweb.test', password: 'password123', role: 'user' },
  { name: 'Andi Wijaya', email: 'andi@siweb.test', password: 'password123', role: 'user' },
  { name: 'Rina Marlina', email: 'rina@siweb.test', password: 'password123', role: 'user' },
];

const PRODUCTS = [
  { nama_produk: 'Buket Mawar Merah', harga: 250000, kategori: 'Bunga Potong', deskripsi: 'Rangkaian mawar merah segar, cocok untuk hadiah spesial.' },
  { nama_produk: 'Buket Mawar Putih', harga: 230000, kategori: 'Bunga Potong', deskripsi: 'Mawar putih melambangkan ketulusan.' },
  { nama_produk: 'Bunga Matahari Segar', harga: 150000, kategori: 'Bunga Potong', deskripsi: 'Sekumpulan bunga matahari cerah.' },
  { nama_produk: 'Anggrek Bulan', harga: 320000, kategori: 'Bunga Potong', deskripsi: 'Anggrek bulan elegan dalam vas kaca.' },
  { nama_produk: 'Rangkaian Bunga Pernikahan', harga: 750000, kategori: 'Rangkaian Bunga', deskripsi: 'Rangkaian mewah untuk dekorasi pernikahan.' },
  { nama_produk: 'Rangkaian Bunga Ulang Tahun', harga: 300000, kategori: 'Rangkaian Bunga', deskripsi: 'Rangkaian ceria untuk hari ulang tahun.' },
  { nama_produk: 'Rangkaian Bunga Duka Cita', harga: 400000, kategori: 'Rangkaian Bunga', deskripsi: 'Rangkaian bunga papan duka cita.' },
  { nama_produk: 'Buket Bunga Tulip', harga: 280000, kategori: 'Bunga Potong', deskripsi: 'Tulip impor warna-warni.' },
  { nama_produk: 'Karangan Bunga Wisuda', harga: 220000, kategori: 'Rangkaian Bunga', deskripsi: 'Karangan bunga untuk perayaan wisuda.' },
  { nama_produk: 'Buket Bunga Lily', harga: 260000, kategori: 'Bunga Potong', deskripsi: 'Lily putih dengan aroma lembut.' },
  { nama_produk: 'Buket Bunga Baby Breath', harga: 180000, kategori: 'Bunga Potong', deskripsi: 'Baby breath minimalis dan estetik.' },
  { nama_produk: 'Standing Flower Pembukaan Toko', harga: 850000, kategori: 'Rangkaian Bunga', deskripsi: 'Standing flower untuk grand opening.' },
];

const EXPENSE_ITEMS = [
  'Pembelian bunga segar dari supplier',
  'Sewa tempat toko',
  'Gaji karyawan',
  'Listrik dan air',
  'Biaya pengiriman',
  'Pembelian vas dan kemasan',
  'Biaya pemasaran online',
  'Perawatan kendaraan operasional',
];

const STATUSES = ['paid', 'pending'];

// ---------- Seed functions ----------
async function seedUsers(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const ids = [];
  for (const user of USERS) {
    const hashed = await bcrypt.hash(user.password, 10);
    const res = await client.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [user.name, user.email, hashed, user.role]
    );
    ids.push(res.rows[0].id);
  }
  console.log(`  - users: ${ids.length} baris`);
  return ids;
}

async function seedProducts(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS products (
      id_produk UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      nama_produk VARCHAR(255) NOT NULL,
      harga NUMERIC NOT NULL,
      kategori VARCHAR(100) NOT NULL,
      gambar TEXT,
      image TEXT,
      deskripsi TEXT,
      total_sold INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const ids = [];
  for (const p of PRODUCTS) {
    const res = await client.query(
      `INSERT INTO products (nama_produk, harga, kategori, gambar, deskripsi)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_produk`,
      [p.nama_produk, p.harga, p.kategori, '/placeholder-product.png', p.deskripsi]
    );
    ids.push(res.rows[0].id_produk);
  }
  console.log(`  - products: ${ids.length} baris`);
  return ids;
}

async function seedTransactionsAndItems(client, userIds, productIds) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id_transaksi UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      id_produk UUID REFERENCES products(id_produk) ON DELETE SET NULL,
      id_user UUID REFERENCES users(id) ON DELETE SET NULL,
      nama_pembeli VARCHAR(255) NOT NULL,
      tanggal TIMESTAMP NOT NULL,
      total_harga NUMERIC NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'paid',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS transaction_items (
      id SERIAL PRIMARY KEY,
      id_transaksi UUID REFERENCES transactions(id_transaksi) ON DELETE CASCADE,
      id_produk UUID REFERENCES products(id_produk) ON DELETE SET NULL,
      jumlah INT NOT NULL
    );
  `);

  const buyerNames = ['Dewi Lestari', 'Fajar Nugroho', 'Putri Ayu', 'Hendra Gunawan', 'Maya Sari', 'Yusuf Ramadhan', 'Nadia Putri', 'Rudi Hartono'];

  let count = 0;
  for (let i = 0; i < 60; i++) {
    const tanggal = randomDate('2025-01-01', '2025-06-30');
    const userId = pick(userIds);
    const buyer = pick(buyerNames);
    const status = pick(STATUSES);

    // 1-3 produk per transaksi
    const itemCount = 1 + Math.floor(Math.random() * 3);
    const chosenProducts = [];
    for (let j = 0; j < itemCount; j++) chosenProducts.push(pick(productIds));

    // Ambil harga produk pertama sebagai id_produk utama transaksi (mengikuti logika app/api/transactions/route.ts)
    const mainProductId = chosenProducts[0];

    const priceRes = await client.query(
      `SELECT id_produk, harga FROM products WHERE id_produk = ANY($1::uuid[])`,
      [chosenProducts]
    );
    const priceMap = Object.fromEntries(priceRes.rows.map((r) => [r.id_produk, Number(r.harga)]));

    let totalHarga = 0;
    const itemsWithQty = chosenProducts.map((pid) => {
      const jumlah = 1 + Math.floor(Math.random() * 3);
      totalHarga += (priceMap[pid] || 0) * jumlah;
      return { pid, jumlah };
    });

    const trxRes = await client.query(
      `INSERT INTO transactions (id_produk, id_user, nama_pembeli, tanggal, total_harga, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_transaksi`,
      [mainProductId, userId, buyer, tanggal, totalHarga, status]
    );
    const idTransaksi = trxRes.rows[0].id_transaksi;

    for (const item of itemsWithQty) {
      await client.query(
        `INSERT INTO transaction_items (id_transaksi, id_produk, jumlah) VALUES ($1, $2, $3)`,
        [idTransaksi, item.pid, item.jumlah]
      );
      await client.query(
        `UPDATE products SET total_sold = COALESCE(total_sold, 0) + $1 WHERE id_produk = $2`,
        [item.jumlah, item.pid]
      );
    }

    count++;
  }
  console.log(`  - transactions: ${count} baris (dengan transaction_items)`);
}

async function seedExpenses(client, userIds) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      id_user UUID REFERENCES users(id) ON DELETE SET NULL,
      tanggal DATE NOT NULL,
      jumlah_pengeluaran NUMERIC NOT NULL,
      keterangan TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  let count = 0;
  for (let i = 0; i < 30; i++) {
    const tanggal = toDateOnly(randomDate('2025-01-01', '2025-06-30'));
    const jumlah = 50000 + Math.floor(Math.random() * 500000);
    const keterangan = pick(EXPENSE_ITEMS);
    const userId = pick(userIds);

    await client.query(
      `INSERT INTO expenses (id_user, tanggal, jumlah_pengeluaran, keterangan)
       VALUES ($1, $2, $3, $4)`,
      [userId, tanggal, jumlah, keterangan]
    );
    count++;
  }
  console.log(`  - expenses: ${count} baris`);
}

// Tabel "history" dipakai fetchCardData() di app/lib/data.ts untuk membandingkan
// statistik bulan berjalan dengan snapshot per 2025-05-31 23:59:59.
async function seedHistorySnapshots(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS product_history (
      id SERIAL PRIMARY KEY,
      id_produk UUID,
      nama_produk VARCHAR(255),
      snapshot_date TIMESTAMP NOT NULL
    );
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS user_history (
      id SERIAL PRIMARY KEY,
      id_user UUID,
      snapshot_date TIMESTAMP NOT NULL
    );
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS transaction_history (
      id SERIAL PRIMARY KEY,
      id_transaksi UUID,
      total_harga NUMERIC,
      tanggal TIMESTAMP,
      snapshot_date TIMESTAMP NOT NULL
    );
  `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS expense_history (
      id SERIAL PRIMARY KEY,
      jumlah_pengeluaran NUMERIC,
      tanggal DATE,
      snapshot_date TIMESTAMP NOT NULL
    );
  `);

  const snapshotDate = '2025-05-31 23:59:59';

  // Snapshot diambil dari sebagian data yang sudah ada di tabel utama per akhir Mei 2025,
  // supaya kartu "perubahan dari bulan lalu" di dashboard punya pembanding yang masuk akal.
  await client.query(
    `INSERT INTO product_history (id_produk, nama_produk, snapshot_date)
     SELECT id_produk, nama_produk, $1::timestamp
     FROM products
     WHERE created_at <= $1::timestamp
     LIMIT 8`,
    [snapshotDate]
  );

  await client.query(
    `INSERT INTO user_history (id_user, snapshot_date)
     SELECT id, $1::timestamp FROM users LIMIT 4`,
    [snapshotDate]
  );

  await client.query(
    `INSERT INTO transaction_history (id_transaksi, total_harga, tanggal, snapshot_date)
     SELECT id_transaksi, total_harga, tanggal, $1::timestamp
     FROM transactions
     WHERE tanggal <= $1::timestamp`,
    [snapshotDate]
  );

  await client.query(
    `INSERT INTO expense_history (jumlah_pengeluaran, tanggal, snapshot_date)
     SELECT jumlah_pengeluaran, tanggal, $1::timestamp
     FROM expenses
     WHERE tanggal <= $1::date`,
    [snapshotDate]
  );

  console.log('  - product_history / user_history / transaction_history / expense_history: terisi');
}

async function main() {
  console.log('Menyambung ke database...');
  const client = await pool.connect();

  try {
    console.log('Mengaktifkan extension pgcrypto (untuk gen_random_uuid)...');
    await client.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

    console.log('\nMembuat tabel & mengisi data:');

    console.log('[1/5] users');
    const userIds = await seedUsers(client);

    console.log('[2/5] products');
    const productIds = await seedProducts(client);

    console.log('[3/5] transactions + transaction_items');
    await seedTransactionsAndItems(client, userIds, productIds);

    console.log('[4/5] expenses');
    await seedExpenses(client, userIds);

    console.log('[5/5] tabel history (snapshot untuk perbandingan dashboard)');
    await seedHistorySnapshots(client);

    console.log('\nSelesai! Database berhasil di-seed.');
    console.log('\nAkun login untuk dicoba:');
    for (const u of USERS) {
      console.log(`  - ${u.email} / ${u.password} (role: ${u.role})`);
    }
  } catch (err) {
    console.error('\n[ERROR] Seeding gagal:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
