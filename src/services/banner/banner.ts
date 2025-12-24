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


export const getHomeBanner = async (): Promise<BannerResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/banners/single?page=HOME&site=JUPITER`,
      {
        method: 'GET',
        next: { tags: ['HOME_BANNER'] },
      }
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

// Interface for Banner Response

// export interface BannerData {
//   id: string;
//   bannerTitle: string;
//   subtitle: string;
//   background: {
//     url: string;
//     mimeType: string;
//     filename: string;
//   };
// }

// export const getHomeBanner = async (): Promise<BannerData | null> => {
//   try {
//     const res = await fetch(
//       "https://api.floridayachttrader.com/api/banners/single?page=HOME&site=JUPITER",
//       {
//         method: "GET",
//         next: {
//           revalidate: 3600, 
//           tags: ["HOME_BANNER"],
//         },
//       }
//     );
//     if (!res.ok) return null;
//     return await res.json();
//   } catch (error) {
//     console.error("Banner Fetch Error:", error);
//     return null;
//   }
// };
