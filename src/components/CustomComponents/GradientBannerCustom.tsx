'use client';

import React, { useEffect, useRef, useState } from 'react';
import BannerNav from '../shared/main/Navbar/BannerNav';
import CustomContainer from './CustomContainer';

const GradientBannerCustom = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Measure initial banner height
    if (bannerRef.current) {
      setBannerHeight(bannerRef.current.offsetHeight);
    }

    // Measure navbar height
    const navElement = bannerRef.current?.querySelector('nav');
    if (navElement) {
      setNavbarHeight(navElement.offsetHeight);
    }

    // Update height on window resize
    const handleResize = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight);
      }
      const navElement = bannerRef.current?.querySelector('nav');
      if (navElement) {
        setNavbarHeight(navElement.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;

          // Simple threshold - only change state when crossing the boundary
          if (scrollPosition > 100 && !isScrolled) {
            setIsScrolled(true);
          } else if (scrollPosition <= 20 && isScrolled) {
            setIsScrolled(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <>
      {/* Placeholder to maintain page height - always show initial banner space */}
      <div
        className="w-full"
        style={{
          height: bannerHeight || 'clamp(200px, 30vh, 400px)',
        }}
      />

      <div
        ref={bannerRef}
        className="bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-xl md:rounded-2xl fixed top-0 left-0 right-0 z-50 mx-1 sm:mx-2 md:mx-5 my-1 sm:my-2 md:my-3 transition-[min-height,max-height,height] duration-500 ease-in-out"
        style={{
          minHeight: isScrolled
            ? `${navbarHeight || 80}px`
            : 'clamp(200px, 30vh, 400px)',
          height: isScrolled ? `${navbarHeight || 80}px` : 'auto',
        }}
      >
        <BannerNav />
        {!isScrolled && (
          <CustomContainer>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden max-h-[200px] sm:max-h-[250px] md:max-h-[300px] opacity-100 scale-100 py-2 sm:py-3 md:py-4`}
            >
              {children}
            </div>
          </CustomContainer>
        )}
      </div>
    </>
  );
};

export default GradientBannerCustom;
