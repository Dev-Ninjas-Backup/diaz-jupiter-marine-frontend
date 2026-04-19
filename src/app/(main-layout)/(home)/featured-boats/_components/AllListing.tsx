'use client';
import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton';
import Pagination from '@/components/ui/Pagination';
import {
  getBackendBoatsCom,
  mapBackendBoatToProduct,
  BackendBoatsComFilterParams,
} from '@/services/boats/boatsCom';
import { useEffect, useState } from 'react';

const AllListing = ({ filters }: { filters?: BackendBoatsComFilterParams }) => {
  const [page, setPage] = useState(1);
  const [allBoats, setAllBoats] = useState<
    ReturnType<typeof mapBackendBoatToProduct>[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingBoats, setIsLoadingBoats] = useState(false);
  const [perPage, setPerPage] = useState(15);

  useEffect(() => {
    setPage(1);
  }, [filters, perPage]);

  useEffect(() => {
    const fetchBoats = async () => {
      setIsLoadingBoats(true);
      try {
        const response = await getBackendBoatsCom({
          page,
          limit: perPage,
          filters,
        });
        setAllBoats(response.data.map(mapBackendBoatToProduct));
        setTotalItems(response.total);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching boats:', error);
      } finally {
        setIsLoadingBoats(false);
      }
    };
    fetchBoats();
  }, [page, filters, perPage]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className="text-gray-400 font-medium text-sm md:text-lg">
          Showing {totalItems === 0 ? 0 : (page - 1) * perPage + 1} to{' '}
          {Math.min(page * perPage, totalItems)} of {totalItems} results
        </p>
        <div className="flex items-center gap-2">
          <label
            htmlFor="perPage"
            className="text-sm text-gray-600 font-medium"
          >
            Show:
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium cursor-pointer"
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
          </select>
        </div>
      </div>

      {isLoadingBoats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
          {Array.from({ length: perPage }).map((_, idx) => (
            <ProductCardSkeleton key={`skeleton-${idx}`} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
            {allBoats.map((data, idx) => (
              <ProductCard
                isPremium={false}
                basePath="/featured-boats"
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
