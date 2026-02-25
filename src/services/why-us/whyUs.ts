export interface WhyUsImage {
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
}

export interface WhyUsResponse {
  id: string;
  site: string;
  title: string;
  description: string;
  excellence: string;
  boatsSoldPerYear: string;
  listingViewed: string;
  buttonText: string;
  buttonLink: string;
  image1Id: string;
  image2Id: string;
  image3Id: string;
  createdAt: string;
  updatedAt: string;
  image1: WhyUsImage;
  image2: WhyUsImage;
  image3: WhyUsImage;
}

export interface WhyUsApiResponse {
  success: boolean;
  message: string;
  data: WhyUsResponse;
}

export const getWhyUs = async (
  site: string = 'JUPITER',
): Promise<WhyUsResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const url = site ? `${baseUrl}/why-us?site=${site}` : `${baseUrl}/why-us`;
    const res = await fetch(url, {
      method: 'GET',
      next: { tags: [`WHY_US_${site}`] },
    });

    if (!res.ok) {
      console.error(`Why Us fetch failed with status: ${res.status}`);
      return null;
    }

    const response: WhyUsApiResponse = await res.json();
    return response.data || null;
  } catch (error: unknown) {
    console.error('Why Us fetch error:', error);
    return null;
  }
};
