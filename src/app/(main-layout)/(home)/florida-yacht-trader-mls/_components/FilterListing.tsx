'use client';
import { YBFilterParams } from '@/services/boats/yachtbroker';
import { useState } from 'react';

const INITIAL_VALUES = {
  boatType: '',
  make: '',
  model: '',
  buildYearFrom: '',
  buildYearTo: '',
  priceMin: 0,
  priceMax: 20000000,
  lengthFrom: '',
  lengthTo: '',
  beamFrom: '',
  beamTo: '',
  numberOfEngines: '',
  numberOfCabins: '',
  numberOfHeads: '',
};

const boatTypes = [
  'Yacht',
  'Sailboat',
  'Catamaran',
  'Motor Yacht',
  'Trawler',
  'Sportfish',
  'Center Console',
  'Bowrider',
  'Cuddy Cabin',
  'Deck Boat',
  'Pontoon',
  'Houseboat',
  'Fishing Boat',
  'Jet Boat',
  'Ski Boat',
  'Wakeboard Boat',
];

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

  const handleInputChange = (
    field: keyof typeof INITIAL_VALUES,
    value: string | number,
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    const params: YBFilterParams = {};
    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.boatType) params.boatType = filters.boatType;
    if (filters.buildYearFrom) params.yearFrom = Number(filters.buildYearFrom);
    if (filters.buildYearTo) params.yearTo = Number(filters.buildYearTo);
    if (
      filters.priceMin !== INITIAL_VALUES.priceMin ||
      filters.priceMax !== INITIAL_VALUES.priceMax
    ) {
      params.priceMin = filters.priceMin;
      params.priceMax = filters.priceMax;
    }
    if (filters.lengthFrom) params.lengthFrom = Number(filters.lengthFrom);
    if (filters.lengthTo) params.lengthTo = Number(filters.lengthTo);
    if (filters.beamFrom) params.beamFrom = Number(filters.beamFrom);
    if (filters.beamTo) params.beamTo = Number(filters.beamTo);
    if (filters.numberOfEngines)
      params.numberOfEngines = Number(filters.numberOfEngines);
    if (filters.numberOfCabins)
      params.numberOfCabins = Number(filters.numberOfCabins);
    if (filters.numberOfHeads)
      params.numberOfHeads = Number(filters.numberOfHeads);
    onFilter(Object.keys(params).length ? params : undefined);
  };

  const handleReset = () => {
    setFilters(INITIAL_VALUES);
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
            Boat Type
          </label>
          <select
            title="Boat Type"
            value={filters.boatType}
            onChange={(e) => handleInputChange('boatType', e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="">All Types</option>
            {boatTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

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
              placeholder="2005"
              value={filters.buildYearFrom}
              onChange={(e) =>
                handleInputChange('buildYearFrom', e.target.value)
              }
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="2025"
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
            Lengths Range (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0"
              value={filters.lengthFrom}
              onChange={(e) => handleInputChange('lengthFrom', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="500"
              value={filters.lengthTo}
              onChange={(e) => handleInputChange('lengthTo', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Beam Size (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0"
              value={filters.beamFrom}
              onChange={(e) => handleInputChange('beamFrom', e.target.value)}
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="150"
              value={filters.beamTo}
              onChange={(e) => handleInputChange('beamTo', e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Engine
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter number..."
            value={filters.numberOfEngines}
            onChange={(e) =>
              handleInputChange('numberOfEngines', e.target.value)
            }
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Cabin
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter number..."
            value={filters.numberOfCabins}
            onChange={(e) =>
              handleInputChange('numberOfCabins', e.target.value)
            }
            className={inputCls}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Heads
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter number..."
            value={filters.numberOfHeads}
            onChange={(e) => handleInputChange('numberOfHeads', e.target.value)}
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
