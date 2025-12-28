'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';
import CustomContainer from './CustomContainer';

interface CustomBannerProps {
  banner?: string | StaticImageData;
  bannerTitle?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const CustomBanner = ({
  banner,
  bannerTitle,
  subtitle,
  children,
}: CustomBannerProps) => {
  // Use provided banner or fallback
  const bannerImage = banner || '/placeholder-banner.jpg';

  return (
    <div className="w-full h-[200px] xl:h-[300px] 2xl:h-[400px] relative rounded-2xl overflow-hidden">
      <Image
        src={bannerImage}
        alt={bannerTitle || 'Banner'}
        className="w-full h-full object-cover"
        width={1200}
        height={300}
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-end flex-col space-y-10 py-10 px-5">
        <CustomContainer>
          <div className="pt-[5%] 2xl:pt-[7%] text-center w-full">
            {children ? (
              children
            ) : (
              <div className="space-y-3">
                {bannerTitle && (
                  <h1 className="text-white text-xl md:text-4xl xl:text-5xl 2xl:text-6xl uppercase font-bold md:tracking-[5px] leading-normal">
                    {bannerTitle}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-white text-sm md:text-lg xl:text-xl 2xl:text-2xl">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        </CustomContainer>
      </div>
    </div>
  );
};

export default CustomBanner;
