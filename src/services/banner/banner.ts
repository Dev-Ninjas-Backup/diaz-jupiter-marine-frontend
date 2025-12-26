export interface BannerResponse {
  id: string;
  page: string;
  site: string;
  bannerTitle: string;
  subtitle: string;
  backgroundId: string;
  createdAt: string;
  updatedAt: string;
  background: {
    id: string;
    filename: string;
    originalFilename: string;
    path: string;
    url: string;
    fileType: string;
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const getBanner = async (
  page: string,
  site: string,
): Promise<BannerResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/banners/single?page=${page}&site=${site}`,
      {
        method: 'GET',
        next: { tags: [`BANNER_${page}_${site}`] },
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

// Keep getHomeBanner for backward compatibility
export const getHomeBanner = getBanner;
