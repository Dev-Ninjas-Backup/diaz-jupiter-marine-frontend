'use client';
import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton';
import Pagination from '@/components/ui/Pagination';
import { useSearchResults } from '@/context/SearchResultsContext';
import { getAllBoats } from '@/services/boats';
import { BoatsComBoat } from '@/services/boats/featuredBoats';
import { YachtProduct } from '@/types/product-types-demo';
import { useEffect, useState } from 'react';

const AllListing = () => {
  const { searchResults, isSearchActive } = useSearchResults();
  const [page, setPage] = useState(1);
  const [allBoats, setAllBoats] = useState<YachtProduct[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoadingBoats, setIsLoadingBoats] = useState(false);
  const perPage = 9;

  useEffect(() => {
    if (isSearchActive) return;
    const fetchBoats = async () => {
      setIsLoadingBoats(true);
      try {
        const response = await getAllBoats({ page, limit: perPage });
        if (response?.success && response?.data) {
          const convertedBoats: YachtProduct[] = response.data.map(
            (boat: BoatsComBoat) => ({
              id: boat.DocumentID || '',
              brand_make: boat.MakeString || 'Unknown Make',
              model: boat.Model || 'Unknown Model',
              built_year: boat.ModelYear || 0,
              length: boat.NominalLength ? `${boat.NominalLength}'` : 'N/A',
              number_of_engine: 0,
              class: boat.SaleClassCode || 'Power',
              material: boat.BoatHullMaterialCode || 'Fiberglass',
              number_of_cabin: 0,
              number_of_heads: 0,
              beam_size: boat.BeamMeasure || 'N/A',
              fuel_type: 'Not specified',
              max_draft: 'N/A',
              name:
                boat.ListingTitle ||
                `${boat.MakeString || ''} ${boat.Model || ''}`.trim() ||
                'Unnamed Vessel',
              location: [
                boat.BoatLocation?.BoatCityName,
                boat.BoatLocation?.BoatStateCode,
              ]
                .filter(Boolean)
                .join(', '),
              condition: boat.SaleClassCode || 'Used',
              price: boat.Price ? parseFloat(boat.Price.replace(/[^0-9.]/g, '')) : undefined,
              images: boat.Images?.map((img) => img.Uri || '').filter(Boolean) || [],
              image: boat.Images?.[0]?.Uri || '/placeholder-boat.jpg',
              link: `/search-listing/${boat.DocumentID}`,
            }),
          );
          setAllBoats(convertedBoats);
          setTotalItems(response.total);
        }
      } catch (error) {
        console.error('Error fetching boats:', error);
      } finally {
        setIsLoadingBoats(false);
      }
    };
    fetchBoats();
  }, [isSearchActive, page]);

  const dataToDisplay = isSearchActive && searchResults ? searchResults : allBoats;
  const displayTotal = isSearchActive ? dataToDisplay.length : totalItems;
  const totalPages = isSearchActive
    ? Math.max(1, Math.ceil(dataToDisplay.length / perPage))
    : Math.max(1, Math.ceil(totalItems / perPage));
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
        {Math.min(page * perPage, displayTotal)} of {displayTotal} results
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
                basePath="/featured-boats"
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
