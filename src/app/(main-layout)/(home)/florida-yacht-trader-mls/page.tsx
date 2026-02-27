'use client';
import banner from '@/assets/search-listing-image/banner.jpg';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { YBFilterParams } from '@/services/boats/yachtbroker';
import { useState } from 'react';
import AllListing from './_components/AllListing';
import FilterListing from './_components/FilterListing';

const SearchListingPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<
    YBFilterParams | undefined
  >(undefined);
  // const { queryData, setSearchResults, setIsSearchActive, setQueryData } =
  //   useSearchResults();
  // const [searchInput, setSearchInput] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  // Populate search input from queryData
  // useEffect(() => {
  //   if (queryData?.query) {
  //     setSearchInput(queryData.query);
  //   }
  // }, [queryData]);

  // const handleClearSearch = () => {
  //   setSearchInput('');
  //   setSearchResults(null);
  //   setIsSearchActive(false);
  //   setQueryData(null);
  // };

  // const handleAskAI = async () => {
  //   if (!searchInput.trim()) {
  //     // If no search input, show all data (demo data)
  //     setSearchResults(null);
  //     setIsSearchActive(false);
  //     setQueryData(null);
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const updatedQueryData: SearchQueryData = {
  //       query: searchInput,
  //     };

  //     console.log('AI Query Data:', updatedQueryData);

  //     const aiResponse = await postAiQuery({ queryData: updatedQueryData });
  //     if (aiResponse?.data) {
  //       // Convert Filter API data to YachtProduct format (AI response uses same structure as filter)
  //       const yachtProducts = aiResponse.data.map((boat: FilterApiBoatData) =>
  //         convertFilterApiDataToYachtProduct(boat),
  //       );

  //       setSearchResults(yachtProducts);
  //       setIsSearchActive(true);
  //       setQueryData(updatedQueryData);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter' && !isLoading) {
  //     handleAskAI();
  //   }
  // };

  return (
    <div>
      <CustomBanner banner={banner}>
        <div className="text-center mt-[5%] p-4 2xl:p-7 bg-white/10 backdrop-blur-sm rounded-2xl flex flex-col gap-4">
          <h1 className="hidden sm:block text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            Boats Listing For{' '}
            <span className="text-accent">"Florida Yacht Trader MLS"</span>
          </h1>
          {/* <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
            <div className="bg-white p-2 rounded-2xl flex-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="Example: find me a Viking for sale from 2005 to 2008"
                className="px-3 py-2 focus:outline-none w-full text-sm md:text-base"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {searchInput.length > 0 && (
                <button
                  className="px-2 py-1 text-xs rounded-xl bg-accent shrink-0"
                  onClick={handleClearSearch}
                >
                  Clear
                </button>
              )}
              <button
                onClick={handleAskAI}
                disabled={isLoading}
                className={`px-3 py-2 rounded-xl bg-gray-200 text-black flex items-center gap-1 shrink-0 font-semibold text-sm transition-all ${
                  isLoading
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:bg-gray-300 active:scale-95'
                }`}
              >
                <IoSparkles
                  className={`text-black ${isLoading ? 'animate-spin' : ''}`}
                />
                <span className="hidden sm:inline">
                  {isLoading ? 'Searching...' : 'Ask AI'}
                </span>
              </button>
            </div>
            <button
              onClick={handleAskAI}
              disabled={isLoading}
              className={`bg-secondary text-white px-5 py-3 rounded-xl hover:bg-secondary transition-all flex items-center justify-center gap-2 text-sm md:text-base ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'
              }`}
            >
              <IoSearchSharp className={isLoading ? 'animate-pulse' : ''} />
              <span>{isLoading ? 'Searching...' : 'Show My Boat'}</span>
            </button>
          </div> */}
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
