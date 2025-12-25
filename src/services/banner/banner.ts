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

export const getHomeBanner = async (
  page: string,
  site: string,
): Promise<BannerResponse | null> => {
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
      console.error(`Banner fetch failed with status: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Banner fetch error:', error);
    return null;
  }
};
