export interface AiSearchBannerResponse {
  id: string;
  site: string;
  bannerTitle: string;
  subtitle: string;
  aiSearchBannerId: string | null;
  createdAt: string;
  updatedAt: string;
  aiSearchBanner: { url: string } | null;
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

    const json = await res.json();
    // Support both wrapped format { data: [...] } and flat array format
    const list = Array.isArray(json)
      ? json
      : json?.data && Array.isArray(json.data)
        ? json.data
        : [];
    return list.length > 0 ? list[0] : null;
  } catch (error: unknown) {
    console.error('AI search banner fetch error:', error);
    return null;
  }
};
