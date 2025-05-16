"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id_produk: string;
  title: string;
  price: number | null;
  img: string;
  category: string;
  description: string;
  discount?: number;
  slug?: string;
  variant?: string;
  features?: string[];
  note?: string;
};

type Category = {
  name: string;
  count: number;
};

export default function FlowersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);

          const categoryCounts: { [key: string]: number } = {};
          data.forEach((product: Product) => {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
          });

          const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
            name,
            count,
          }));
          setCategories(categoryList);
        } else {
          console.error("Gagal mengambil produk:", data.error);
        }
      } catch (error) {
        console.error("Kesalahan saat mengambil produk:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeModal = () => setSelectedProduct(null);
  const increaseQty = () => setQuantity(qty => qty + 1);
  const decreaseQty = () => setQuantity(qty => (qty > 1 ? qty - 1 : 1));

  // Menggunakan id_produk untuk rute dinamis
  const getStaticPathFromSlug = (id_produk: string) => {
    return `/customers/flowers/detail/${id_produk}`;
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="romanesca text-3xl font-bold text-center mb-8">Pilih Bunga Anda</h1>
      <div className="flex gap-6">
        <aside className="w-64 bg-pink-50 p-4 rounded-xl">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Urutkan berdasarkan:</label>
            <select className="w-full p-2 border rounded-md">
              <option>Terbaru</option>
              <option>Harga: Rendah ke Tinggi</option>
              <option>Harga: Tinggi ke Rendah</option>
            </select>
          </div>
          <div className="mb-4">
            <input type="text" placeholder="Cari..." className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Kategori</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input type="checkbox" /> {category.name} ({category.count})
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 p-4 md:p-10 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md">
                <div className="w-full h-[150px] overflow-hidden rounded-lg">
                  <Image
                    src={product.img}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                  <div className="mb-2">
                    {product.discount ? (
                      <>
                        <span className="line-through text-sm mr-2">Rp{product.price}</span>
                        <span className="text-pink-600 font-bold">Rp{product.discount}</span>
                      </>
                    ) : (
                      <span className="font-bold">Rp{product.price}</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-pink-400 text-white py-2 rounded-md hover:bg-pink-500"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="w-full h-[220px] overflow-hidden rounded-md mb-4">
              <Image
                src={selectedProduct.img}
                alt={selectedProduct.title}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Kategori: {selectedProduct.category}
            </p>
            <p className="mb-3">{selectedProduct.description}</p>
            <div className="mb-3">
              {selectedProduct.discount ? (
                <>
                  <span className="line-through mr-2 text-sm">Rp{selectedProduct.price}</span>
                  <span className="text-pink-600 font-bold text-lg">Rp{selectedProduct.discount}</span>
                </>
              ) : (
                <span className="text-lg font-bold">Rp{selectedProduct.price}</span>
              )}
            </div>
            <div className="flex items-center mb-4">
              <button onClick={decreaseQty} className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300">-</button>
              <span className="px-4 py-1 border-t border-b">{quantity}</span>
              <button onClick={increaseQty} className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300">+</button>
            </div>
            <button
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
              onClick={() => alert(`Menambahkan ${quantity} item '${selectedProduct.title}' ke keranjang!`)}
            >
              Tambah ke Keranjang
            </button>

            <Link href={getStaticPathFromSlug(selectedProduct.id_produk)}>
              <button className="w-full mt-3 bg-pink-100 text-pink-600 py-2 rounded-md hover:bg-pink-200">
                Detail Produk
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}