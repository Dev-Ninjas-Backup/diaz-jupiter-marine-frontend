import { SearchQueryData } from "@/types/search-query-types";

export const postAiQuery = async ({
 queryData
}: {
  queryData: SearchQueryData;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

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