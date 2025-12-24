import { demodata } from '@/assets/demo-datas/demodata';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import ProductCard from '@/components/Product/ProductCard';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const FloridaItems = () => {
  return (
    <CustomContainer>
      <div className="my-20 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="text-left space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Florida Yacht Trader
            </h1>
            <p className="text-base sm:text-lg text-secondary-txt">
              Discover the best yachts available right now. These premium
              selections are hand-picked from trusted sellers across Jupiter
              Marine Sales.
            </p>
          </div>
          <div className="flex items-center gap-3 lg:ml-6">
            <button className="bg-gray-300 p-3 rounded-xl">
              <IoIosArrowBack className="text-xl" />
            </button>
            <button className="bg-secondary text-white p-3 rounded-xl">
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {demodata.slice(2, 6).map((item) => (
            <ProductCard isPremium={true} key={item.name} product={item} />
          ))}
        </div>
      </div>
    </CustomContainer>
  );
};

export default FloridaItems;
