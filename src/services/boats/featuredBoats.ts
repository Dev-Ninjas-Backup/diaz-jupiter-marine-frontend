export interface FeaturedBoatImage {
  id: string;
  boatId: string;
  fileId: string;
  imageType: 'COVER' | 'GALLERY';
  createdAt: string;
  updatedAt: string;
  file: {
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

export interface FeaturedBoatEngine {
  id: string;
  hours: number;
  horsepower: number;
  make: string;
  model: string;
  fuelType: string;
  propellerType: string;
  boatId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeaturedBoatUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface FeaturedBoat {
  id: string;
  listingId: string;
  userId: string;
  name: string;
  price: number;
  buildYear: number;
  description: string;
  make: string;
  model: string;
  fuelType: string;
  class: string;
  material: string;
  condition: string;
  engineType: string;
  propType: string;
  propMaterial: string;
  electronics: unknown[];
  insideEquipment: unknown[];
  outsideEquipment: unknown[];
  electricalEquipment: unknown[];
  covers: unknown[];
  additionalEquipment: unknown[];
  length: number;
  beam: number;
  draft: number;
  enginesNumber: number;
  cabinsNumber: number;
  headsNumber: number;
  city: string;
  state: string;
  zip: string;
  extraDetails: Record<string, unknown>;
  status: string;
  createdAt: string;
  updatedAt: string;
  videoURL?: string;
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
