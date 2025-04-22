"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  title: string;
  price: number | null;
  discount?: number;
  img: string;
  description: string;
  category: string;
  slug: string;
  variant: string;
  features: string[];
  note: string;
};

const products: Product[] = [
  {
    title: "Blossom Bills",
    price: 150.000,
    discount: 49.99,
    img: "/f11.jpg",
    description: "Bunga ini cocok untuk suasana horor romantis.",
    category: "Bloom Box",
    slug: "bunga-keseraman",
    variant: "Round Arrangement",
    features: ["Premium Flowers", "Custom Color Theme", "Premium Wrapping", "Custom Greeting Card"],
    note: "The photos and results may have slight differences due to lighting and flower availability. We’ll confirm with you before sending.",
  },
  {
    title: "Pental Perfection",
    price: 180.000,
    img: "/f22.jpg",
    description: "Wajah unik dalam bentuk bunga.",
    category: "Giant Bouquet",
    slug: "muka-orang",
    variant: "Unique Face Arrangement",
    features: ["Premium Flowers", "Custom Color Theme", "Premium Wrapping", "Custom Greeting Card"],
    note: "The photos and results may have slight differences due to lighting and flower availability. We’ll confirm with you before sending.",
  },
  {
    title: "Floral Fantasty",
    price: 200.000,
    discount: 49.99,
    img: "/f33.jpg",
    description: "Cocok untuk mantan yang masih kamu doakan.",
    category: "Vase & Basket",
    slug: "bunga-dingin",
    variant: "Vase Arrangement",
    features: ["Premium Flowers", "Custom Color Theme", "Elegant Vase", "Custom Greeting Card"],
    note: "The photos and results may have slight differences due to lighting and flower availability. We’ll confirm with you before sending.",
  },
  {
    title: "Blooming Essence",
    price: 5000,
    img: "/f4.jpg",
    description: "Untuk yang sedang merasa kosong.",
    category: "On Sale",
    slug: "bunga-kekosongan",
    variant: "Simple Arrangement",
    features: ["Fresh Flowers", "Minimalist Wrapping", "Custom Greeting Card"],
    note: "The photos and results may have slight differences due to lighting and flower availability. We’ll confirm with you before sending.",
  },
  {
    title: "Eternal Elegance",
    price: 600,
    img: "/f5.jpg",
    description: "Terinspirasi dari seseorang bernama Steven.",
    category: "Giant Bouquet",
    slug: "bunga-steven",
    variant: "Round Arrangement",
    features: ["Premium Flowers", "Custom Color Theme", "Premium Wrapping", "Custom Greeting Card"],
    note: "The photos and results may have slight differences due to lighting and flower availability. We’ll confirm with you before sending.",
  },
  {
    title: "Radiant Bonquet",
    price: 5000,
    img: "/f6.jpg",
    description: "Kekosongan kedua tidak kalah indah.",
    category: "Vase & Basket",
    slug: "bunga-kekosongan-2",
    variant: "Basket Arrangement",
    features: ["Fresh Flowers", "Elegant Basket", "Custom Greeting Card"],
    note: "The photos and results may have slight differences due to lighting and flower availability. We’ll confirm with you before sending.",
  },
];

// ✅ Fungsi mapping slug ke path 1/1
const getStaticPathFromSlug = (slug: string) => {
  switch (slug) {
    case "bunga-keseraman":
      return "/customers/flowers/detail/bunga1";
    case "muka-orang":
      return "/customers/flowers/detail/bunga2";
    case "bunga-dingin":
      return "/customers/flowers/detail/bunga3";
    case "bunga-kekosongan":
      return "/customers/flowers/detail/bunga4";
    case "bunga-steven":
      return "/customers/flowers/detail/bunga5";
    case "bunga-kekosongan-2":
      return "/customers/flowers/detail/bunga6";
    default:
      return "/customers/flowers/detail";
  }
};

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
      <h1 className="romanesca text-3xl font-bold text-center mb-8">Choose your Flower</h1>
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
            <input type="text" placeholder="Cari..." className="w-full p-2 border rounded-md" />
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
                        <span className="line-through text-sm mr-2">${product.price}</span>
                        <span className="text-pink-600 font-bold">${product.discount}</span>
                      </>
                    ) : (
                      <span className="font-bold">${product.price}</span>
                    )}
                  </div>
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
      </div> {/* <- Menutup div dari .flex */}

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
                  <span className="line-through mr-2 text-sm">${selectedProduct.price}</span>
                  <span className="text-pink-600 font-bold text-lg">${selectedProduct.discount}</span>
                </>
              ) : (
                <span className="text-lg font-bold">${selectedProduct.price}</span>
              )}
            </div>
            <div className="flex items-center mb-4">
              <button onClick={decreaseQty} className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300">-</button>
              <span className="px-4 py-1 border-t border-b">{quantity}</span>
              <button onClick={increaseQty} className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300">+</button>
            </div>
            <button
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
              onClick={() => alert(`Added ${quantity} item(s) of '${selectedProduct.title}' to cart!`)}>
              Add to Cart
            </button>

            <Link href={getStaticPathFromSlug(selectedProduct.slug)}>
              <button className="w-full mt-3 bg-pink-100 text-pink-600 py-2 rounded-md hover:bg-pink-200">
                Detail Product
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}