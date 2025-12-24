import React from 'react';
import CustomContainer from './CustomContainer';
import BannerNav from '../shared/main/Navbar/BannerNav';

const GradientBannerCustom = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-max max-h-max bg-gradient-to-b from-[#006EF0] to-[#00CABE] rounded-2xl sticky top-2 z-50">
      <BannerNav />
      <div className="py-5 md:py-10">
        <CustomContainer>{children}</CustomContainer>
      </div>
    </div>
  );
};

export default GradientBannerCustom;
