'use client';
import React, { useState } from 'react';
import banner from '@/assets/search-listing-image/banner.jpg';
import { IoSearchSharp, IoSparkles } from 'react-icons/io5';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import FilterListing from './_components/FilterListing';
import AllListing from './_components/AllListing';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import AdComponent from '@/components/CustomComponents/AdComponent';

const SearchListingPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <CustomBanner banner={banner}>
        <div className="text-center mt-[5%] p-4 2xl:p-7 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center gap-5">
          <div className="bg-white p-1 md:p-3 rounded-2xl  w-full flex items-center gap-2 md:gap-5">
            <input
              type="text"
              placeholder="Example: find me a Viking for sale from 2005 to 2008"
              className="px-4 py-2 md:py-1 focus:outline-none w-full"
            />
            <button className="px-3 py-2 rounded-xl bg-gray-200 text-black flex items-center gap-1 min-w-max  font-semibold">
              <IoSparkles className=" text-black" />
              <p>Ask AI</p>
            </button>
          </div>
          <button className="bg-secondary text-sm md:text-base text-white px-2 md:px-5 py-2 md:py-4 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 min-w-max">
            <IoSearchSharp /> <span>Show My Boat</span>
          </button>
        </div>
      </CustomBanner>

      <CustomContainer>
        <div className="md:hidden my-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Filter
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-10 py-4 h-full">
          <div className="hidden md:block w-1/4 h-full">
            <FilterListing />
          </div>
          <div className="w-full md:w-3/4">
            <AllListing />
          </div>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsDrawerOpen(false)}
            ></div>
            <div className="absolute left-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <FilterListing />
            </div>
          </div>
        )}
      </CustomContainer>

      <AdComponent />
    </div>
  );
};

export default SearchListingPage;
