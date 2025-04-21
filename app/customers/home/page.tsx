'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Welcome from '@/app/ui/customers/welcome';

const carouselItems = [
  {
    image: '/bunga.png',
    alt: 'Description',
    heading: 'FlowerScotch',
    subheading: 'Est. 2020',
    subheadingColor: 'text-pink-400',
    description:
      'Elegant flower arrangements with a touch of luxury for every special moment. Bring beauty to every occasion! 🌸✨',
  },
  {
    image: '/decor.png',
    alt: 'Bouquet',
    heading: 'Decoration',
    subheading: '🎀 Elegant Decoration for Various Events',
    subheadingColor: 'text-red-400',
    description: 'Make special moments more memorable with floral decorations for weddings, formal events, and intimate celebrations.',
  },
  {
    image: '/workshop.png',
    alt: 'Bouquet',
    heading: 'Event & Workshop',
    subheading: '🌿 Learn to Arrange Flowers',
    subheadingColor: 'text-green-400',
    description: 'Join an exclusive workshop from Flowerscotchs and learn how to create beautiful bouquets with professional techniques.',
  },
  {
    image: '/flowers.png',
    alt: 'Bouquet',
    heading: 'Bouquet & Fresh Flower',
    subheading: '💐 Fresh Bouquet & Flower Collection',
    subheadingColor: 'text-blue-400',
    description: 'From roses to exotic flowers, we bring you beautiful bouquets crafted with love for every occasion.',
  },
];

export default function FlowersPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="">
      {/* Welcome Text with Fade In */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 animate-fade-in rounded-lg bg-[#FFBE98] p-6 shadow-lg my-6">
          <Welcome />
        </h1>
      </div>
      
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
              className={`bg-[#FFBE98] rounded-lg p-6 flex-1 transition-opacity duration-500 shadow-lg my-6 ${index === currentIndex ? 'block' : 'hidden md:block'} ${index === currentIndex ? 'opacity-100' : 'opacity-50'}`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4 rounded-lg">{item.heading}</h2>
              <p className={`text-sm mt-2 ${item.subheadingColor} rounded-lg`}>{item.subheading}</p>
              <p className="text-gray-600 mt-2 rounded-lg">{item.description}</p>
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
      <section className="bg-[#FEECE2] py-12 text-center rounded-sm shadow-lg my-12">
        {/* <h2 className="text-4xl font-bold font-cursive text-gray-800 rounded-lg">Best Deal Bouquet</h2> */}
        <h2 className="text-4xl font-bold text-gray-800" style={{ fontFamily: 'Pacifico, cursive' }}>
          Special Flower Packages
        </h2>
        <p className="text-pink-400 mt-4 rounded-lg">
          🌸 Share the love, touch the heart with a special flower arrangement! 🌟
        </p>
        <div className="flex justify-center gap-6 mt-8">
          <Image
            src="/f1.png"
            alt="Bouquet 1"
            width={150}
            height={150}
            className="rounded-lg"
          />
          <Image
            src="/f2.png"
            alt="Bouquet 2"
            width={150}
            height={150}
            className="rounded-lg"
          />
          <Image
            src="/f3.png"
            alt="Bouquet 3"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Our Location Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-[#FFBE98] rounded-lg shadow-lg my-6">
        <div className="text-left">
          <h2 className="text-4xl font-bold font-cursive text-gray-800 rounded-lg">Our Location</h2>
          <p className="text-gray-600 mt-4 rounded-lg">
            Jl. Melati Indah No. 27, Kel. Sakura, Kec. Bloomville, Kota Florencia 12345 🌸
          </p>
          <button className="mt-6 bg-gray-800 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow duration-300">Maps</button>
        </div>
        <Image
          src="/place.png"
          alt="Shop Location"
          width={300}
          height={200}
          className="rounded-lg"
        />
      </section>
    </div>
  );
}
