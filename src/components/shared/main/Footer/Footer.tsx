import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/florida-yacht-logo.png';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import CustomContainer from '@/components/CustomComponents/CustomContainer';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <CustomContainer>
        {/* Main Footer Content */}
        <div className=" mx-auto px-4 sm:px-5 lg:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Member Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center p-2 bg-white">
                  <Image
                    src={logo}
                    alt="Florida Yacht Trader Logo"
                    width={80}
                    height={80}
                    className="w-16 h-14"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Florida Yacht Trader
                </h2>
              </div>
              <div>
                <p className="text-gray-50 text-sm mb-3">
                  At Jupiter Marine Seals, we make buying and selling yachts
                  effortless. Built exclusively for the Sunshine State, our
                  platform connects passionate boaters, serious buyers, and
                  trusted sellers in the nation’s most vibrant yachting market.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/boats"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Boats
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6">Need Help?</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link
                    href="/faqs"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact and Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6">Need Help?</h3>
              <div className="space-y-3 sm:space-y-4 mb-6">
                <p className="text-gray-300 text-sm sm:text-base">
                  (954) 673-7702
                </p>
                <p className="text-gray-300 text-sm sm:text-base">
                  info.jupitermarine@gmail.com
                </p>
              </div>

              {/* Newsletter Subscription */}
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © Copyright 2025 by Florida Yacht Trader
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-sm mr-3">
                  Stay Connected:
                </span>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-white text-xl" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-white text-xl" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-white text-xl" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-white text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </footer>
  );
};

export default Footer;
