export interface FeaturedBoatImage {
  id: string;
  url: string;
  isPrimary: boolean;
  file: {
    id: string;
    filename: string;
    mimetype: string;
    size: number;
    url: string;
  };
}

export interface FeaturedBoatEngine {
  id: string;
  manufacturer: string;
  model: string;
  horsepower: number;
  fuelType: string;
  hours: number;
}

export interface FeaturedBoatUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface FeaturedBoat {
  id: string;
  name: string;
  price: number;
  description: string;
  year: number;
  make: string;
  model: string;
  length: number;
  beam: number;
  draft: number;
  status: string;
  location: string;
  images: FeaturedBoatImage[];
  engines: FeaturedBoatEngine[];
  user: FeaturedBoatUser;
}

export interface FeaturedBoatResponse {
  id: string;
  boatId: string;
  site: string;
  featuredAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  boat: FeaturedBoat;
}

export interface FeaturedBoatsApiResponse {
  success: boolean;
  message: string;
  data: FeaturedBoatResponse | FeaturedBoatResponse[];
}

export const getFeaturedBoats = async (
  site: string = 'JUPITER',
): Promise<FeaturedBoatResponse[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/boats/featured?site=${site}`, {
      method: 'GET',
      next: { tags: [`FEATURED_BOATS_${site}`] },
    });

    if (!res.ok) {
      console.error(`Featured boats fetch failed with status: ${res.status}`);
      return [];
    }

    const response: FeaturedBoatsApiResponse = await res.json();

    // Handle both single object and array responses
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data) {
      return [response.data];
    }

    return [];
  } catch (error: unknown) {
    console.error('Featured boats fetch error:', error);
    return [];
  }
};
