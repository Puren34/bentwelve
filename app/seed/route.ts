import { NextResponse } from 'next/server';

// Seeding sengaja dilakukan lewat `npm run seed`, bukan endpoint HTTP,
// supaya data contoh tidak dapat dibuat oleh pengunjung aplikasi.
export async function GET() {
  return NextResponse.json(
    { error: 'Gunakan npm run seed untuk membuat data contoh.' },
    { status: 405 },
  );
}
