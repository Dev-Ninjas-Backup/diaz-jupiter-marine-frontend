'use client';
import { BackendBoatsComFilterParams } from '@/services/boats/boatsCom';
import { useState } from 'react';

const INITIAL_VALUES = {
  search: '',
  boatType: '',
  make: '',
  model: '',
  year: '',
  maxPrice: '',
  lengthMin: '',
  lengthMax: '',
  condition: '',
  state: '',
  city: '',
};

const inputCls =
  'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400';
const selectCls = `${inputCls} appearance-none cursor-pointer`;
const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: 'right 0.5rem center',
  backgroundSize: '1.5em 1.5em',
  paddingRight: '2.5rem',
};

const FilterListing = ({
  onFilter,
  initialValues,
}: {
  onFilter: (filters: BackendBoatsComFilterParams | undefined) => void;
  initialValues?: BackendBoatsComFilterParams;
}) => {
  const [filters, setFilters] = useState({
    search: initialValues?.search || '',
    boatType: initialValues?.boatType || '',
    make: initialValues?.make || '',
    model: initialValues?.model || '',
    year: initialValues?.year || '',
    maxPrice: initialValues?.maxPrice ? String(initialValues.maxPrice) : '',
    lengthMin: initialValues?.lengthMin ? String(initialValues.lengthMin) : '',
    lengthMax: initialValues?.lengthMax ? String(initialValues.lengthMax) : '',
    condition: initialValues?.condition || '',
    state: initialValues?.state || '',
    city: initialValues?.city || '',
  });

  const handleInputChange = (
    field: keyof typeof INITIAL_VALUES,
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    const params: BackendBoatsComFilterParams = {};
    if (filters.search) params.search = filters.search;
    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.boatType) params.boatType = filters.boatType;
    if (filters.year) params.year = filters.year;
    if (filters.maxPrice) params.maxPrice = Number(filters.maxPrice);
    if (filters.lengthMin) params.lengthMin = Number(filters.lengthMin);
    if (filters.lengthMax) params.lengthMax = Number(filters.lengthMax);
    if (filters.condition) params.condition = filters.condition;
    if (filters.state) params.state = filters.state;
    if (filters.city) params.city = filters.city;
    onFilter(Object.keys(params).length ? params : undefined);
  };

  const handleReset = () => {
    setFilters(INITIAL_VALUES);
    onFilter(undefined);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 h-full top-4">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Filter Listing
        </h2>
        <button
          onClick={handleReset}
          className="text-cyan-500 hover:text-cyan-600 font-medium text-sm transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-5">
        {/* Keyword Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Keyword Search
          </label>
          <input
            type="text"
            placeholder="e.g. Sea Ray, blue hull, 2005..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Make
          </label>
          <input
            type="text"
            placeholder="Enter make..."
            value={filters.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Model
          </label>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Boat Type
          </label>
          <input
            type="text"
            placeholder="e.g. Motorboat, Sailboat..."
            value={filters.boatType}
            onChange={(e) => handleInputChange('boatType', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Build Year
          </label>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Max Price ($)
          </label>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Length Range (ft)
          </label>
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

        {/* Condition */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Condition
          </label>
          <select
            title="Condition"
            value={filters.condition}
            onChange={(e) => handleInputChange('condition', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State
          </label>
          <input
            type="text"
            placeholder="e.g. FL, CA, NY..."
            value={filters.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            placeholder="e.g. Miami, Jupiter..."
            value={filters.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
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
