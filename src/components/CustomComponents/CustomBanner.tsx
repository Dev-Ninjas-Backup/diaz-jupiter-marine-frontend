import Image, { StaticImageData } from 'next/image';
import React from 'react';
import CustomContainer from './CustomContainer';

interface CustomBannerProps {
  banner: string | StaticImageData;
  children: React.ReactNode;
}

const CustomBanner = ({ banner, children }: CustomBannerProps) => {
  return (
    <div className="w-full h-[200px] md:h-[400px] relative rounded-2xl overflow-hidden">
      <Image
        src={banner}
        alt="Search Listing"
        className="w-full h-full object-cover"
        width={1200}
        height={300}
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-end flex-col space-y-10 py-10 px-5">
        <CustomContainer>
          <div className="pt-[7%]">{children}</div>
        </CustomContainer>
      </div>
    </div>
  );
};

export default CustomBanner;
