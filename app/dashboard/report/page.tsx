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
    price: null,
    img: "/bunga4.png",
    description: "Untuk yang sedang merasa kosong.",
    category: "On Sale",
  },
  {
    title: "Bunga Steven",
    price: null,
    img: "/bunga5.png",
    description: "Terinspirasi dari seseorang bernama Steven.",
    category: "Giant Bouquet",
  },
  {
    title: "Bunga Kekosongan",
    price: null,
    img: "/bunga6.png",
    description: "Kekosongan kedua tidak kalah indah.",
    category: "Vase & Basket",
  },
];

const reports = [
  {
    id: "STX202313234",
    date: "2024-12-08 18:07",
    name: "Flowers",
    price: "$50",
    quantity: 4,
    category: "Poppy",
  },
  {
    id: "STX20232323",
    date: "2024-12-08 16:12",
    name: "Flowchart",
    price: "$120",
    quantity: 9,
    category: "Poppy",
  },
  {
    id: "STX20233444",
    date: "2024-12-08 13:11",
    name: "Flowchart",
    price: "$91",
    quantity: 2,
    category: "Poppy",
  },
  {
    id: "STX202312909",
    date: "2024-12-08 12:01",
    name: "Keseraman",
    price: "$150",
    quantity: 1,
    category: "Poppy",
  },
  {
    id: "CSI234098767",
    date: "2024-12-08 11:25",
    name: "Flowchart",
    price: "$70",
    quantity: 3,
    category: "Poppy",
  },
  {
    id: "STX2023123131",
    date: "2024-12-08 10:30",
    name: "Flowchart",
    price: "$100",
    quantity: 5,
    category: "Poppy",
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
      <h1 className="text-3xl font-bold text-center mb-8">Transaction Reports</h1>
      <div className="flex justify-end mb-4">
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">NO</th>
              <th className="border px-4 py-2">ID_TRANSACTION</th>
              <th className="border px-4 py-2">DATE TIME</th>
              <th className="border px-4 py-2">NAME</th>
              <th className="border px-4 py-2">PRICE</th>
              <th className="border px-4 py-2">QUANTITY</th>
              <th className="border px-4 py-2">CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => (
              <tr key={r.id} className={idx % 2 === 0 ? "bg-white" : "bg-pink-50"}>
                <td className="border px-4 py-2 text-center">{String(idx + 1).padStart(2, '0')}</td>
                <td className="border px-4 py-2">{r.id}</td>
                <td className="border px-4 py-2">{r.date}</td>
                <td className="border px-4 py-2">{r.name}</td>
                <td className="border px-4 py-2">{r.price}</td>
                <td className="border px-4 py-2 text-center">{r.quantity}</td>
                <td className="border px-4 py-2">{r.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
