'use client';
import { useSearchResults } from '@/context/SearchResultsContext';
import { fetchSearchSuggestions, postAiQuery } from '@/services/query';
import {
  convertFilterApiDataToYachtProduct,
  type FilterApiBoatData,
} from '@/types/product-types-demo';
import type { SearchQueryData } from '@/types/search-query-types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { TbSparkles } from 'react-icons/tb';

const SearchComponent = () => {
  const router = useRouter();
  const { setSearchResults, setIsSearchActive, setQueryData } =
    useSearchResults();

  // Initial/default values
  const INITIAL_VALUES = {
    year: '2008',
    make: 'Viking (CCV)',
    model: '80 Enclosed',
    length: '60',
    maxPrice: '$22,000',
    boatType: 'Flybridge',
    location: 'Florida',
  };

  const [year, setYear] = useState(INITIAL_VALUES.year);
  const [make, setMake] = useState(INITIAL_VALUES.make);
  const [model, setModel] = useState(INITIAL_VALUES.model);
  const [length, setLength] = useState(INITIAL_VALUES.length);
  const [maxPrice, setMaxPrice] = useState(INITIAL_VALUES.maxPrice);
  const [boatType, setBoatType] = useState(INITIAL_VALUES.boatType);
  const [location, setLocation] = useState(INITIAL_VALUES.location);
  const [aiPrompt, setAiPrompt] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const makes = [
    'Viking (CCV)',
    'Sea Ray',
    'Boston Whaler',
    'Bayliner',
    'Grady-White',
  ];
  const models = ['80 Enclosed', '75 Sport', '60 Convertible', '55 Express'];
  const boatTypes = [
    'Flybridge',
    'Cruiser',
    'Sportfish',
    'Express',
    'Center Console',
    'Flybridge',
    'Cruiser',
    'Sportfish',
    'Express',
    'Center Console',
  ];
  const locations = [
    'Florida',
    'California',
    'Texas',
    'New York',
    'Massachusetts',
  ];

  const searchWithFilters = async () => {
    setIsLoading(true);
    try {
      // Build filter data according to the new API format
      const filterData = {
        make: make !== INITIAL_VALUES.make ? make : '',
        model: model !== INITIAL_VALUES.model ? model : '',
        year_from: year !== INITIAL_VALUES.year && year ? parseInt(year) : 0,
        year_to: year !== INITIAL_VALUES.year && year ? parseInt(year) : 0,
        price_min: 0,
        price_max:
          maxPrice !== INITIAL_VALUES.maxPrice && maxPrice
            ? parseFloat(maxPrice.replace(/[$,]/g, ''))
            : 0,
        length_min:
          length !== INITIAL_VALUES.length && length ? parseFloat(length) : 0,
        length_max: 0,
        beam_min: 0,
        beam_max: 0,
        number_of_engines: 0,
        additional_unit: '',
      };

      console.log('Filter Data:', filterData);

      // Send to backend
      const filterResponse = await fetchSearchSuggestions(filterData);
      console.log('Filter Response:', filterResponse);

      if (filterResponse?.data) {
        // Convert Filter API data to YachtProduct format using the new conversion function
        const yachtProducts = filterResponse.data.map(
          (boat: FilterApiBoatData) => convertFilterApiDataToYachtProduct(boat),
        );

        // Store results in context
        setSearchResults(yachtProducts);
        setIsSearchActive(true);

        // Navigate to search-listing page
        router.push('/search-listing');
      } else {
        console.log('No boats found matching the filters');
      }
    } catch (error) {
      console.error('Filter search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const askAiQuery = async () => {
    setIsLoading(true);
    try {
      // Build query data - only include filters that have been changed from initial values
      const queryData: SearchQueryData = {
        query: aiPrompt || null,
      };

      console.log('AI Query Data:', queryData);

      // Send to backend
      const aiResponse = await postAiQuery({ queryData });
      if (aiResponse?.data) {
        // Convert Filter API data to YachtProduct format (AI response uses same structure as filter)
        const yachtProducts = aiResponse.data.map((boat: FilterApiBoatData) =>
          convertFilterApiDataToYachtProduct(boat),
        );

        setSearchResults(yachtProducts);
        setIsSearchActive(true);
        setQueryData(queryData);

        // Navigate to search-listing page
        router.push('/search-listing');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      askAiQuery();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const toggleDropdown = (name: string) => {
  //   setOpenDropdown(openDropdown === name ? null : name);
  // };

  const DropdownField = ({
    label,
    value,
    options,
    onChange,
    name,
    isLast = false,
  }: {
    label: string;
    value: string;
    options: (string | number)[];
    onChange: (val: string) => void;
    name: string;
    isLast?: boolean;
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredOptions = options.filter((option) =>
      option.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
      <div
        className={`${!isLast ? ' border-gray-200' : ''} p-4 transition-colors relative`}
      >
        <label className="block text-sm font-semibold text-white mb-2">
          {label}
        </label>
        <div className="relative">
          <input
            type="text"
            value={openDropdown === name ? searchTerm : value}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (openDropdown !== name) {
                setOpenDropdown(name);
              }
            }}
            onFocus={() => {
              setOpenDropdown(name);
              setSearchTerm('');
            }}
            className="w-full text-white font-normal focus:outline-none bg-transparent pr-6"
            placeholder={`Search ${label}`}
          />
          <button
            onClick={() => {
              if (openDropdown === name) {
                setOpenDropdown(null);
                setSearchTerm('');
              } else {
                setOpenDropdown(name);
                setSearchTerm('');
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
            title={`Toggle ${label} dropdown`}
            aria-label={`Toggle ${label} dropdown`}
          >
            <IoIosArrowDown
              className={`text-white transition-transform ${openDropdown === name ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {openDropdown === name && (
          <div className="absolute bottom-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-100 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={`${option}-${index}`}
                  onClick={() => {
                    onChange(option.toString());
                    setOpenDropdown(null);
                    setSearchTerm('');
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                    value === option.toString()
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-black'
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto" ref={dropdownRef}>
      {/* Main Search Container */}
      <div className="bg-black/30 backdrop-blur-md rounded-3xl shadow-lg overflow-visible p-2 md:p-6 relative">
        <div className="absolute -top-5 right-4 text-white sm:hidden bg-white rounded-full p-1 cursor-pointer shadow-md">
          <IoIosArrowUp
            onClick={() => setFilterOpen(!filterOpen)}
            className={`${filterOpen ? 'rotate-180' : ''} transition-transform text-sm text-gray-500`}
          />
        </div>
        {/* Filters Row */}
        <div
          className={`${filterOpen ? 'grid' : 'hidden'} sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-0 pb-2 `}
        >
          {/* Year */}
          <DropdownField
            label="Year"
            value={year}
            options={years}
            onChange={setYear}
            name="year"
          />

          {/* Make */}
          <DropdownField
            label="Make"
            value={make}
            options={makes}
            onChange={setMake}
            name="make"
          />

          {/* Model */}
          <DropdownField
            label="Model"
            value={model}
            options={models}
            onChange={setModel}
            name="model"
          />

          {/* Length */}
          <div className=" border-gray-200 p-4  transition-colors">
            <label className="block text-sm font-medium text-white mb-2">
              Length (ft)
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full text-white font-normal focus:outline-none bg-transparent"
              placeholder="60"
            />
          </div>

          {/* Max Price */}
          <div className=" border-gray-200 p-4  transition-colors">
            <label className="block text-sm font-medium text-white mb-2">
              Max Price ($)
            </label>
            <input
              type="text"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full text-white font-normal focus:outline-none bg-transparent"
              placeholder="$22,000"
            />
          </div>

          {/* Boat Type */}
          <DropdownField
            label="Boat Type"
            value={boatType}
            options={boatTypes}
            onChange={setBoatType}
            name="boatType"
          />

          {/* Location */}
          <DropdownField
            label="Location"
            value={location}
            options={locations}
            onChange={setLocation}
            name="location"
            isLast={true}
          />
        </div>

        {/* AI Search Row */}
        <div className="flex flex-col sm:flex-row md:gap-3 items-stretch sm:items-center md:border-t border-gray-200 md:pt-4">
          <div className="flex-1 relative bg-gray-100 rounded-2xl px-2 py-2 md:py-4">
            <input
              type="text"
              value={aiPrompt} //query input
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Example: find me a Viking for sale from 2005 to 2008"
              className="w-full md:px-3 focus:outline-none bg-transparent text-black placeholder:text-gray-900"
            />
            <button
              onClick={askAiQuery}
              disabled={isLoading}
              className={`absolute top-1/2 mx-3 transform -translate-y-1/2 right-0 px-2 md:px-3 py-1 md:py-2 bg-gray-300 text-gray-900 rounded-lg font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                isLoading
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:bg-gray-400 active:scale-95'
              }`}
            >
              <TbSparkles
                className={`text-sm md:text-lg ${isLoading ? 'animate-spin' : ''}`}
              />
              {isLoading ? 'Searching...' : 'Ask AI'}
            </button>
          </div>

          <button
            onClick={searchWithFilters}
            className="px-8 py-2 md:py-4 bg-secondary hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors hidden items-center justify-center gap-2 whitespace-nowrap shadow-md md:flex"
          >
            <IoSearch className="md:text-lg" />
            Find My Boat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
