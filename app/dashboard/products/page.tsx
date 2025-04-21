"use client";

import { useState } from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Flower",
    price: 120,
    category: "Poppy - Based",
    image:
      "/bunga/bunga1.png",
  },
  {
    id: 2,
    name: "Flower",
    price: 91,
    category: "Poppy - Based",
    image:
      "/bunga/bunga2.png",
  },
  {
    id: 3,
    name: "Flower",
    price: 150,
    category: "Poppy - Based",
    image:
      "/bunga/bunga3.png",
  },
  {
    id: 4,
    name: "Flower",
    price: 70,
    category: "Poppy - Based",
    image:
      "/bunga/bunga4.png",
  },
  {
    id: 5,
    name: "ayam",
    price: 100,
    category: "Poppy - Based",
    image:
      "/bunga/bunga5.png",
  },
  {
    id: 6,
    name: "Flower",
    price: 50,
    category: "Poppy - Based",
    image:
      "/bunga/bunga6.png",
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search menu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md px-4 py-2 border rounded"
        />
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
          + Add New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={128}
              height={128}
              className="rounded-full w-32 h-32 object-cover mb-4"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-pink-500 mb-2">{product.category}</p>
            <div className="flex gap-3">
              <button className="text-gray-600 hover:text-black">
                ✏️
              </button>
              <button className="text-red-500 hover:text-red-700">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}