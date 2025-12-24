'use client';
import { useSearchResults } from '@/context/SearchResultsContext';
import { postAiQuery } from '@/services/query';
import { FilterState } from '@/types/filter-types';
import {
  ApiBoatData,
  convertApiDataToYachtProduct,
} from '@/types/product-types-demo';
import { SearchQueryData } from '@/types/search-query-types';
import { useEffect, useState } from 'react';

const INITIAL_VALUES = {
  boatType: '',
  make: '',
  model: '',
  buildYearFrom: '',
  buildYearTo: '',
  priceMin: 12000,
  priceMax: 2250000,
  lengthFrom: '',
  lengthTo: '',
  beamFrom: '',
  beamTo: '',
  numberOfEngines: '',
  numberOfCabins: '',
  numberOfHeads: '',
  additionalUnit: '',
};

const FilterListing = () => {
  const { queryData, setSearchResults, setIsSearchActive, setQueryData } =
    useSearchResults();
  const [filters, setFilters] = useState<FilterState>(INITIAL_VALUES);

  // Populate filters from queryData
  useEffect(() => {
    if (queryData?.filters) {
      setFilters({
        boatType: queryData.filters.boat_type || '',
        make: queryData.filters.make || '',
        model: queryData.filters.model || '',
        buildYearFrom: queryData.filters.build_year_min?.toString() || '',
        buildYearTo: queryData.filters.build_year_max?.toString() || '',
        priceMin: queryData.filters.price_min || 12000,
        priceMax: queryData.filters.price_max || 2250000,
        lengthFrom: queryData.filters.length_min?.toString() || '',
        lengthTo: queryData.filters.length_max?.toString() || '',
        beamFrom: queryData.filters.beam_min?.toString() || '',
        beamTo: queryData.filters.beam_max?.toString() || '',
        numberOfEngines: queryData.filters.number_of_engine?.toString() || '',
        numberOfCabins: queryData.filters.number_of_cabin?.toString() || '',
        numberOfHeads: queryData.filters.number_of_heads?.toString() || '',
        additionalUnit: queryData.filters.additional_unit || '',
      });
    }
  }, [queryData]);

  // Apply filters to trigger search
  const handleApplyFilters = async () => {
    // Build query data with current filters
    const changedFilters: Partial<SearchQueryData['filters']> = {};

    if (filters.boatType && filters.boatType !== INITIAL_VALUES.boatType) {
      changedFilters.boat_type = filters.boatType;
    }
    if (filters.make && filters.make !== INITIAL_VALUES.make) {
      changedFilters.make = filters.make;
    }
    if (filters.model && filters.model !== INITIAL_VALUES.model) {
      changedFilters.model = filters.model;
    }
    if (
      filters.buildYearFrom &&
      filters.buildYearFrom !== INITIAL_VALUES.buildYearFrom
    ) {
      changedFilters.build_year_min = Number(filters.buildYearFrom);
    }
    if (
      filters.buildYearTo &&
      filters.buildYearTo !== INITIAL_VALUES.buildYearTo
    ) {
      changedFilters.build_year_max = Number(filters.buildYearTo);
    }
    if (filters.priceMin !== INITIAL_VALUES.priceMin) {
      changedFilters.price_min = filters.priceMin;
    }
    if (filters.priceMax !== INITIAL_VALUES.priceMax) {
      changedFilters.price_max = filters.priceMax;
    }
    if (
      filters.lengthFrom &&
      filters.lengthFrom !== INITIAL_VALUES.lengthFrom
    ) {
      changedFilters.length_min = Number(filters.lengthFrom);
    }
    if (filters.lengthTo && filters.lengthTo !== INITIAL_VALUES.lengthTo) {
      changedFilters.length_max = Number(filters.lengthTo);
    }
    if (filters.beamFrom && filters.beamFrom !== INITIAL_VALUES.beamFrom) {
      changedFilters.beam_min = Number(filters.beamFrom);
    }
    if (filters.beamTo && filters.beamTo !== INITIAL_VALUES.beamTo) {
      changedFilters.beam_max = Number(filters.beamTo);
    }
    if (
      filters.numberOfEngines &&
      filters.numberOfEngines !== INITIAL_VALUES.numberOfEngines
    ) {
      changedFilters.number_of_engine = Number(filters.numberOfEngines);
    }
    if (
      filters.numberOfCabins &&
      filters.numberOfCabins !== INITIAL_VALUES.numberOfCabins
    ) {
      changedFilters.number_of_cabin = Number(filters.numberOfCabins);
    }
    if (
      filters.numberOfHeads &&
      filters.numberOfHeads !== INITIAL_VALUES.numberOfHeads
    ) {
      changedFilters.number_of_heads = Number(filters.numberOfHeads);
    }
    if (
      filters.additionalUnit &&
      filters.additionalUnit !== INITIAL_VALUES.additionalUnit
    ) {
      changedFilters.additional_unit = filters.additionalUnit;
    }

    const updatedQueryData: SearchQueryData = {
      query: queryData?.query || null,
      filters: {
        boat_type: changedFilters.boat_type ?? null,
        make: changedFilters.make ?? null,
        model: changedFilters.model ?? null,
        build_year_min: changedFilters.build_year_min ?? null,
        build_year_max: changedFilters.build_year_max ?? null,
        price_min: changedFilters.price_min ?? null,
        price_max: changedFilters.price_max ?? null,
        length_min: changedFilters.length_min ?? null,
        length_max: changedFilters.length_max ?? null,
        beam_min: changedFilters.beam_min ?? null,
        beam_max: changedFilters.beam_max ?? null,
        number_of_engine: changedFilters.number_of_engine ?? null,
        number_of_cabin: changedFilters.number_of_cabin ?? null,
        number_of_heads: changedFilters.number_of_heads ?? null,
        additional_unit: changedFilters.additional_unit ?? null,
      },
    };

    console.log('Filter Query Data:', updatedQueryData);

    const aiResponse = await postAiQuery({ queryData: updatedQueryData });
    if (aiResponse?.success && aiResponse?.data) {
      console.log('AI Response:', aiResponse.data);

      const convertedData: ApiBoatData[] = aiResponse.data;
      const yachtProducts = convertedData.map((boat) =>
        convertApiDataToYachtProduct(boat),
      );

      setSearchResults(yachtProducts);
      setIsSearchActive(true);
      setQueryData(updatedQueryData);
    }
  };

  // Filter options
  const boatTypes = [
    'Yacht',
    'Sailboat',
    'Catamaran',
    'Motor Yacht',
    'Trawler',
    'Sportfish',
  ];
  const makes = [
    'Mercury',
    'Yamaha',
    'Honda',
    'Suzuki',
    'Evinrude',
    'Volvo Penta',
  ];
  const models = ['Volvo', 'Mercruiser', 'Yanmar', 'Cummins', 'Caterpillar'];
  const engineOptions = ['02', '03', '04', '05', '06'];
  const cabinOptions = ['02', '03', '04', '05', '06'];
  const headOptions = ['02', '03', '04', '05', '06'];
  const additionalUnits = [
    'Jet ski',
    'Tender',
    'Kayak',
    'Paddleboard',
    'Dinghy',
  ];

  const handleInputChange = (
    field: keyof FilterState,
    value: string | number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters(INITIAL_VALUES);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 h-full  top-4">
      {/* Header */}
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
        {/* Boat Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Boat Type
          </label>
          <select
            value={filters.boatType}
            onChange={(e) => handleInputChange('boatType', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Yacht</option>
            {boatTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Make
          </label>
          <select
            value={filters.make}
            onChange={(e) => handleInputChange('make', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Mercury</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Model
          </label>
          <select
            value={filters.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Volvo</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Build Year */}
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
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="2008"
              value={filters.buildYearTo}
              onChange={(e) => handleInputChange('buildYearTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price Range
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="5000000"
              step="1000"
              value={filters.priceMin}
              onChange={(e) =>
                handleInputChange('priceMin', Number(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-cyan-500 font-semibold">
                {formatPrice(filters.priceMin)}
              </span>
              <span className="text-cyan-500 font-semibold">
                {formatPrice(filters.priceMax)}
              </span>
            </div>
          </div>
        </div>

        {/* Lengths Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lengths Range (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="20"
              value={filters.lengthFrom}
              onChange={(e) => handleInputChange('lengthFrom', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="40"
              value={filters.lengthTo}
              onChange={(e) => handleInputChange('lengthTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Beam Size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Beam Size (ft)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="20"
              value={filters.beamFrom}
              onChange={(e) => handleInputChange('beamFrom', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="40"
              value={filters.beamTo}
              onChange={(e) => handleInputChange('beamTo', e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Number of Engines */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Engine
          </label>
          <select
            value={filters.numberOfEngines}
            onChange={(e) =>
              handleInputChange('numberOfEngines', e.target.value)
            }
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">02</option>
            {engineOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Cabins */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Cabin
          </label>
          <select
            value={filters.numberOfCabins}
            onChange={(e) =>
              handleInputChange('numberOfCabins', e.target.value)
            }
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">02</option>
            {cabinOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Heads */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Heads
          </label>
          <select
            value={filters.numberOfHeads}
            onChange={(e) => handleInputChange('numberOfHeads', e.target.value)}
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">02</option>
            {headOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Unit */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Unit
          </label>
          <select
            value={filters.additionalUnit}
            onChange={(e) =>
              handleInputChange('additionalUnit', e.target.value)
            }
            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Jet ski</option>
            {additionalUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Filters Button */}
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
