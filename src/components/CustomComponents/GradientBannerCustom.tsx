'use client';

import React, { useEffect, useRef, useState } from 'react';
import BannerNav from '../shared/main/Navbar/BannerNav';
import CustomContainer from './CustomContainer';

const GradientBannerCustom = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [bannerTitle, setBannerTitle] = useState<string>('');
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extract title from children
    const timeoutId = setTimeout(() => {
      if (contentRef.current) {
        const titleElement = contentRef.current.querySelector('h1');
        if (titleElement) {
          setBannerTitle(titleElement.textContent || '');
        }
      }
    }, 0);

    // Measure initial banner height
    const measureHeights = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight);
      }

      const navElement = bannerRef.current?.querySelector('nav');
      if (navElement) {
        setNavbarHeight(navElement.offsetHeight);
      }
    };

    measureHeights();

    // Update height on window resize
    const handleResize = () => {
      measureHeights();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);

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
          height: bannerHeight || 'clamp(150px, 25vh, 300px)',
        }}
      />

      <div
        ref={bannerRef}
        className="bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-xl md:rounded-2xl fixed top-0 left-0 right-0 z-50 mx-1 sm:mx-2 md:mx-5 my-1 sm:my-2 md:my-3 transition-[min-height,max-height,height] duration-500 ease-in-out"
        style={{
          minHeight: isScrolled
            ? `${navbarHeight || 80}px`
            : 'clamp(150px, 25vh, 300px)',
          height: isScrolled ? `${navbarHeight || 80}px` : 'auto',
        }}
      >
        <BannerNav bannerTitle={isScrolled ? bannerTitle : ''} />
        <CustomContainer>
          <div
            ref={contentRef}
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isScrolled
                ? 'max-h-0 opacity-0'
                : 'max-h-[150px] sm:max-h-[180px] md:max-h-[200px] opacity-100'
            } py-1 sm:py-2`}
          >
            {children}
          </div>
        </CustomContainer>
      </div>
    </>
  );
};

export default GradientBannerCustom;
