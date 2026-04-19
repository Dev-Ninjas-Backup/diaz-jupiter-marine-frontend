export interface BackendYBFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  manufacturer?: string;
  model?: string;
  year?: string;
  condition?: string;
  category?: string;
  boatType?: string;
  city?: string;
  state?: string;
  lengthMin?: number;
  lengthMax?: number;
  maxPrice?: number;
}

export interface BackendYBEngine {
  make?: string;
  model?: string;
  fuelType?: string;
  powerHp?: number;
  type?: string;
  year?: number;
  hours?: number;
}

export interface BackendYBBoat {
  id: string;
  externalId: string;
  vesselName: string | null;
  manufacturer: string | null;
  model: string | null;
  year: number | null;
  priceUsd: number | null;
  priceHidden: boolean;
  city: string | null;
  state: string | null;
  country: string | null;
  displayLengthFeet: number | null;
  beamFeet: number | null;
  beamInch: number | null;
  fuelType: string | null;
  hullMaterial: string | null;
  category: string | null;
  condition: string | null;
  status: string | null;
  description: string | null;
  summary: string | null;
  notableUpgrades: string | null;
  displayPicture: {
    large?: string;
    hd?: string;
    medium?: string;
    thumbnail?: string;
  } | null;
  gallery:
    | { large?: string; hd?: string; medium?: string; thumbnail?: string }[]
    | null;
  engines: BackendYBEngine[] | null;
  engineQty: number | null;
  maximumDraftFeet: number | null;
  cabinCount: number | null;
  headCount: number | null;
  lastSyncedAt: string;
  createdAt: string;
}

export interface BackendYBResponse {
  success: boolean;
  message: string;
  data: BackendYBBoat[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const getBackendYBListings = async ({
  page = 1,
  limit = 15,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: BackendYBFilterParams;
} = {}): Promise<{
  data: BackendYBBoat[];
  total: number;
  totalPages: number;
}> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (filters?.search) params.set('search', filters.search);
    if (filters?.manufacturer) params.set('manufacturer', filters.manufacturer);
    if (filters?.model) params.set('model', filters.model);
    if (filters?.year) params.set('year', filters.year);
    if (filters?.condition) params.set('condition', filters.condition);
    if (filters?.category) params.set('category', filters.category);
    if (filters?.boatType) params.set('boatType', filters.boatType);
    if (filters?.city) params.set('city', filters.city);
    if (filters?.state) params.set('state', filters.state);
    if (filters?.lengthMin != null)
      params.set('lengthMin', String(filters.lengthMin));
    if (filters?.lengthMax != null)
      params.set('lengthMax', String(filters.lengthMax));
    if (filters?.maxPrice != null)
      params.set('maxPrice', String(filters.maxPrice));

    const res = await fetch(`${baseUrl}/yachtbroker?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Backend yachtbroker fetch failed: ${res.status}`);
      return { data: [], total: 0, totalPages: 1 };
    }

    const json: BackendYBResponse = await res.json();
    return {
      data: json.data || [],
      total: json.metadata?.total || 0,
      totalPages: json.metadata?.totalPage || 1,
    };
  } catch (error) {
    console.error('Backend yachtbroker error:', error);
    return { data: [], total: 0, totalPages: 1 };
  }
};

export const getBackendYBById = async (
  externalId: string,
): Promise<BackendYBBoat | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/yachtbroker/${externalId}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Backend yachtbroker getOne error:', error);
    return null;
  }
};

export const mapBackendYBToProduct = (b: BackendYBBoat) => {
  const pic = b.displayPicture;
  const image = pic?.large || pic?.hd || pic?.medium || '/placeholder-boat.jpg';
  return {
    id: b.externalId,
    name:
      b.vesselName ||
      `${b.year || ''} ${b.manufacturer || ''} ${b.model || ''}`.trim() ||
      'Unknown Vessel',
    brand_make: b.manufacturer || '',
    model: b.model || '',
    built_year: b.year || 0,
    price: b.priceHidden ? undefined : b.priceUsd || undefined,
    location: [b.city, b.state].filter(Boolean).join(', ') || 'N/A',
    image,
  };
};

export const mapBackendYBToDetails = (b: BackendYBBoat) => {
  const gallery = Array.isArray(b.gallery)
    ? b.gallery
        .map((g) => ({ uri: g.large || g.hd || '' }))
        .filter((i) => i.uri)
    : [];

  const engines = Array.isArray(b.engines)
    ? b.engines.map((e) => ({
        Make: e.make || '',
        Model: e.model || '',
        FuelType: e.fuelType || '',
        Power: e.powerHp ? `${e.powerHp} hp` : '',
        Type: e.type || '',
        Year: e.year || null,
        Hours: e.hours || null,
      }))
    : [];

  const specs = [
    { key: 'Make', value: b.manufacturer || null },
    { key: 'Model', value: b.model || null },
    { key: 'Year', value: b.year || null },
    { key: 'Condition', value: b.condition || null },
    { key: 'Category', value: b.category || null },
    {
      key: 'Length',
      value: b.displayLengthFeet ? `${b.displayLengthFeet} ft` : null,
    },
    {
      key: 'Beam',
      value: b.beamFeet
        ? `${b.beamFeet}'${b.beamInch ? ` ${b.beamInch}"` : ''}`
        : null,
    },
    { key: 'Hull Material', value: b.hullMaterial || null },
    { key: 'Fuel Type', value: b.fuelType || null },
    { key: 'Engines', value: b.engineQty ?? null },
    { key: 'Cabins', value: b.cabinCount ?? null },
    { key: 'Heads', value: b.headCount ?? null },
    {
      key: 'Max Draft',
      value: b.maximumDraftFeet ? `${b.maximumDraftFeet} ft` : null,
    },
  ].filter((s) => s.value !== null && s.value !== '');

  return {
    id: b.externalId,
    title:
      b.vesselName ||
      `${b.year || ''} ${b.manufacturer || ''} ${b.model || ''}`.trim() ||
      'Unknown Vessel',
    price: b.priceHidden
      ? 'Price on request'
      : b.priceUsd
        ? `$${b.priceUsd.toLocaleString()}`
        : 'Price on request',
    source: 'yachtbroker',
    description: [b.description, b.summary, b.notableUpgrades]
      .filter(Boolean)
      .join('\n\n')
      .replace(/<[^>]*>/g, ' ')
      .trim(),
    images: gallery,
    specifications: specs,
    engines,
    location: {
      city: b.city || undefined,
      state: b.state || undefined,
      country: b.country || undefined,
    },
    additionalInfo: [
      { key: 'City', value: b.city || null },
      { key: 'State', value: b.state || null },
      { key: 'Country', value: b.country || null },
      {
        key: 'Location',
        value: [b.city, b.state].filter(Boolean).join(', ') || null,
      },
    ].filter((a) => a.value !== null && a.value !== ''),
  };
};
