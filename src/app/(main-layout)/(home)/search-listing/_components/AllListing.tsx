'use client';
import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton';
import Pagination from '@/components/ui/Pagination';
import { useSearchResults } from '@/context/SearchResultsContext';
import { getAllBoats } from '@/services/boats';
import { YachtProduct } from '@/types/product-types-demo';
import { useEffect, useState } from 'react';

// Interface for YachtBroker API boat response
interface YachtBrokerBoatResponse {
  ID: number;
  Manufacturer?: string;
  Model?: string;
  Year?: number;
  LOAFeet?: number;
  BeamFeet?: number;
  BeamInch?: number;
  PriceUSD?: number;
  FuelType?: string;
  City?: string;
  State?: string;
  Country?: string;
  DisplayPicture?: {
    Large?: string;
    HD?: string;
    Medium?: string;
  };
  VesselName?: string;
  Condition?: string;
  Type?: string;
  HullMaterial?: string;
  CabinCount?: number;
  CrewHeadCount?: number;
}

const AllListing = () => {
  const { searchResults, isSearchActive } = useSearchResults();
  const [page, setPage] = useState(1);
  const [allBoats, setAllBoats] = useState<YachtProduct[]>([]);
  const [isLoadingBoats, setIsLoadingBoats] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 9,
    total: 0,
    last_page: 1,
  });
  const perPage = 9;

  // Fetch boats data when page changes or when not in search mode
  useEffect(() => {
    const fetchBoats = async () => {
      if (!isSearchActive) {
        setIsLoadingBoats(true);
        try {
          const response = await getAllBoats({ page, limit: perPage });
          if (response?.success && response?.data) {
            console.log('🚤 API Response:', response);
            console.log('📄 Pagination Data:', response.pagination);
            console.log('📊 Total Items from API:', response.pagination?.total);
            console.log('📦 Data Length:', response.data.length);
            
            // Convert YachtBroker API data to YachtProduct format
            const convertedBoats: YachtProduct[] = response.data.map(
              (boat: YachtBrokerBoatResponse) => {
                return {
                  id: boat.ID?.toString() || '',
                  brand_make: boat.Manufacturer || 'Unknown Make',
                  model: boat.Model || 'Unknown Model',
                  built_year: boat.Year || 0,
                  length: boat.LOAFeet ? `${boat.LOAFeet}'` : 'N/A',
                  number_of_engine: 0,
                  class: boat.Type || 'Power',
                  material: boat.HullMaterial || 'Fiberglass',
                  number_of_cabin: boat.CabinCount || 0,
                  number_of_heads: boat.CrewHeadCount || 0,
                  beam_size: boat.BeamFeet
                    ? `${boat.BeamFeet}'${boat.BeamInch ? ` ${boat.BeamInch}"` : ''}`
                    : 'N/A',
                  fuel_type: boat.FuelType?.toLowerCase() || 'Not specified',
                  max_draft: 'N/A',
                  name:
                    boat.VesselName ||
                    `${boat.Manufacturer} ${boat.Model}` ||
                    'Unnamed Vessel',
                  location: `${boat.City || ''}, ${boat.State || ''}`.trim(),
                  condition: boat.Condition || 'Used',
                  price: boat.PriceUSD,
                  images: boat.DisplayPicture?.Large
                    ? [boat.DisplayPicture.Large]
                    : [],
                  image:
                    boat.DisplayPicture?.Large ||
                    boat.DisplayPicture?.HD ||
                    boat.DisplayPicture?.Medium ||
                    '/placeholder-boat.jpg',
                  link: `/search-listing/${boat.ID}`,
                };
              },
            );
            
            setAllBoats(convertedBoats);
            
            // Check if API provides pagination, if not create manual pagination
            if (response.pagination && response.pagination.total > 0) {
              setPagination(response.pagination);
            } else {
              // Manual pagination if API doesn't provide it
              setPagination({
                current_page: page,
                per_page: perPage,
                total: convertedBoats.length,
                last_page: Math.ceil(convertedBoats.length / perPage),
              });
            }
          }
        } catch (error) {
          console.error('Error fetching boats:', error);
        } finally {
          setIsLoadingBoats(false);
        }
      }
    };

    fetchBoats();
  }, [isSearchActive, page]);

  // Use search results if available, otherwise use API boats data
  const dataToDisplay = isSearchActive && searchResults ? searchResults : allBoats;
  
  // For search results, use client-side pagination
  const totalItems = isSearchActive ? dataToDisplay.length : pagination.total;
  const totalPages = isSearchActive 
    ? Math.max(1, Math.ceil(dataToDisplay.length / perPage))
    : pagination.last_page;
  
  // Get items for current page
  const pageItems = isSearchActive
    ? dataToDisplay.slice((page - 1) * perPage, page * perPage)
    : dataToDisplay;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
          {Array.from({ length: perPage }).map((_, idx) => (
            <ProductCardSkeleton key={`skeleton-${idx}`} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
            {pageItems.map((data, idx) => (
              <ProductCard
                isPremium={false}
                key={data.id || `item-${idx}`}
                product={{
                  id: data.id || `item-${idx}`,
                  name: data.name,
                  image:
                    typeof data.image === 'string'
                      ? data.image
                      : data.image.src,
                  location: data.location,
                  brand_make: data.brand_make,
                  model: data.model,
                  built_year: data.built_year,
                  price: data.price,
                }}
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
