'use client';
import { SearchBoatsFilterParams } from '@/services/boats/searchBoats';
import { useState } from 'react';

const INITIAL_VALUES = {
  make: '',
  model: '',
  year: '',
  boatType: '',
  maxPrice: '',
  lengthMin: '',
  lengthMax: '',
  location: '',
};

const inputCls =
  'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400';

const FilterListing = ({
  onFilter,
}: {
  onFilter: (filters: SearchBoatsFilterParams | undefined) => void;
}) => {
  const [filters, setFilters] = useState(INITIAL_VALUES);

  const handleInputChange = (field: keyof typeof INITIAL_VALUES, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    const params: SearchBoatsFilterParams = {};
    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.year) params.year = Number(filters.year);
    if (filters.boatType) params.boatType = filters.boatType;
    if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice);
    if (filters.lengthMin) params.lengthMin = Number(filters.lengthMin);
    if (filters.lengthMax) params.lengthMax = Number(filters.lengthMax);
    if (filters.location) params.location = filters.location;
    onFilter(Object.keys(params).length ? params : undefined);
  };

  const handleReset = () => {
    setFilters(INITIAL_VALUES);
    onFilter(undefined);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 h-full top-4">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Filter Listing</h2>
        <button
          onClick={handleReset}
          className="text-cyan-500 hover:text-cyan-600 font-medium text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-5">
        {/* Make */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Make</label>
          <input
            type="text"
            placeholder="e.g. Viking, Hatteras..."
            value={filters.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
          <input
            type="text"
            placeholder="Enter model..."
            value={filters.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Boat Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Boat Type</label>
          <input
            type="text"
            placeholder="e.g. Motorboat, Sailboat, Yacht..."
            value={filters.boatType}
            onChange={(e) => handleInputChange('boatType', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Build Year</label>
          <input
            type="number"
            placeholder="e.g. 2020"
            value={filters.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price ($)</label>
          <input
            type="number"
            placeholder="e.g. 500000"
            value={filters.maxPrice}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Length Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Length Range (ft)</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.lengthMin}
              onChange={(e) => handleInputChange('lengthMin', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.lengthMax}
              onChange={(e) => handleInputChange('lengthMax', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="City or State (e.g. Jupiter, FL)"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={inputCls}
          />
        </div>

        <div className="pt-4">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterListing;
