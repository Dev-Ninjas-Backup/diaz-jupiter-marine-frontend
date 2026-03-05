'use client';
import {
  getYBFilters,
  YBFilterOptions,
  YBFilterParams,
} from '@/services/boats/yachtbroker';
import { useEffect, useState } from 'react';

const INITIAL_VALUES = {
  search: '',
  type: '',
  category: '',
  brand: '',
  condition: '',
  yearFrom: '',
  yearTo: '',
  priceMin: 0,
  // priceMax: 2000000,
  priceMax: 20000000,
  loaFrom: '',
  loaTo: '',
  cabinsFrom: '',
  cabinsTo: '',
  city: '',
  state: '',
  sort: 'loa_feet,1',
};

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: 'right 0.5rem center',
  backgroundSize: '1.5em 1.5em',
  paddingRight: '2.5rem',
};

const inputCls =
  'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400';
const selectCls = `${inputCls} appearance-none cursor-pointer`;

const FilterListing = ({
  onFilter,
}: {
  onFilter: (filters: YBFilterParams | undefined) => void;
}) => {
  const [filters, setFilters] = useState(INITIAL_VALUES);
  const [options, setOptions] = useState<YBFilterOptions>({});

  useEffect(() => {
    getYBFilters().then(setOptions);
  }, []);

  const handleInputChange = (
    field: keyof typeof INITIAL_VALUES,
    value: string | number,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    const params: YBFilterParams = {};
    if (filters.search) params.search = filters.search;
    if (filters.type) params.type = filters.type;
    if (filters.category) params.category = filters.category;
    if (filters.brand) params.brand = filters.brand;
    if (filters.condition) params.condition = filters.condition;
    if (filters.yearFrom || filters.yearTo) {
      params.year = `${filters.yearFrom || ''},${filters.yearTo || ''}`;
    }
    if (
      filters.priceMin !== INITIAL_VALUES.priceMin ||
      filters.priceMax !== INITIAL_VALUES.priceMax
    ) {
      // params.price = `${filters.priceMin * 10},${filters.priceMax * 10}`;
      params.price = `${filters.priceMin},${filters.priceMax}`;
      params.currency = 'usd';
    }
    if (filters.loaFrom || filters.loaTo) {
      params.loa = `${filters.loaFrom || ''},${filters.loaTo || ''}`;
      params.loatype = 'ft';
    }
    if (filters.cabinsFrom || filters.cabinsTo) {
      params.cabins = `${filters.cabinsFrom || ''},${filters.cabinsTo || ''}`;
    }
    if (filters.city) params.city = filters.city;
    if (filters.state) params.state = filters.state;
    if (filters.sort) params.sort = filters.sort;
    onFilter(Object.keys(params).length ? params : undefined);
  };

  const handleReset = () => {
    setFilters(INITIAL_VALUES);
    onFilter(undefined);
  };

  const getCategoryOptions = () => {
    if (!options.Categories) return [];
    const type = filters.type || 'Power';
    const categories = options.Categories[type as 'Power' | 'Sail'];
    return categories ? Object.values(categories) : [];
  };

  const getBrandOptions = () => {
    return (options.Brands || []).filter((b): b is string => b !== null);
  };

  const getCityOptions = () => {
    return (options.City || []).filter((c): c is string => c !== null);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

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
        <div>
          <label
            htmlFor="search-input"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Search
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search by model, make..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label
            htmlFor="type-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Type
          </label>
          <select
            id="type-select"
            title="Type"
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="">All Types</option>
            {options.Types?.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="category-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category-select"
            title="Category"
            value={filters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="">All Categories</option>
            {getCategoryOptions().map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="brand-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Brand
          </label>
          <select
            id="brand-select"
            title="Brand"
            value={filters.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="">All Brands</option>
            {getBrandOptions().map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="condition-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Condition
          </label>
          <select
            id="condition-select"
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Build Year
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="2000"
              value={filters.yearFrom}
              onChange={(e) => handleInputChange('yearFrom', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="2026"
              value={filters.yearTo}
              onChange={(e) => handleInputChange('yearTo', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Range
          </label>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Min Price: {formatPrice(filters.priceMin)}
              </label>
              <input
                type="range"
                min="0"
                // max="2000000"
                max="20000000"
                step="1000"
                value={filters.priceMin}
                onChange={(e) =>
                  handleInputChange('priceMin', Number(e.target.value))
                }
                aria-label="Minimum Price"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Max Price: {formatPrice(filters.priceMax)}
              </label>
              <input
                type="range"
                min="0"
                // max="2000000"
                max="20000000"
                step="1000"
                value={filters.priceMax}
                onChange={(e) =>
                  handleInputChange('priceMax', Number(e.target.value))
                }
                aria-label="Maximum Price"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Length Range (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0"
              value={filters.loaFrom}
              onChange={(e) => handleInputChange('loaFrom', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="500"
              value={filters.loaTo}
              onChange={(e) => handleInputChange('loaTo', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cabins Range
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0"
              value={filters.cabinsFrom}
              onChange={(e) => handleInputChange('cabinsFrom', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="10"
              value={filters.cabinsTo}
              onChange={(e) => handleInputChange('cabinsTo', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="city-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            City
          </label>
          <select
            id="city-select"
            title="City"
            value={filters.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="">All Cities</option>
            {getCityOptions().map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="state-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            State
          </label>
          <select
            id="state-select"
            title="State"
            value={filters.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="">All States</option>
            {options.State?.map((state) => (
              <option key={state.key} value={state.value}>
                {state.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Sort By
          </label>
          <select
            id="sort-select"
            title="Sort By"
            value={filters.sort}
            onChange={(e) => handleInputChange('sort', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="loa_feet,1">Length (High to Low)</option>
            <option value="loa_feet,0">Length (Low to High)</option>
            <option value="price_usd,1">Price (High to Low)</option>
            <option value="price_usd,0">Price (Low to High)</option>
          </select>
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
