'use client';
import logo from '@/assets/florida-yacht-logo.png';
import { useLocation } from '@/hooks/useLocation';
import { ChevronDown, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import { getPartners, PartnerResponse } from '@/services/partner/partner';

interface BannerNavProps {
  bannerTitle?: string;
}

const BannerNav = ({ bannerTitle }: BannerNavProps) => {
  const { location, loading, error, getLocation } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isPartnersDropdownOpen, setIsPartnersDropdownOpen] = useState(false);
  const [partners, setPartners] = useState<PartnerResponse[]>([]);

  // Auto-get location on component mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    const fetchPartners = async () => {
      const data = await getPartners('JUPITER');
      setPartners(data);
    };
    fetchPartners();
  }, []);

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
      className={`inset-x-2 md:inset-x-5 rounded-2xl px-3 py-2 text-white z-50 ${bannerTitle ? 'h-auto' : 'md:h-24'}`}
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
              <div className="absolute top-full left-0 pt-3 min-w-[230px] z-50 hidden group-hover:block">
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
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#0d1520]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 z-50 transition-all duration-300 ${
                  partners.length === 1 ? 'w-[280px]' : partners.length === 2 ? 'w-[540px]' : 'w-[800px]'
                }`}>
                  {partners.length === 0 ? (
                    <div className="px-4 py-6 text-sm text-gray-400 text-center">No partners listed</div>
                  ) : (
                    <div className={`grid grid-cols-1 ${
                      partners.length === 1 ? 'grid-cols-1' : partners.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                    } gap-6 divide-y md:divide-y-0 ${
                      partners.length > 1 ? 'md:divide-x' : ''
                    } divide-white/10`}>
                      {partners.map((partner, index) => (
                        <div
                          key={partner.id}
                          className={`flex flex-col justify-between ${
                            index > 0 ? 'md:pl-6' : ''
                          } ${index > 0 ? 'pt-6 md:pt-0' : ''}`}
                        >
                          <div>
                            {/* Logo and Title side-by-side */}
                            <div className="flex items-center gap-3 mb-3">
                              {partner.logo?.url ? (
                                <img
                                  src={partner.logo.url}
                                  alt={partner.name}
                                  className="w-10 h-10 rounded-lg object-contain bg-white/10 p-1.5 flex-shrink-0"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/20 flex-shrink-0">
                                  {partner.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <h4 className="text-white font-bold text-base leading-tight">
                                {partner.name}
                              </h4>
                            </div>

                            {/* Description */}
                            {partner.description && (
                              <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                                {partner.description}
                              </p>
                            )}
                          </div>

                          {/* Action Link */}
                          <a
                            href={partner.link || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-semibold mt-auto group transition-colors"
                            onClick={() => setIsPartnersDropdownOpen(false)}
                          >
                            Learn More
                            <span className="transform group-hover:translate-x-1 transition-transform">
                              &gt;
                            </span>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
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
                <div className="mt-2 ml-4 bg-black/30 backdrop-blur-xs border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5 p-1.5 space-y-1">
                  {partners.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-400 text-center">No partners listed</div>
                  ) : (
                    partners.map((partner) => (
                      <a
                        key={partner.id}
                        href={partner.link || '#'}
                        className="flex items-start gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setIsPartnersDropdownOpen(false);
                          setIsOpen(false);
                        }}
                      >
                        {partner.logo?.url ? (
                          <img
                            src={partner.logo.url}
                            alt={partner.name}
                            className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20 flex-shrink-0">
                            {partner.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-sm">{partner.name}</div>
                          {partner.description && (
                            <div className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">
                              {partner.description}
                            </div>
                          )}
                        </div>
                      </a>
                    ))
                  )}
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
