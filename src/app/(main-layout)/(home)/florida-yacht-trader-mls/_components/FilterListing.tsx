'use client';
import {
  getYBProFilters,
  YBFilterParams,
  YBProFilters,
} from '@/services/boats/yachtbroker';
import { useEffect, useState } from 'react';

const INITIAL_VALUES = {
  keyword: '',
  make: '',
  model: '',
  type: '',
  category: '',
  status: '',
  buildYearFrom: '',
  buildYearTo: '',
  priceMin: 0,
  priceMax: 20000000,
  lengthFrom: '',
  lengthTo: '',
  city: '',
  state: '',
  country: '',
};

const inputCls =
  'w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400';

const FilterListing = ({
  onFilter,
}: {
  onFilter: (filters: YBFilterParams | undefined) => void;
}) => {
  const [filters, setFilters] = useState(INITIAL_VALUES);
  const [proFilters, setProFilters] = useState<YBProFilters | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getYBProFilters().then((data) => {
      if (data) {
        setProFilters(data);
        if (data.PriceMaximumUSD) {
          setFilters((prev) => ({
            ...prev,
            priceMax: data.PriceMaximumUSD,
          }));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (proFilters && filters.type) {
      const cats =
        filters.type === 'Power'
          ? Object.keys(proFilters.Categories.Power)
          : filters.type === 'Sail'
            ? Object.keys(proFilters.Categories.Sail)
            : [];
      setCategories(cats);
      setFilters((prev) => ({ ...prev, category: '' }));
    } else {
      setCategories([]);
    }
  }, [filters.type, proFilters]);

  const handleInputChange = (
    field: keyof typeof INITIAL_VALUES,
    value: string | number,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    const params: YBFilterParams = {};
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.type) params.type = filters.type;
    if (filters.category) params.category = filters.category;
    if (filters.status) params.status = filters.status;
    if (filters.buildYearFrom) params.yearFrom = Number(filters.buildYearFrom);
    if (filters.buildYearTo) params.yearTo = Number(filters.buildYearTo);
    if (
      filters.priceMin !== INITIAL_VALUES.priceMin ||
      filters.priceMax !== (proFilters?.PriceMaximumUSD || 20000000)
    ) {
      params.priceMin = filters.priceMin;
      params.priceMax = filters.priceMax;
    }
    if (filters.lengthFrom) params.lengthFrom = Number(filters.lengthFrom);
    if (filters.lengthTo) params.lengthTo = Number(filters.lengthTo);
    if (filters.city) params.city = filters.city;
    if (filters.state) params.state = filters.state;
    if (filters.country) params.country = filters.country;
    onFilter(Object.keys(params).length ? params : undefined);
  };

  const handleReset = () => {
    setFilters({
      ...INITIAL_VALUES,
      priceMax: proFilters?.PriceMaximumUSD || 20000000,
    });
    onFilter(undefined);
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Keyword Search
          </label>
          <input
            type="text"
            placeholder="e.g. Azimut, superyacht..."
            value={filters.keyword}
            onChange={(e) => handleInputChange('keyword', e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="type-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Type
          </label>
          <select
            id="type-select"
            value={filters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className={inputCls}
            aria-label="Boat Type"
          >
            <option value="">All Types</option>
            <option value="Power">Power</option>
            <option value="Sail">Sail</option>
          </select>
        </div>

        {filters.type && categories.length > 0 && (
          <div>
            <label htmlFor="category-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category-select"
              value={filters.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={inputCls}
              aria-label="Boat Category"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="status-select" className="block text-sm font-semibold text-gray-700 mb-2">
            Status
          </label>
          <select
            id="status-select"
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className={inputCls}
            aria-label="Vessel Status"
          >
            <option value="">All Status</option>
            {proFilters?.VesselStatus?.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Manufacturer
          </label>
          <input
            type="text"
            placeholder="Enter manufacturer..."
            value={filters.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            className={inputCls}
            list="manufacturers"
          />
          {proFilters?.Manufacturers && (
            <datalist id="manufacturers">
              {proFilters.Manufacturers.slice(0, 100).map((mfr) => (
                <option key={mfr} value={mfr} />
              ))}
            </datalist>
          )}
        </div>

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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Build Year
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder={proFilters?.MinimumYear?.toString() || '2005'}
              value={filters.buildYearFrom}
              onChange={(e) =>
                handleInputChange('buildYearFrom', e.target.value)
              }
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder={proFilters?.MaximumYear?.toString() || '2025'}
              value={filters.buildYearTo}
              onChange={(e) => handleInputChange('buildYearTo', e.target.value)}
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
                max={proFilters?.PriceMaximumUSD || 20000000}
                step="10000"
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
                max={proFilters?.PriceMaximumUSD || 20000000}
                step="10000"
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
              placeholder={proFilters?.DisplayLengthMinFeet?.toString() || '0'}
              value={filters.lengthFrom}
              onChange={(e) => handleInputChange('lengthFrom', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder={proFilters?.DisplayLengthMaxFeet?.toString() || '500'}
              value={filters.lengthTo}
              onChange={(e) => handleInputChange('lengthTo', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="City"
              value={filters.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={inputCls}
            />
            <input
              type="text"
              placeholder="State"
              value={filters.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={inputCls}
            />
            <input
              type="text"
              placeholder="Country"
              value={filters.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={inputCls}
            />
          </div>
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
