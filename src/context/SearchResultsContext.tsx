'use client';

import type { YachtProduct } from '@/types/product-types-demo';
import type { SearchQueryData } from '@/types/search-query-types';
import React, { createContext, useContext, useState } from 'react';

interface SearchResultsContextType {
  searchResults: YachtProduct[] | null;
  setSearchResults: (results: YachtProduct[] | null) => void;
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
  queryData: SearchQueryData | null;
  setQueryData: (data: SearchQueryData | null) => void;
}

const SearchResultsContext = createContext<
  SearchResultsContextType | undefined
>(undefined);

export const SearchResultsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<YachtProduct[] | null>(
    null,
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [queryData, setQueryData] = useState<SearchQueryData | null>(null);

  return (
    <SearchResultsContext.Provider
      value={{
        searchResults,
        setSearchResults,
        isSearchActive,
        setIsSearchActive,
        queryData,
        setQueryData,
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearchResults = () => {
  const context = useContext(SearchResultsContext);
  if (!context) {
    throw new Error(
      'useSearchResults must be used within SearchResultsProvider',
    );
  }
  return context;
};
