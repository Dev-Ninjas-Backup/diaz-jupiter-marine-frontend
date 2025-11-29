'use client';
import ProductCard from '@/components/Product/ProductCard';
import Pagination from '@/components/ui/Pagination';
import { useSearchResults } from '@/context/SearchResultsContext';
import { getAllBoats } from '@/services/boats';
import { YachtProduct } from '@/types/product-types-demo';
import { useEffect, useMemo, useState } from 'react';

// Interface for the API boat response
interface ApiBoatResponse {
  DocumentID: string;
  MakeString?: string;
  Model?: string;
  ModelYear?: number;
  LengthOverall?: string;
  NominalLength?: string;
  BeamMeasure?: string;
  Price?: string | number;
  Engines?: Array<{
    Fuel?: string;
  }>;
  BoatLocation?: {
    BoatCityName?: string;
    BoatStateCode?: string;
  };
  Images?: {
    Uri?: string;
  };
  Link?: string;
}

const AllListing = () => {
  const { searchResults, isSearchActive } = useSearchResults();
  const [page, setPage] = useState(1);
  const [initialBoats, setInitialBoats] = useState<YachtProduct[]>([]);
  const [isLoadingBoats, setIsLoadingBoats] = useState(false);
  const perPage = 9;

  // Fetch initial boats data when component mounts or when not in search mode
  useEffect(() => {
    const fetchInitialBoats = async () => {
      if (!isSearchActive) {
        setIsLoadingBoats(true);
        try {
          const response = await getAllBoats({ page: 1, limit: perPage });
          if (response?.success && response?.data) {
            console.log('Initial Boats:', response.data);
            // Convert API data to YachtProduct format
            const convertedBoats: YachtProduct[] = response.data.map(
              (boat: ApiBoatResponse) => {
                // Parse price - handle "114900.00 USD" format
                let price: number | undefined;
                if (typeof boat.Price === 'string') {
                  const priceMatch = boat.Price.match(/([\d,.]+)/);
                  if (priceMatch) {
                    price = parseFloat(priceMatch[1].replace(/,/g, ''));
                  }
                } else if (typeof boat.Price === 'number') {
                  price = boat.Price;
                }

                return {
                  id: boat.DocumentID,
                  brand_make: boat.MakeString || 'Unknown Make',
                  model: boat.Model || 'Unknown Model',
                  built_year: boat.ModelYear || 0,
                  length: boat.LengthOverall || boat.NominalLength || 'N/A',
                  number_of_engine: boat.Engines?.length || 0,
                  class: 'Power',
                  material: 'Fiberglass',
                  number_of_cabin: 0,
                  number_of_heads: 0,
                  beam_size: boat.BeamMeasure || 'N/A',
                  fuel_type:
                    boat.Engines?.[0]?.Fuel?.toLowerCase() || 'Not specified',
                  max_draft: 'N/A',
                  name: `${boat.MakeString} ${boat.Model}`,
                  location: boat.BoatLocation
                    ? `${boat.BoatLocation.BoatCityName || ''}, ${boat.BoatLocation.BoatStateCode || ''}`
                    : 'Location not specified',
                  condition: 'Used',
                  price: price,
                  images: boat.Images?.Uri ? [boat.Images.Uri] : [],
                  image: boat.Images?.Uri || '/placeholder-boat.jpg',
                  link: boat.Link || `/search-listing/${boat.DocumentID}`,
                };
              },
            );
            setInitialBoats(convertedBoats);
          }
        } catch (error) {
          console.error('Error fetching initial boats:', error);
        } finally {
          setIsLoadingBoats(false);
        }
      }
    };

    fetchInitialBoats();
  }, [isSearchActive]);

  // Use search results if available, otherwise use initial boats data
  const dataToDisplay =
    isSearchActive && searchResults ? searchResults : initialBoats;

  const totalItems = dataToDisplay.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return dataToDisplay.slice(start, start + perPage);
  }, [page, dataToDisplay]);

  // Reset to page 1 when search results change
  useEffect(() => {
    setPage(1);
  }, [searchResults]);

  return (
    <div>
      <p className="text-gray-400 font-medium text-sm md:text-lg">
        {isSearchActive && searchResults ? 'Search Results: ' : ''}
        Showing {(page - 1) * perPage + 1} to{' '}
        {Math.min(page * perPage, totalItems)} of {totalItems} results
      </p>
      {isLoadingBoats ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
            {pageItems.map((data, idx) => (
              <ProductCard
                isPremium={false}
                key={'id' in data && data.id ? data.id : idx}
                product={data}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllListing;
