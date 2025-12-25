import React from 'react';
import { SearchX } from 'lucide-react';

interface NoDataFoundProps {
  dataTitle: string;
  noDataText?: string;
  className?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  dataTitle,
  noDataText,
  className = '',
}) => {
  const defaultText = `No ${dataTitle} found.`;
  const message = noDataText || defaultText;

  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 mb-5 ${className}`}
    >
      <SearchX className="w-10 h-10 text-gray-500 mb-3" />

      <h3 className="text-xl font-semibold text-gray-700 mb-1">
        Data Unavailable
      </h3>
      <p className="text-gray-500 max-w-sm">{message}</p>
      {noDataText === undefined && (
        <p className="mt-2 text-sm text-gray-400">
          Try adjusting your filters or check back later.
        </p>
      )}
    </div>
  );
};

export default NoDataFound;
