'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FlowerDetailPage() {
  const [variant, setVariant] = useState('Round Arrangement');
  const [customRequest, setCustomRequest] = useState('');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  return (
    <div className="relative">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.push('/customers/flowers')}
        className="absolute top-4 left-4 bg-pink-100 text-pink-600 px-4 py-2 rounded-md hover:bg-pink-200 font-semibold"
      >
        ← 
      </button>

      <div className="flex flex-col lg:flex-row gap-12 p-6 md:p-12 max-w-7xl mx-auto">
        {/* Left: Image */}
        <div className="flex-1">
          <Image
            src="/f6.jpg"
            alt="Radiant Bouquet"
            width={600}
            height={600}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Radiant Bouquet</h1>
          <h2 className="text-xl text-gray-700 font-semibold">
            Huge Fresh Flower Bouquet
          </h2>
          <p className="text-lg text-pink-600 font-bold">Rp 160.000</p>

          {/* Variant Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Variant
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option>Round Arrangement</option>
              <option>Heart Arrangement</option>
            </select>
          </div>

          {/* Customize Request */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customize Request
            </label>
            <input
              type="text"
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., Add name tag, choose pink tone"
            />
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="border rounded-md w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100"
            >
              −
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="border rounded-md w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => alert('Added to cart!')}
            className="w-full border border-pink-500 text-pink-600 hover:bg-pink-50 py-2 rounded-md font-semibold"
          >
            Add to Cart
          </button>

          {/* Details */}
          <div className="text-sm text-gray-600 mt-6">
            <p>
              Shaped round Flower Arrangement with 56-60 Holland Rose, customizable Color and Korean Crinkle Ribbon
            </p>
            <div className="mt-4">
              <p className="font-semibold text-gray-800 mb-1">What you get*</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><em>Premium Flowers</em></li>
                <li><em>Mix or selected color flowers</em></li>
                <li><em>Color theme of our Bouquet</em></li>
                <li><em>Premium Wrapping</em></li>
                <li><em>Custom Greeting Card</em></li>
                <li><em>URR Paperbag (minimum 5)</em></li>
              </ul>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              *The photos and results of the arrangement may have slight differences due to lighting and flower availability. We'll always confirm with the customer before sending the arrangement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
