'use client';

import React, { useEffect, useRef, useState } from 'react';
import BannerNav from '../shared/main/Navbar/BannerNav';
import CustomContainer from './CustomContainer';

const GradientBannerCustom = ({ children }: { children: React.ReactNode }) => {
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Measure initial banner height
    const measureHeights = () => {
      if (bannerRef.current) {
        setBannerHeight(bannerRef.current.offsetHeight);
      }
    };

    measureHeights();

    // Update height on window resize
    const handleResize = () => {
      measureHeights();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);

  return (
    <>
      {/* Placeholder to maintain page height */}
      <div
        className="w-full"
        style={{
          height: bannerHeight || 'clamp(150px, 25vh, 300px)',
        }}
      />

      <div
        ref={bannerRef}
        className="bg-linear-to-b from-[#006EF0] to-[#00CABE] rounded-xl md:rounded-2xl fixed top-0 left-0 right-0 z-50 mx-1 sm:mx-2 md:mx-5 my-1 sm:my-2 md:my-3"
      >
        <BannerNav />
        <CustomContainer>
          <div className="py-1 sm:py-2">{children}</div>
        </CustomContainer>
      </div>
    </>
  );
};

export default GradientBannerCustom;
