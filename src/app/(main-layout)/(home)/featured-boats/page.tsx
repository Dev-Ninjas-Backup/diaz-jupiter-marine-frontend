'use client';
import banner from '@/assets/search-listing-image/banner.jpg';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { BackendBoatsComFilterParams } from '@/services/boats/boatsCom';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useState } from 'react';
import AllListing from './_components/AllListing';
import FilterListing from './_components/FilterListing';

const paramsToFilters = (
  params: URLSearchParams,
): BackendBoatsComFilterParams | undefined => {
  const f: BackendBoatsComFilterParams = {};
  if (params.get('search')) f.search = params.get('search')!;
  if (params.get('make')) f.make = params.get('make')!;
  if (params.get('model')) f.model = params.get('model')!;
  if (params.get('boatType')) f.boatType = params.get('boatType')!;
  if (params.get('year')) f.year = params.get('year')!;
  if (params.get('maxPrice')) f.maxPrice = Number(params.get('maxPrice'));
  if (params.get('lengthMin')) f.lengthMin = Number(params.get('lengthMin'));
  if (params.get('lengthMax')) f.lengthMax = Number(params.get('lengthMax'));
  if (params.get('condition')) f.condition = params.get('condition')!;
  if (params.get('state')) f.state = params.get('state')!;
  if (params.get('city')) f.city = params.get('city')!;
  return Object.keys(f).length ? f : undefined;
};

const filtersToParams = (
  filters: BackendBoatsComFilterParams | undefined,
): URLSearchParams => {
  const params = new URLSearchParams();
  if (!filters) return params;
  if (filters.search) params.set('search', filters.search);
  if (filters.make) params.set('make', filters.make);
  if (filters.model) params.set('model', filters.model);
  if (filters.boatType) params.set('boatType', filters.boatType);
  if (filters.year) params.set('year', filters.year);
  if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice));
  if (filters.lengthMin) params.set('lengthMin', String(filters.lengthMin));
  if (filters.lengthMax) params.set('lengthMax', String(filters.lengthMax));
  if (filters.condition) params.set('condition', filters.condition);
  if (filters.state) params.set('state', filters.state);
  if (filters.city) params.set('city', filters.city);
  return params;
};

const FeaturedBoatsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeFilters = paramsToFilters(searchParams);

  const handleFilter = useCallback(
    (filters: BackendBoatsComFilterParams | undefined) => {
      const params = filtersToParams(filters);
      const query = params.toString();
      router.push(query ? `/featured-boats?${query}` : '/featured-boats', {
        scroll: false,
      });
    },
    [router],
  );

  return (
    <div>
      <CustomBanner banner={banner}>
        <div className="text-center mt-[5%] p-4 2xl:p-7 bg-white/10 backdrop-blur-sm rounded-2xl flex flex-col gap-4">
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            Boats Listing For{' '}
            <span className="text-accent">&quot;Featured Boats&quot;</span>
          </h1>
        </div>
      </CustomBanner>

      <CustomContainer>
        <div className="md:hidden my-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors w-full"
          >
            Filter
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-10 py-4 h-full">
          <div className="hidden md:block w-1/4 h-full">
            <FilterListing
              onFilter={handleFilter}
              initialValues={activeFilters}
            />
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
            />
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
                  handleFilter(f);
                  setIsDrawerOpen(false);
                }}
                initialValues={activeFilters}
              />
            </div>
          </div>
        )}
      </CustomContainer>

      <AdComponent />
    </div>
  );
};

const FeaturedBoatsPage = () => (
  <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
    <FeaturedBoatsContent />
  </Suspense>
);

export default FeaturedBoatsPage;
