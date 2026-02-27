'use client';
import banner from '@/assets/search-listing-image/banner.jpg';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import AllListing from './_components/AllListing';

const SearchListingPage = () => {
  return (
    <div>
      <CustomBanner banner={banner}>
        <div className="text-center mt-[5%] p-4 2xl:p-7 bg-white/10 backdrop-blur-sm rounded-2xl flex flex-col gap-4">
          <h1 className="hidden sm:block text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            Boats Listing For{' '}
            <span className="text-accent">&quot;Florida Yacht Trader MLS&quot;</span>
          </h1>
        </div>
      </CustomBanner>

      <CustomContainer>
        <div className="py-4">
          <AllListing />
        </div>
      </CustomContainer>

      <AdComponent />
    </div>
  );
};

export default SearchListingPage;
