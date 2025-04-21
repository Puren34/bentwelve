"use client";

import { useState } from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Flower",
    price: 120,
    category: "Poppy - Based",
    image: "/bunga/bunga1.png",
  },
  {
    id: 2,
    name: "Flower",
    price: 91,
    category: "Poppy - Based",
    image: "/bunga/bunga2.png",
  },
  {
    id: 3,
    name: "Flower",
    price: 150,
    category: "Poppy - Based",
    image: "/bunga/bunga3.png",
  },
  {
    id: 4,
    name: "Flower",
    price: 70,
    category: "Poppy - Based",
    image: "/bunga/bunga4.png",
  },
  {
    id: 5,
    name: "ayam",
    price: 100,
    category: "Poppy - Based",
    image: "/bunga/bunga5.png",
  },
  {
    id: 6,
    name: "Flower",
    price: 50,
    category: "Poppy - Based",
    image: "/bunga/bunga6.png",
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pt-32  min-h-screen">
      <div className="flex items-center justify-between mb-16">
        <div className="relative w-full max-w-2xl">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 text-lg">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search menu"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-white shadow focus:outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        <button className="ml-6 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded shadow">
          + Add New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 items-start">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-4 flex flex-col items-center w-56 "
          >
            <Image
              src={product.image}
              alt={product.name}
              width={128}
              height={128}
              className="rounded-full w-32 h-32 object-cover -mt-12 z-10 shadow"
            />
            <h3 className="font-semibold text-lg mt-10">{product.name}</h3>
            <p className="text-gray-600 mt-6">Rp.{product.price}</p>
            <p className="text-sm mb-6 text-[#8A4F2F]">{product.category}</p>

            <div className="flex gap-3">
              <button className="text-gray-600 hover:text-black text-lg">
                ✏️
              </button>
              <button className="text-red-500 hover:text-red-700 text-lg">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
