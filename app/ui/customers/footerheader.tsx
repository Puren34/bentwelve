'use client';

import {
  ShoppingBagIcon,
  Cog8ToothIcon,

} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/customers/home' },
  { name: 'Flowers', href: '/customers/flowers' },
  { name: 'About', href: '/customers/about' },
  { name: 'Contact', href: '/customers/contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#D3628B] text-white flex justify-between items-center h-20 px-8">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/icons/fs.png" alt="FlowerScotch Logo" className="w-32 h-auto" />
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href; // Cek apakah link ini aktif

          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center gap-2 p-3 rounded-r-full text-white relative group transition-all',
                {
                  'opacity-50': !isActive, // Tambahkan efek opacity jika tidak aktif
                }
              )}
            >
              {/* Garis bawah saat hover */}
              <div className="absolute left-0 bottom-[-4px] h-[4px] w-0 bg-white opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300 rounded-full"></div>
              <span>{link.name}</span>
            </Link>

      );
    })}
      </div>

      <div className="flex items-center gap-4">
          <ShoppingBagIcon className='w-5 h-5' />
        <span>Michael Mishra</span>
          <Cog8ToothIcon className='w-5 h-5' /> 
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#FDCEDF] text-white text-center">

      <h1 className="text-xl font-bold mb-4 text-pink-700">FlowerScotch</h1>
      <hr className="border-t-4 border-pink-400 mb-4 w-1/2 mx-auto" />
      <div className="flex justify-center space-x-6">
        
        {navLinks.map((link) => (
          <Link
          key={link.name}
          href={link.href}
          className="relative text-sm font-bold text-black after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[4px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        > {link.name}
          </Link>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <div className="w-8 h-8 rounded-full border border-pink-400 flex items-center justify-center">
            <Image src="/icons/X.png" alt="Twitter" width={20} height={20} />
          </div>
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <div className="w-8 h-8 rounded-full border border-pink-400 flex items-center justify-center">
            <Image src="/icons/instagram.png" alt="Instagram" width={20} height={20} />
          </div>
        </Link>
        <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <div className="w-8 h-8 rounded-full border border-pink-400 flex items-center justify-center">
            <Image src="/icons/tiktok.png" alt="TikTok" width={20} height={20} />
          </div>
        </Link>
        <Link href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <div className="w-8 h-8 rounded-full border border-pink-400 flex items-center justify-center">
            <Image src="/icons/whatsapp.png" alt="WhatsApp" width={20} height={20} />
          </div>
        </Link>
      </div>
      <div className="bg-[#D3628B] py-3 mt-3 w-full">
      <p className="text-sm text-center m-0 p-0">Copyright ©2025; Designed by FlowerScotch</p>
      </div>
    </footer>
  );
}