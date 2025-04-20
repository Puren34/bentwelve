

'use client';

import Image from 'next/image';
import { useState } from 'react';

const carouselItems = [
  {
    image: '/pedo.jpg',
    alt: 'Decoration',
    heading: 'Decoration',
    subheading: 'Dekorasi Elegan Untuk Berbagai Acara',
    subheadingColor: 'text-pink-400',
    description:
      'Make special moments more memorable with floral decorations for weddings, formal events, and intimate celebrations.',
  },
  {
    image: '/Kucing.png',
    alt: 'Bouquet',
    heading: 'Bouquet & Fresh Flower',
    subheading: '🌟 Fresh Bouquet & Roses',
    subheadingColor: 'text-yellow-400',
    description: 'From roses to exotic flowers, we bring you the best for every occasion.',
  },
];

export default function FlowersPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white">
      {/* Carousel Section */}
      <section className="relative flex flex-col md:flex-row justify-center gap-6 p-6">
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pink-400 text-white p-2 rounded-full hover:bg-pink-500"
        >
          &larr;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`bg-peach-100 rounded-lg p-6 flex-1 transition-opacity duration-500 ${
                index === currentIndex ? 'block' : 'hidden md:block'
              } ${index === currentIndex ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{item.heading}</h2>
              <p className={`text-sm mt-2 ${item.subheadingColor}`}>
                {item.subheading}
              </p>
              <p className="text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pink-400 text-white p-2 rounded-full hover:bg-pink-500"
        >
          &rarr;
        </button>
      </section>

      {/* Best Deal Bouquet Section */}
      <section className="bg-peach-200 py-12 text-center">
        <h2 className="text-4xl font-bold font-cursive text-gray-800">Best Deal Bouquet</h2>
        <p className="text-pink-400 mt-4">
          🌸 Share the love, touch the heart with a special flower arrangement! 🌟
        </p>
        <div className="flex justify-center gap-6 mt-8">
          <Image
            src="/pedo.jpg"
            alt="Bouquet 1"
            width={150}
            height={150}
            className="rounded-lg"
          />
          <Image
            src="/pedo.jpg"
            alt="Bouquet 2"
            width={150}
            height={150}
            className="rounded-lg"
          />
          <Image
            src="/pedo.jpg"
            alt="Bouquet 3"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Our Location Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-peach-100">
        <div className="text-left">
          <h2 className="text-4xl font-bold font-cursive text-gray-800">Our Location</h2>
          <p className="text-gray-600 mt-4">
            Jl. Melati Indah No. 27, Kel. Sakura, Kec. Bloomville, Kota Florencia 12345 🌸
          </p>
          <button className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-full">Maps</button>
        </div>
        <Image
          src="/Kucing.pg"
          alt="Shop Location"
          width={300}
          height={200}
          className="rounded-lg"
        />
      </section>
    </div>
  );
}