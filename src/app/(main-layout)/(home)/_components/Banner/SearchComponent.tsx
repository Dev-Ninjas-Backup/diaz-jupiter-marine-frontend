'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { TbSparkles } from 'react-icons/tb';

const SearchComponent = () => {
  const [year, setYear] = useState('2008');
  const [make, setMake] = useState('Viking (CCV)');
  const [model, setModel] = useState('80 Enclosed');
  const [length, setLength] = useState('60');
  const [maxPrice, setMaxPrice] = useState('$22,000');
  const [boatType, setBoatType] = useState('Flybridge');
  const [location, setLocation] = useState('Florida');
  const [aiPrompt, setAiPrompt] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

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

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

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
  }) => (
    <div
      className={`${!isLast ? ' border-gray-200' : ''} p-4  transition-colors relative`}
    >
      <button onClick={() => toggleDropdown(name)} className="w-full text-left">
        <label className="block text-sm font-semibold text-white mb-2 cursor-pointer">
          {label}{' '}
          <IoIosArrowDown
            className={`inline ml-1 text-white  transition-transform ${openDropdown === name ? 'rotate-180' : ''}`}
          />
        </label>
        <div className="text-white ">{value}</div>
      </button>

      {openDropdown === name && (
        <div className="absolute bottom-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-100 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option.toString());
                setOpenDropdown(null);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                value === option.toString()
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-black'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full mx-auto" ref={dropdownRef}>
      {/* Main Search Container */}
      <div className="bg-black/30 backdrop-blur-md rounded-3xl shadow-lg overflow-visible p-2 md:p-6 relative">
        <div className="absolute -top-5 right-4 text-white sm:hidden bg-white rounded-full p-1 cursor-pointer shadow-md">
          <IoIosArrowUp
            onClick={() => setFilterOpen(!filterOpen)}
            className={`${filterOpen ? 'rotate-180' : ''} transition-transform text-2xl`}
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
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Example: find me a Viking for sale from 2005 to 2008"
              className="w-full md:px-3 focus:outline-none bg-transparent text-white placeholder:text-gray-400"
            />
            <button className="absolute top-1/2 mx-3 transform -translate-y-1/2 right-0 px-2 md:px-3 py-1 md:py-2 bg-gray-300 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
              <TbSparkles className="text-sm md:text-lg" />
              Ask AI
            </button>
          </div>

          <button className="px-8 py-2 md:py-4 bg-secondary hover:bg-blue-700 text-white rounded-2xl font-medium transition-colors hidden items-center justify-center gap-2 whitespace-nowrap shadow-md md:flex">
            <IoSearch className="md:text-lg" />
            Find My Boat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
