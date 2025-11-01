import { demodata } from '@/assets/demo-datas/demodata';
import ProductCard from '@/components/Product/ProductCard';
import React, { useMemo, useState } from 'react';
import Pagination from '@/components/ui/Pagination';

const AllListing = () => {
  const [page, setPage] = useState(1);
  const perPage = 9;

  const totalItems = demodata.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return demodata.slice(start, start + perPage);
  }, [page]);

  return (
    <div>
      <p className="text-gray-400 font-medium text-sm md:text-lg">
        Showing {(page - 1) * perPage + 1} to{' '}
        {Math.min(page * perPage, totalItems)} of {totalItems} results
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3">
        {pageItems.map((data, idx) => (
          <ProductCard isPremium={false} key={idx} product={data} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
};

export default AllListing;
