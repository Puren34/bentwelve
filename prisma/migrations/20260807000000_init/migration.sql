CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "expense_history" ("id" SERIAL NOT NULL, "jumlah_pengeluaran" DECIMAL, "tanggal" DATE, "snapshot_date" TIMESTAMP(6) NOT NULL, CONSTRAINT "expense_history_pkey" PRIMARY KEY ("id"));
CREATE TABLE "products" ("id_produk" UUID NOT NULL DEFAULT gen_random_uuid(), "nama_produk" VARCHAR(255) NOT NULL, "harga" DECIMAL NOT NULL, "kategori" VARCHAR(100) NOT NULL, "gambar" TEXT, "image" TEXT, "deskripsi" TEXT, "total_sold" INTEGER NOT NULL DEFAULT 0, "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "products_pkey" PRIMARY KEY ("id_produk"));
CREATE TABLE "users" ("id" UUID NOT NULL DEFAULT gen_random_uuid(), "name" VARCHAR(255) NOT NULL, "email" TEXT NOT NULL, "password" TEXT NOT NULL, "role" VARCHAR(50) NOT NULL DEFAULT 'user', "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "users_pkey" PRIMARY KEY ("id"));
CREATE TABLE "expenses" ("id" UUID NOT NULL DEFAULT gen_random_uuid(), "id_user" UUID, "tanggal" DATE NOT NULL, "jumlah_pengeluaran" DECIMAL NOT NULL, "keterangan" TEXT, "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "expenses_pkey" PRIMARY KEY ("id"));
CREATE TABLE "transactions" ("id_transaksi" UUID NOT NULL DEFAULT gen_random_uuid(), "id_produk" UUID, "id_user" UUID, "nama_pembeli" VARCHAR(255) NOT NULL, "tanggal" TIMESTAMP(6) NOT NULL, "total_harga" DECIMAL NOT NULL, "status" VARCHAR(50) NOT NULL DEFAULT 'paid', "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "transactions_pkey" PRIMARY KEY ("id_transaksi"));
CREATE TABLE "transaction_items" ("id" SERIAL NOT NULL, "id_transaksi" UUID, "id_produk" UUID, "jumlah" INTEGER NOT NULL, CONSTRAINT "transaction_items_pkey" PRIMARY KEY ("id"));
CREATE TABLE "product_history" ("id" SERIAL NOT NULL, "id_produk" UUID, "nama_produk" VARCHAR(255), "snapshot_date" TIMESTAMP(6) NOT NULL, CONSTRAINT "product_history_pkey" PRIMARY KEY ("id"));
CREATE TABLE "transaction_history" ("id" SERIAL NOT NULL, "id_transaksi" UUID, "total_harga" DECIMAL, "tanggal" TIMESTAMP(6), "snapshot_date" TIMESTAMP(6) NOT NULL, CONSTRAINT "transaction_history_pkey" PRIMARY KEY ("id"));
CREATE TABLE "user_history" ("id" SERIAL NOT NULL, "id_user" UUID, "snapshot_date" TIMESTAMP(6) NOT NULL, CONSTRAINT "user_history_pkey" PRIMARY KEY ("id"));

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "products"("id_produk") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "transaction_items" ADD CONSTRAINT "transaction_items_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "products"("id_produk") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "transaction_items" ADD CONSTRAINT "transaction_items_id_transaksi_fkey" FOREIGN KEY ("id_transaksi") REFERENCES "transactions"("id_transaksi") ON DELETE CASCADE ON UPDATE NO ACTION;
