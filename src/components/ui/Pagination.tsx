import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const createPageRange = () => {
    const delta = 1; // pages around current
    const range: (number | string)[] = [];
    let l: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        if (l !== null && i - (l as number) > 1) {
          range.push('...');
        }
        range.push(i);
        l = i;
      }
    }

    return range;
  };

  const range = createPageRange();

  return (
    <nav className="flex items-center justify-center">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={`px-3 py-2 ml-0 flex items-center gap-2 leading-tight border rounded-l-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-900 border-gray-200' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}
          >
            <IoIosArrowBack />
            <span className="text-sm">Previous</span>
          </button>
        </li>

        {range.map((p, idx) => (
          <li key={idx}>
            {p === '...' ? (
              <span className="px-3 py-2 border bg-white text-gray-500">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(Number(p))}
                className={`px-3 py-2 border text-sm ${Number(p) === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} `}
              >
                {p}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={`px-3 py-2 flex items-center gap-2  leading-tight border rounded-r-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-900 border-gray-200' : 'bg-secondary text-white hover:bg-gray-100 border-gray-300'}`}
          >
            <span className="text-sm">Next</span>
            <IoIosArrowForward />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
