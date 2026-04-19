export interface BackendBoat {
  documentId: string;
  makeString: string | null;
  modelYear: number | null;
  model: string | null;
  price: number | null;
  originalPrice: number | null;
  city: string | null;
  state: string | null;
  country: string | null;
  nominalLength: number | null;
  beamMeasure: number | null;
  listingTitle: string | null;
  images: { uri?: string; priority?: string; caption?: string }[] | null;
  lastModificationDate: string | null;
  itemReceivedDate: string | null;
  saleClassCode: string | null;
  boatHullMaterialCode: string | null;
  totalEnginePowerQuantity: string | null;
  description: string | null;
}

export interface BackendBoatsResponse {
  success: boolean;
  message: string;
  data: BackendBoat[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const getFeaturedBoatsFromBackend = async (
  page = 1,
  limit = 12,
): Promise<{ boats: BackendBoat[]; total: number }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/boats-com?page=${page}&limit=${limit}`,
      { cache: 'no-store' },
    );

    if (!res.ok) {
      console.error(`Backend boats fetch failed with status: ${res.status}`);
      return { boats: [], total: 0 };
    }

    const response: BackendBoatsResponse = await res.json();
    return {
      boats: response.data || [],
      total: response.metadata?.total || 0,
    };
  } catch (error: unknown) {
    console.error('Backend boats fetch error:', error);
    return { boats: [], total: 0 };
  }
};
