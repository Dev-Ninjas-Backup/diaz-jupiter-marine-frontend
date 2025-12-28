import { SearchQueryData } from '@/types/search-query-types';

export const postAiQuery = async ({
  queryData,
}: {
  queryData: SearchQueryData;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
    const userId = localStorage.getItem('GENERATED_UID');
    const limit = 10;
    if (userId) {
      queryData.user_id = userId;
      queryData.limit = limit;
    }
    console.log('Sending query data:', queryData);
    const res = await fetch(`${baseUrl}/query`, {
      method: 'POST',
      body: JSON.stringify(queryData),
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['SEARCH_QUERY'],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Query error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send query');
  }
};

export interface FilterData {
  make: string;
  model: string;
  year_from: number;
  year_to: number;
  price_min: number;
  price_max: number;
  length_min: number;
  length_max: number;
  beam_min: number;
  beam_max: number;
  number_of_engines: number;
  additional_unit: string;
}

export const fetchSearchSuggestions = async (filterData: FilterData) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
    console.log('Sending filter data:', filterData);
    const res = await fetch(`${baseUrl}/boats?limit=20`, {
      method: 'POST',
      body: JSON.stringify(filterData),
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['FILTTER_SEARCH'],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Suggestions error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch search suggestions');
  }
};
