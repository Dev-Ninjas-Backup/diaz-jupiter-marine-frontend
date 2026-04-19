export interface SearchBoatsFilterParams {
  page?: number;
  limit?: number;
  make?: string;
  model?: string;
  year?: number;
  lengthMin?: number;
  lengthMax?: number;
  maxPrice?: number;
  boatType?: string;
  location?: string;
}

export interface SearchBoatResult {
  source: 'boats-com' | 'yachtbroker';
  id: string;
  title: string | null;
  make: string | null;
  model: string | null;
  year: number | null;
  price: number | null;
  lengthFt: number | null;
  boatType: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  image: string | null;
}

export interface SearchBoatsResponse {
  success: boolean;
  message: string;
  data: SearchBoatResult[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const searchBoats = async ({
  page = 1,
  limit = 15,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: SearchBoatsFilterParams;
} = {}): Promise<{ data: SearchBoatResult[]; total: number; totalPages: number }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filters?.make) params.set('make', filters.make);
    if (filters?.model) params.set('model', filters.model);
    if (filters?.year) params.set('year', String(filters.year));
    if (filters?.lengthMin != null) params.set('lengthMin', String(filters.lengthMin));
    if (filters?.lengthMax != null) params.set('lengthMax', String(filters.lengthMax));
    if (filters?.maxPrice != null) params.set('maxPrice', String(filters.maxPrice));
    if (filters?.boatType) params.set('boatType', filters.boatType);
    if (filters?.location) params.set('location', filters.location);

    const res = await fetch(`${baseUrl}/boats/search?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Boats search failed: ${res.status}`);
      return { data: [], total: 0, totalPages: 1 };
    }

    const json: SearchBoatsResponse = await res.json();
    return {
      data: json.data || [],
      total: json.metadata?.total || 0,
      totalPages: json.metadata?.totalPage || 1,
    };
  } catch (error) {
    console.error('Boats search error:', error);
    return { data: [], total: 0, totalPages: 1 };
  }
};

export const mapSearchBoatToProduct = (boat: SearchBoatResult) => ({
  id: `${boat.source}__${boat.id}`,
  name:
    boat.title ||
    `${boat.year || ''} ${boat.make || ''} ${boat.model || ''}`.trim() ||
    'Unknown Vessel',
  brand_make: boat.make || '',
  model: boat.model || '',
  built_year: boat.year || 0,
  price: boat.price || undefined,
  location: [boat.city, boat.state].filter(Boolean).join(', ') || 'N/A',
  image: boat.image || '/placeholder-boat.jpg',
  source: boat.source,
  rawId: boat.id,
});
