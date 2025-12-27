export interface AiSearchBannerResponse {
  id: string;
  site: string;
  bannerTitle: string;
  subtitle: string;
  aiSearchBannerId: string | null;
  createdAt: string;
  updatedAt: string;
  aiSearchBanner: unknown | null;
}

export const getAiSearchBanner = async (
  site: string = 'JUPITER',
): Promise<AiSearchBannerResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/ai-search-banner?site=${site}`, {
      method: 'GET',
      next: { tags: [`AI_SEARCH_BANNER_${site}`] },
    });

    if (!res.ok) {
      console.error(`AI search banner fetch failed with status: ${res.status}`);
      return null;
    }

    const data = await res.json();
    // API returns an array, get the first item
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error: unknown) {
    console.error('AI search banner fetch error:', error);
    return null;
  }
};

