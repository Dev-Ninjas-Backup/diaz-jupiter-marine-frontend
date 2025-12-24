'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/assets/florida-yacht-logo.png';
import Link from 'next/link';
import { MdMyLocation } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

const BannerNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="inset-x-2 md:inset-x-5  rounded-2xl px-3 py-2 text-white z-50 h-20 md:h-24">
      <div className="container mx-auto flex justify-between items-center pt-2.5">
        <div className="flex-shrink-0">
          <Link href={'/'}>
            <Image
              src={logo}
              alt="Florida Yacht Logo"
              width={80}
              height={80}
              className="w-10 h-10 md:w-16 md:h-16 shrink-0 bg-white rounded-full p-1 "
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <Link href="/" className="px-3 hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link
            href="/search-listing"
            className="px-3 hover:text-gray-300 transition-colors"
          >
            Boats
          </Link>
          <Link
            href="/search-listing"
            className="px-3 hover:text-gray-300 transition-colors flex items-center gap-2"
          >
            <span className="hidden xl:inline">About</span>
          </Link>
          <Link
            href="/blogs"
            className="px-3 hover:text-gray-300 transition-colors"
          >
            Blogs
          </Link>
          <Link
            href="/blogs"
            className="px-3 hover:text-gray-300 transition-colors"
          >
            Partners
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/10 rounded-md transition-colors">
            <MdMyLocation className="text-white text-lg" />
            <span className="text-white hidden md:inline">Florida - USA</span>
            <IoIosArrowDown className="text-white" />
          </div>
          <Link
            href={'/contact'}
            className="hover:text-gray-300 transition-colors border border-white px-3 py-2 rounded-md"
          >
            Contact
          </Link>
        </div>

        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-black/50 to-black/90 backdrop-blur-xs border-t border-white/20">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link
              href="/"
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/search-listing"
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Boats
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blogs"
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="/search-listing"
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              Partners
            </Link>

            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <MdMyLocation className="text-white text-lg" />
                <span className="text-white">Florida - USA</span>
                <IoIosArrowDown className="text-white" />
              </div>
              <Link
                href="/contact"
                className="hover:text-gray-300 transition-colors border border-white px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default BannerNav;
