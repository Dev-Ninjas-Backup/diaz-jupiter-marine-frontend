import React from 'react';
import CustomContainer from '@/components/CustomComponents/CustomContainer';

const TermsBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#006EF0] to-[#00CABE] py-12 md:py-16 lg:py-20">
      <CustomContainer>
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center uppercase tracking-wide">
          TERMS AND CONDITIONS
        </h1>
      </CustomContainer>
    </div>
  );
};

export default TermsBanner;

