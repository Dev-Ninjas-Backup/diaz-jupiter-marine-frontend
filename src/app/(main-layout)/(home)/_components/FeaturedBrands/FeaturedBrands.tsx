import { brandImages } from '@/assets/demo-datas/demodata';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const FeaturedBrands = () => {
  return (
    <div className="py-20">
      <CustomContainer>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Our Featured Yacht Brands
        </h1>
        <div className="space-y-10 my-20 px-4 sm:px-8 md:px-16 lg:px-[10%] relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-linear-to-r from-white via-white to-transparent pointer-events-none z-40" />
          <div className="absolute right-0 top-0 h-full w-20 sm:w-[120px] md:w-[200px] lg:w-[350px] bg-linear-to-l from-white via-white to-transparent pointer-events-none z-40" />

          <div className="flex items-center relative">
            <Marquee direction="right" gradient={false} speed={40} pauseOnHover>
              {brandImages.map((brand) => (
                <div key={brand.id} className="mx-4 sm:mx-6 md:mx-8">
                  <div className="relative w-24 sm:w-28 md:w-36 lg:w-40 h-10 sm:h-12 md:h-16">
                    <Image
                      src={brand.image}
                      alt={`Brand ${brand.id}`}
                      height={400}
                      width={800}
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          <div>
            <Marquee direction="left" gradient={false} speed={25} pauseOnHover>
              {brandImages.map((brand) => (
                <div key={brand.id} className="mx-4 sm:mx-6 md:mx-8">
                  <div className="relative w-24 sm:w-28 md:w-36 lg:w-40 h-10 sm:h-12 md:h-16">
                    <Image
                      src={brand.image}
                      alt={`Brand ${brand.id}`}
                      height={400}
                      width={800}
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default FeaturedBrands;
