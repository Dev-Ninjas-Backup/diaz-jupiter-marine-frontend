export interface BannerResponse {
  id: string;
  bannerTitle: string;
  subtitle: string;
  background: {
    url: string;
    mimeType: string;
    filename: string;
  };
}

export const getHomeBanner = async (page: string, site: string): Promise<BannerResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/banners/single?page=${page}&site=${site}`,
      {
        method: 'GET',
        next: { tags: ['HOME_BANNER'] },
      },
    );

    if (!res.ok) {
      throw new Error(`Banner fetch failed: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Banner API Error:', error);
    throw new Error('Failed to load banner');
  }
};
