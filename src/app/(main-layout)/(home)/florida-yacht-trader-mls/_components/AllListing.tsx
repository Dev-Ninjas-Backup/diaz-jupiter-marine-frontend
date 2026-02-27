'use client';
import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton';
import Pagination from '@/components/ui/Pagination';
import { getYBListings, YBBoat, YBFilterParams } from '@/services/boats/yachtbroker';
import { useEffect, useState } from 'react';

const mapYBBoat = (boat: YBBoat) => ({
  id: String(boat.ID),
  brand_make: boat.Manufacturer || 'Unknown Make',
  model: boat.Model || 'Unknown Model',
  built_year: boat.Year || 0,
  name: boat.VesselName || `${boat.Manufacturer || ''} ${boat.Model || ''}`.trim() || 'Unnamed Vessel',
  location: [boat.City, boat.State].filter(Boolean).join(', '),
  price: boat.PriceHidden ? undefined : boat.PriceUSD,
  image: boat.DisplayPicture?.Large || boat.DisplayPicture?.HD || '/placeholder-boat.jpg',
});

const AllListing = ({ filters }: { filters?: YBFilterParams }) => {
  const [page, setPage] = useState(1);
  const [boats, setBoats] = useState<YBBoat[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const perPage = 15;

  useEffect(() => { setPage(1); }, [filters]);

  useEffect(() => {
    const fetchBoats = async () => {
      setIsLoading(true);
      try {
        const response = await getYBListings(page, filters);
        setBoats(response.data);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching boats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoats();
  }, [page, filters]);

  const pageItems = boats.map(mapYBBoat);

  return (
    <div>
      <p className="text-gray-400 font-medium text-sm md:text-lg">
        Showing {Math.min((page - 1) * perPage + 1, total)} to{' '}
        {Math.min(page * perPage, total)} of {total} results
      </p>
      {isLoading ? (
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
                  image: data.image,
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
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
          </div>
        </>
      )}
    </div>
  );
};

export default AllListing;
