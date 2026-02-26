'use client';
import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton';
import Pagination from '@/components/ui/Pagination';
import { useSearchResults } from '@/context/SearchResultsContext';
import { getYBListings, YBBoat } from '@/services/boats/yachtbroker';
import { YachtProduct } from '@/types/product-types-demo';
import { useEffect, useState } from 'react';

const mapYBBoat = (boat: YBBoat): YachtProduct => ({
  id: String(boat.ID),
  brand_make: boat.Manufacturer || 'Unknown Make',
  model: boat.Model || 'Unknown Model',
  built_year: boat.Year || 0,
  length: boat.DisplayLengthFeet ? `${boat.DisplayLengthFeet}'` : 'N/A',
  number_of_engine: boat.EngineQty || 0,
  class: boat.Category || 'Power',
  material: boat.HullMaterial || 'Fiberglass',
  number_of_cabin: boat.CabinCount || 0,
  number_of_heads: boat.HeadCount || 0,
  beam_size: boat.BeamFeet ? `${boat.BeamFeet}'${boat.BeamInch ? ` ${boat.BeamInch}"` : ''}` : 'N/A',
  fuel_type: boat.FuelType?.toLowerCase() || 'Not specified',
  max_draft: boat.MaximumDraftFeet ? `${boat.MaximumDraftFeet}'` : 'N/A',
  name: boat.VesselName || `${boat.Manufacturer || ''} ${boat.Model || ''}`.trim() || 'Unnamed Vessel',
  location: [boat.City, boat.State].filter(Boolean).join(', '),
  condition: boat.Condition || 'Used',
  price: boat.PriceHidden ? undefined : boat.PriceUSD,
  images: boat.gallery?.map((g) => g.Large || g.HD || '').filter(Boolean) || [],
  image: boat.DisplayPicture?.Large || boat.DisplayPicture?.HD || '/placeholder-boat.jpg',
  link: `/florida-yacht-trader-mls/${boat.ID}`,
});

const AllListing = () => {
  const { searchResults, isSearchActive } = useSearchResults();
  const [page, setPage] = useState(1);
  const [allBoats, setAllBoats] = useState<YachtProduct[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingBoats, setIsLoadingBoats] = useState(false);
  const perPage = 15;

  useEffect(() => {
    if (isSearchActive) return;
    const fetchBoats = async () => {
      setIsLoadingBoats(true);
      try {
        const response = await getYBListings(page);
        setAllBoats(response.data.map(mapYBBoat));
        setTotalItems(response.total);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching boats:', error);
      } finally {
        setIsLoadingBoats(false);
      }
    };
    fetchBoats();
  }, [isSearchActive, page]);

  useEffect(() => { setPage(1); }, [searchResults]);

  const dataToDisplay = isSearchActive && searchResults ? searchResults : allBoats;
  const displayTotal = isSearchActive ? dataToDisplay.length : totalItems;
  const displayPages = isSearchActive ? Math.max(1, Math.ceil(dataToDisplay.length / perPage)) : totalPages;
  const pageItems = isSearchActive ? dataToDisplay.slice((page - 1) * perPage, page * perPage) : dataToDisplay;

  return (
    <div>
      <p className="text-gray-400 font-medium text-sm md:text-lg">
        {isSearchActive && searchResults ? 'Search Results: ' : ''}
        Showing {Math.min((page - 1) * perPage + 1, displayTotal)} to{' '}
        {Math.min(page * perPage, displayTotal)} of {displayTotal} results
      </p>
      {isLoadingBoats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
          {Array.from({ length: perPage }).map((_, idx) => <ProductCardSkeleton key={idx} />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
            {pageItems.map((data, idx) => (
              <ProductCard
                isPremium={false}
                basePath="/florida-yacht-trader-mls"
                key={data.id || `item-${idx}`}
                product={{
                  id: data.id || `item-${idx}`,
                  name: data.name,
                  image: typeof data.image === 'string' ? data.image : data.image.src,
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
            <Pagination currentPage={page} totalPages={displayPages} onPageChange={(p) => setPage(p)} />
          </div>
        </>
      )}
    </div>
  );
};

export default AllListing;
