'use client';
import logo from '@/assets/florida-yacht-logo.png';
import { useLocation } from '@/hooks/useLocation';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';

interface BannerNavProps {
  bannerTitle?: string;
}

const BannerNav = ({ bannerTitle }: BannerNavProps) => {
  const { location, loading, error, getLocation } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPartnersDropdownOpen, setIsPartnersDropdownOpen] = useState(false);

  // Auto-get location on component mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isPartnersDropdownOpen &&
        !target.closest('.partners-dropdown-container')
      ) {
        setIsPartnersDropdownOpen(false);
      }
    };

    if (isPartnersDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPartnersDropdownOpen]);

  // Format location display
  const getLocationDisplay = () => {
    if (loading) return 'Getting location...';
    if (error) return 'Location unavailable';
    if (location) return `${location.city}, ${location.state}`;
    return 'Florida - USA'; // fallback
  };

  // Handle location click - refresh location
  const handleLocationClick = () => {
    if (!loading) {
      getLocation();
    }
  };

  return (
    <nav
      className={`inset-x-2 md:inset-x-5 rounded-2xl px-3 py-2 text-white z-50 ${bannerTitle ? 'h-auto' : 'h-20 md:h-24'}`}
    >
      <div className="container mx-auto flex justify-between items-center pt-2.5 relative">
        <div className="shrink-0">
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

        <div className="hidden lg:flex flex-col items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="px-3 hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="px-3 hover:text-gray-300 transition-colors flex items-center gap-1 cursor-pointer">
                Boats
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-3 min-w-[200px] z-50 hidden group-hover:block">
                <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden">
                  <Link
                    href="/featured-boats"
                    className="block px-4 py-2 hover:bg-white/20 transition-colors text-white"
                  >
                    Featured Boats
                  </Link>
                  <Link
                    href="/florida-yacht-trader-mls"
                    className="block px-4 py-2 hover:bg-white/20 transition-colors text-white"
                  >
                    Florida Yacht Trader MLS
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/about"
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
            <div className="relative partners-dropdown-container">
              <button
                onClick={() =>
                  setIsPartnersDropdownOpen(!isPartnersDropdownOpen)
                }
                className="px-3 hover:text-gray-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Partners
                <span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isPartnersDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </button>
              {isPartnersDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-xs border border-white/20 rounded-lg shadow-lg min-w-[180px] z-50 ">
                  <a
                    href={
                      process.env.NEXT_PUBLIC_FLORIDA_YACHT_URL ||
                      'https://development.floridayachttrader.com/'
                    }
                    className="block px-4 py-2 hover:bg-white/10 transition-colors text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      setIsPartnersDropdownOpen(false);
                      // Prevent any context errors by using native navigation
                      if (!process.env.NEXT_PUBLIC_FLORIDA_YACHT_URL) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Florida Yacht
                  </a>
                </div>
              )}
            </div>
          </div>
          {bannerTitle && (
            <h2 className="text-sm md:text-base font-medium text-white text-center">
              {bannerTitle}
            </h2>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <div
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/10 rounded-md transition-colors"
            onClick={handleLocationClick}
            title="Click to refresh location"
          >
            <MdMyLocation className="text-white text-lg" />
            <span className="text-white hidden md:inline">
              {getLocationDisplay()}
            </span>
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-linear-to-b from-black/50 to-black/90 backdrop-blur-xs border-t border-white/20">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
            <Link
              href="/"
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className="relative">
              <p className="px-3 py-2 text-white/70 text-sm font-medium">
                Boats
              </p>
              <Link
                href="/featured-boats"
                className="block px-5 py-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Featured Boats
              </Link>
              <Link
                href="/florida-yacht-trader-mls"
                className="block px-5 py-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Florida Yacht Trader MLS
              </Link>
            </div>
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
            <div className="relative partners-dropdown-container">
              <button
                onClick={() =>
                  setIsPartnersDropdownOpen(!isPartnersDropdownOpen)
                }
                className="w-full px-3 py-2 hover:bg-white/10 rounded-md transition-colors flex items-center justify-between"
              >
                <span>Partners</span>
                <IoIosArrowDown
                  className={`transition-transform ${
                    isPartnersDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isPartnersDropdownOpen && (
                <div className="mt-2 ml-4 bg-black/50 backdrop-blur-xs border border-white/20 rounded-lg overflow-hidden">
                  <a
                    href={
                      process.env.NEXT_PUBLIC_FLORIDA_YACHT_URL ||
                      'https://development.floridayachttrader.com/'
                    }
                    className="block px-4 py-2 hover:bg-white/10 transition-colors text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      setIsPartnersDropdownOpen(false);
                      setIsOpen(false);
                      // Prevent any context errors by using native navigation
                      if (!process.env.NEXT_PUBLIC_FLORIDA_YACHT_URL) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Florida Yacht
                  </a>
                </div>
              )}
            </div>
            {bannerTitle && (
              <div className="px-3 py-2 border-t border-white/20 pt-4">
                <h2 className="text-sm font-medium text-white text-center">
                  {bannerTitle}
                </h2>
              </div>
            )}

            <div className="border-t border-white/20 pt-4">
              <div
                className="flex items-center gap-2 px-3 py-2 mb-2 cursor-pointer"
                onClick={handleLocationClick}
                title="Click to refresh location"
              >
                <MdMyLocation className="text-white text-lg" />
                <span className="text-white">{getLocationDisplay()}</span>
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
