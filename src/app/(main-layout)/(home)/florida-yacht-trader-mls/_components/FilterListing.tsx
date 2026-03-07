'use client';
import {
  getYBFilters,
  YBFilterOptions,
  YBFilterParams,
} from '@/services/boats/yachtbroker';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getYBFilters().then(setOptions);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
        setSearchTerms({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // const formatPrice = (price: number) =>
  //   new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(price);

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

        <div ref={dropdownRef}>
          <label
            htmlFor="type-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Type
          </label>
          <div className="relative">
            <input
              type="text"
              value={
                openDropdown === 'type'
                  ? searchTerms.type || ''
                  : filters.type || 'All Types'
              }
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, type: e.target.value });
                if (openDropdown !== 'type') setOpenDropdown('type');
              }}
              onFocus={() => {
                setOpenDropdown('type');
                setSearchTerms({ ...searchTerms, type: '' });
              }}
              className={inputCls}
              placeholder="Search type..."
            />
            <button
              onClick={() => {
                if (openDropdown === 'type') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, type: '' });
                } else {
                  setOpenDropdown('type');
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              title="Toggle type dropdown"
            >
              <IoIosArrowDown
                className={`text-gray-500 transition-transform ${
                  openDropdown === 'type' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'type' && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    handleInputChange('type', '');
                    setOpenDropdown(null);
                    setSearchTerms({ ...searchTerms, type: '' });
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                    !filters.type
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  All Types
                </button>
                {options.Types?.filter((type) =>
                  type
                    .toLowerCase()
                    .includes((searchTerms.type || '').toLowerCase()),
                ).map((type, index) => (
                  <button
                    key={`${type}-${index}`}
                    onClick={() => {
                      handleInputChange('type', type);
                      setOpenDropdown(null);
                      setSearchTerms({ ...searchTerms, type: '' });
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                      filters.type === type
                        ? 'bg-cyan-100 text-cyan-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                )) || (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="category-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Class
          </label>
          <div className="relative">
            <input
              type="text"
              value={
                openDropdown === 'category'
                  ? searchTerms.category || ''
                  : filters.category || 'All Classes'
              }
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, category: e.target.value });
                if (openDropdown !== 'category') setOpenDropdown('category');
              }}
              onFocus={() => {
                setOpenDropdown('category');
                setSearchTerms({ ...searchTerms, category: '' });
              }}
              className={inputCls}
              placeholder="Search class..."
            />
            <button
              onClick={() => {
                if (openDropdown === 'category') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, category: '' });
                } else {
                  setOpenDropdown('category');
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              title="Toggle category dropdown"
            >
              <IoIosArrowDown
                className={`text-gray-500 transition-transform ${
                  openDropdown === 'category' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'category' && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    handleInputChange('category', '');
                    setOpenDropdown(null);
                    setSearchTerms({ ...searchTerms, category: '' });
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                    !filters.category
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  All Categories
                </button>
                {getCategoryOptions()
                  .filter((cat) =>
                    cat
                      .toLowerCase()
                      .includes((searchTerms.category || '').toLowerCase()),
                  )
                  .map((cat, index) => (
                    <button
                      key={`${cat}-${index}`}
                      onClick={() => {
                        handleInputChange('category', cat);
                        setOpenDropdown(null);
                        setSearchTerms({ ...searchTerms, category: '' });
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                        filters.category === cat
                          ? 'bg-cyan-100 text-cyan-700 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                {getCategoryOptions().filter((cat) =>
                  cat
                    .toLowerCase()
                    .includes((searchTerms.category || '').toLowerCase()),
                ).length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="brand-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Brand
          </label>
          <div className="relative">
            <input
              type="text"
              value={
                openDropdown === 'brand'
                  ? searchTerms.brand || ''
                  : filters.brand || 'All Brands'
              }
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, brand: e.target.value });
                if (openDropdown !== 'brand') setOpenDropdown('brand');
              }}
              onFocus={() => {
                setOpenDropdown('brand');
                setSearchTerms({ ...searchTerms, brand: '' });
              }}
              className={inputCls}
              placeholder="Search brand..."
            />
            <button
              onClick={() => {
                if (openDropdown === 'brand') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, brand: '' });
                } else {
                  setOpenDropdown('brand');
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              title="Toggle brand dropdown"
            >
              <IoIosArrowDown
                className={`text-gray-500 transition-transform ${
                  openDropdown === 'brand' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'brand' && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    handleInputChange('brand', '');
                    setOpenDropdown(null);
                    setSearchTerms({ ...searchTerms, brand: '' });
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                    !filters.brand
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  All Brands
                </button>
                {getBrandOptions()
                  .filter((brand) =>
                    brand
                      .toLowerCase()
                      .includes((searchTerms.brand || '').toLowerCase()),
                  )
                  .map((brand, index) => (
                    <button
                      key={`${brand}-${index}`}
                      onClick={() => {
                        handleInputChange('brand', brand);
                        setOpenDropdown(null);
                        setSearchTerms({ ...searchTerms, brand: '' });
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                        filters.brand === brand
                          ? 'bg-cyan-100 text-cyan-700 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                {getBrandOptions().filter((brand) =>
                  brand
                    .toLowerCase()
                    .includes((searchTerms.brand || '').toLowerCase()),
                ).length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
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
            Price Range ($)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin || ''}
              onChange={(e) =>
                handleInputChange('priceMin', Number(e.target.value) || 0)
              }
              className={inputCls}
            />
            <span className="text-gray-500 text-sm font-medium">to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax === 20000000 ? '' : filters.priceMax}
              onChange={(e) =>
                handleInputChange(
                  'priceMax',
                  Number(e.target.value) || 20000000,
                )
              }
              className={inputCls}
            />
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
          <div className="relative">
            <input
              type="text"
              value={
                openDropdown === 'city'
                  ? searchTerms.city || ''
                  : filters.city || 'All Cities'
              }
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, city: e.target.value });
                if (openDropdown !== 'city') setOpenDropdown('city');
              }}
              onFocus={() => {
                setOpenDropdown('city');
                setSearchTerms({ ...searchTerms, city: '' });
              }}
              className={inputCls}
              placeholder="Search city..."
            />
            <button
              onClick={() => {
                if (openDropdown === 'city') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, city: '' });
                } else {
                  setOpenDropdown('city');
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              title="Toggle city dropdown"
            >
              <IoIosArrowDown
                className={`text-gray-500 transition-transform ${
                  openDropdown === 'city' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'city' && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    handleInputChange('city', '');
                    setOpenDropdown(null);
                    setSearchTerms({ ...searchTerms, city: '' });
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                    !filters.city
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  All Cities
                </button>
                {getCityOptions()
                  .filter((city) =>
                    city
                      .toLowerCase()
                      .includes((searchTerms.city || '').toLowerCase()),
                  )
                  .map((city, index) => (
                    <button
                      key={`${city}-${index}`}
                      onClick={() => {
                        handleInputChange('city', city);
                        setOpenDropdown(null);
                        setSearchTerms({ ...searchTerms, city: '' });
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                        filters.city === city
                          ? 'bg-cyan-100 text-cyan-700 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                {getCityOptions().filter((city) =>
                  city
                    .toLowerCase()
                    .includes((searchTerms.city || '').toLowerCase()),
                ).length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="state-select"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            State
          </label>
          <div className="relative">
            <input
              type="text"
              value={
                openDropdown === 'state'
                  ? searchTerms.state || ''
                  : filters.state || 'All States'
              }
              onChange={(e) => {
                setSearchTerms({ ...searchTerms, state: e.target.value });
                if (openDropdown !== 'state') setOpenDropdown('state');
              }}
              onFocus={() => {
                setOpenDropdown('state');
                setSearchTerms({ ...searchTerms, state: '' });
              }}
              className={inputCls}
              placeholder="Search state..."
            />
            <button
              onClick={() => {
                if (openDropdown === 'state') {
                  setOpenDropdown(null);
                  setSearchTerms({ ...searchTerms, state: '' });
                } else {
                  setOpenDropdown('state');
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              title="Toggle state dropdown"
            >
              <IoIosArrowDown
                className={`text-gray-500 transition-transform ${
                  openDropdown === 'state' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'state' && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    handleInputChange('state', '');
                    setOpenDropdown(null);
                    setSearchTerms({ ...searchTerms, state: '' });
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                    !filters.state
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  All States
                </button>
                {options.State?.filter((state) =>
                  state.value
                    .toLowerCase()
                    .includes((searchTerms.state || '').toLowerCase()),
                ).map((state, index) => (
                  <button
                    key={`${state.key}-${index}`}
                    onClick={() => {
                      handleInputChange('state', state.value);
                      setOpenDropdown(null);
                      setSearchTerms({ ...searchTerms, state: '' });
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-cyan-50 transition-colors ${
                      filters.state === state.value
                        ? 'bg-cyan-100 text-cyan-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {state.value}
                  </button>
                )) || (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
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
