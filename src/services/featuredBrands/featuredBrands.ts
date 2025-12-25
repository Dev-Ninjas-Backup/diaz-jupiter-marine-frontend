export interface FeaturedBrand {
  id: string;
  site: string;
  featuredbrandLogo: {
    url: string;
    filename: string;
  };
}

export const getFeaturedBrands = async (
  site: string,
): Promise<FeaturedBrand[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/featured-brands?site=${site}`, {
      method: 'GET',
      next: { revalidate: 3600, tags: ['FEATURED_BRANDS'] },
    });

    if (!res.ok) throw new Error('Failed to fetch brands');

    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
};
