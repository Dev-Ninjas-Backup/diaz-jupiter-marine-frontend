export interface CategoryApiResponse {
  id: string;
  title: string;
  image?: {
    url: string;
  };
}

export const getCategories = async (): Promise<CategoryApiResponse[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/category`,
      {
        method: 'GET',
        next: { tags: ['CATEGORIES'] },
      }
    );

    if (!res.ok) {
      throw new Error(`Category fetch failed: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Category API Error:', error);
    throw new Error('Failed to load categories');
  }
};
