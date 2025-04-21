"use client";

import React, { useState } from "react";
import Image from "next/image";

type Product = {
  title: string;
  price: number | null;
  discount?: number;
  img: string;
  description: string;
  category: string;
};

const products = [
  {
    title: "Bunga Keseraman",
    price: 50,
    discount: 49.99,
    img: "/bunga1.png",
    onSale: true,
    description: "Bunga ini cocok untuk suasana horor romantis.",
    category: "Bloom Box",
  },
  {
    title: "Muka Orang 😁😂😂",
    price: 69999,
    img: "/bunga2.png",
    onSale: false,
    description: "Wajah unik dalam bentuk bunga.",
    category: "Giant Bouquet",
  },
  {
    title: "Bunga Dingin Tapi Tidak Kejam",
    price: 50,
    discount: 49.99,
    img: "/bunga3.png",
    onSale: true,
    description: "Cocok untuk mantan yang masih kamu doakan.",
    category: "Vase & Basket",
  },
  {
    title: "Bunga Kekosongan",
    price: 5000,
    img: "/bunga4.png",
    description: "Untuk yang sedang merasa kosong.",
    category: "On Sale",
  },
  {
    title: "Bunga Steven",
    price: 600,
    img: "/bunga5.png",
    description: "Terinspirasi dari seseorang bernama Steven.",
    category: "Giant Bouquet",
  },
  {
    title: "Bunga Kekosongan",
    price: 5000,
    img: "/bunga6.png",
    description: "Kekosongan kedua tidak kalah indah.",
    category: "Vase & Basket",
  },
];

export default function FlowersPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeModal = () => setSelectedProduct(null);

  const increaseQty = () => setQuantity(qty => qty + 1);
  const decreaseQty = () => setQuantity(qty => (qty > 1 ? qty - 1 : 1));

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Choose your Flower</h1>
      <div className="flex gap-6">
        <aside className="w-64 bg-pink-50 p-4 rounded-xl">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Sort by:</label>
            <select className="w-full p-2 border rounded-md">
              <option>Most Recent</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Category</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Bloom Box (5)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Giant Bouquet (7)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Vase & Basket (10)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> On Sale (3)
              </label>
            </div>
          </div>
        </aside>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <Image
                src={product.img}
                alt={product.title}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                {product.price !== null ? (
                  <div className="mb-2">
                    {product.discount ? (
                      <>
                        <span className="line-through text-sm mr-2">${product.price}</span>
                        <span className="text-pink-600 font-bold">${product.discount}</span>
                      </>
                    ) : (
                      <span className="font-bold">${product.price}</span>
                    )}
                  </div>
                ) : (
                  <div className="mb-2">Rp. Tidak ada Harga</div>
                )}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-pink-400 text-white py-2 rounded-md hover:bg-pink-500"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
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
            <Image
              src={selectedProduct.img}
              alt={selectedProduct.title}
              width={400}
              height={300}
              className="rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
            <p className="text-sm text-gray-600 mb-2">Kategori: {selectedProduct.category}</p>
            <p className="mb-3">{selectedProduct.description}</p>
            {selectedProduct.price !== null ? (
              <>
                {selectedProduct.discount ? (
                  <p className="mb-3">
                    <span className="line-through mr-2 text-sm">${selectedProduct.price}</span>
                    <span className="text-pink-600 font-bold text-lg">${selectedProduct.discount}</span>
                  </p>
                ) : (
                  <p className="text-lg font-bold mb-3">${selectedProduct.price}</p>
                )}
              </>
            ) : (
              <p className="mb-3">Rp. Tidak ada Harga</p>
            )}
            <div className="flex items-center mb-4">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
              onClick={() => alert(`Added ${quantity} item(s) of '${selectedProduct.title}' to cart!`)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}