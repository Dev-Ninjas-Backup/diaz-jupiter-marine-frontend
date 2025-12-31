import { Inbox } from 'lucide-react';
import React from 'react';

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
      className={`flex flex-col items-center justify-center p-16 text-center mb-5 ${className}`}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="relative bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-full">
          <Inbox className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
        No Data Found
      </h3>
      <p className="text-gray-600 max-w-md text-base leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default NoDataFound;
