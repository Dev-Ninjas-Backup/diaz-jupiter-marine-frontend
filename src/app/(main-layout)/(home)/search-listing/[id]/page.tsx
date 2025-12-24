'use client';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import SendMessage from './_components/SendMessage';

const SearchListingDetailsPage = () => {
  const navigate = useRouter();
  return (
    <div>
      <GradientBannerCustom>
        <div className="text-white flex flex-col md:flex-row items-start justify-between gap-3 w-full pt-10 md:pt-12">
          <div className="flex flex-row items-center justify-start gap-3 font-semibold text-sm md:text-xl lg:text-2xl">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => navigate.back()}
            />
            <h1>2018 Viking 80 Enclosed Skybridge</h1>
          </div>
          <div className="text-right md:text-left text-sm md:text-xl lg:text-2xl pl-5 w-full md:w-max">
            <p>Price: $1,195,000</p>
            <p className="text-xs md:text-base lg:text-lg">Montauk, NY</p>
          </div>
        </div>
      </GradientBannerCustom>
      <CustomContainer>
        <div className="flex flex-col md:flex-row items-start gap-10 py-5">
          <div className="md:w-2/3">
            <ItemDetailsComponents />
          </div>
          <div className="md:w-1/3">
            <SendMessage />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default SearchListingDetailsPage;
