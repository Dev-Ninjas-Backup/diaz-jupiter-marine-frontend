'use client';
import banner from '@/assets/search-listing-image/banner.jpg';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { BoatsComFilterParams } from '@/services/boats';
import { postAiQuery } from '@/services/query';
import { SearchQueryData } from '@/types/search-query-types';
import { useState } from 'react';
import { IoSearchSharp, IoSparkles } from 'react-icons/io5';
import AllListing from './_components/AllListing';
import FilterListing from './_components/FilterListing';

const SearchListingPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<
    BoatsComFilterParams | undefined
  >(undefined);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveFilters(undefined);
  };

  const handleAskAI = async () => {
    if (!searchInput.trim()) {
      setActiveFilters(undefined);
      return;
    }
    setIsLoading(true);
    try {
      const updatedQueryData: SearchQueryData = { query: searchInput };
      const aiResponse = await postAiQuery({ queryData: updatedQueryData });
      if (aiResponse?.data) {
        // AI returns keyword-like results — use keyword filter on boats.com
        setActiveFilters({ keyword: searchInput });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleAskAI();
    }
  };

  return (
    <div>
      <CustomBanner banner={banner}>
        <div className="text-center mt-[5%] p-4 2xl:p-7 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center gap-5">
          <div className="bg-white p-1 md:p-3 rounded-2xl  w-full flex items-center gap-2 md:gap-5">
            <input
              type="text"
              placeholder="Example: find me a Viking for sale from 2005 to 2008"
              className="px-4 py-2 md:py-1 focus:outline-none w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {searchInput.length > 0 ? (
              <button
                className="p-1 text-xs rounded-2xl bg-accent"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            ) : (
              ''
            )}
            <button
              onClick={handleAskAI}
              disabled={isLoading}
              className={`px-3 py-2 rounded-xl bg-gray-200 text-black flex items-center gap-1 min-w-max font-semibold transition-all ${
                isLoading
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-gray-300 active:scale-95'
              }`}
            >
              <IoSparkles
                className={`text-black ${isLoading ? 'animate-spin' : ''}`}
              />
              <p>{isLoading ? 'Searching...' : 'Ask AI'}</p>
            </button>
          </div>
          <button
            onClick={handleAskAI}
            disabled={isLoading}
            className={`bg-secondary text-sm md:text-base text-white px-2 md:px-5 py-2 md:py-4 rounded-lg hover:bg-secondary transition-all flex items-center gap-2 min-w-max ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            <IoSearchSharp className={isLoading ? 'animate-pulse' : ''} />{' '}
            <span>{isLoading ? 'Searching...' : 'Show My Boat'}</span>
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
            <FilterListing onFilter={setActiveFilters} />
          </div>
          <div className="w-full md:w-3/4">
            <AllListing filters={activeFilters} />
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
              <FilterListing
                onFilter={(f) => {
                  setActiveFilters(f);
                  setIsDrawerOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </CustomContainer>

      <AdComponent />
    </div>
  );
};

export default SearchListingPage;
