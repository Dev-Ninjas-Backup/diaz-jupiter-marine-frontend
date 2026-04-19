export interface BackendBoatsComFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  make?: string;
  model?: string;
  year?: string;
  condition?: string;
  city?: string;
  state?: string;
  lengthMin?: number;
  lengthMax?: number;
  maxPrice?: number;
  boatType?: string;
}

export interface BackendBoatsComBoat {
  id: string;
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
  lengthOverall: number | null;
  beamMeasure: number | null;
  listingTitle: string | null;
  saleClassCode: string | null;
  boatHullMaterialCode: string | null;
  boatCategoryCode: string | null;
  totalEnginePowerQuantity: string | null;
  fuelTankCapacity: string | null;
  description: string | null;
  additionalDescription: string | null;
  images: { uri?: string; priority?: string; caption?: string }[] | null;
  engines:
    | {
        make?: string;
        model?: string;
        fuel?: string;
        enginePower?: string;
        type?: string;
        year?: number;
        hours?: number;
      }[]
    | null;
  lastModificationDate: string | null;
  itemReceivedDate: string | null;
  lastSyncedAt: string | null;
}

export interface BackendBoatsComResponse {
  success: boolean;
  message: string;
  data: BackendBoatsComBoat[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const getBackendBoatsCom = async ({
  page = 1,
  limit = 15,
  filters,
}: {
  page?: number;
  limit?: number;
  filters?: BackendBoatsComFilterParams;
} = {}): Promise<{
  data: BackendBoatsComBoat[];
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
    if (filters?.make) params.set('make', filters.make);
    if (filters?.model) params.set('model', filters.model);
    if (filters?.year) params.set('year', filters.year);
    if (filters?.condition) params.set('condition', filters.condition);
    if (filters?.city) params.set('city', filters.city);
    if (filters?.state) params.set('state', filters.state);
    if (filters?.boatType) params.set('boatType', filters.boatType);
    if (filters?.lengthMin != null)
      params.set('lengthMin', String(filters.lengthMin));
    if (filters?.lengthMax != null)
      params.set('lengthMax', String(filters.lengthMax));
    if (filters?.maxPrice != null)
      params.set('maxPrice', String(filters.maxPrice));

    const res = await fetch(`${baseUrl}/boats-com?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Backend boats-com fetch failed: ${res.status}`);
      return { data: [], total: 0, totalPages: 1 };
    }

    const json: BackendBoatsComResponse = await res.json();
    return {
      data: json.data || [],
      total: json.metadata?.total || 0,
      totalPages: json.metadata?.totalPage || 1,
    };
  } catch (error) {
    console.error('Backend boats-com error:', error);
    return { data: [], total: 0, totalPages: 1 };
  }
};

export const mapBackendBoatToProduct = (boat: BackendBoatsComBoat) => ({
  id: boat.documentId,
  name:
    boat.listingTitle ||
    `${boat.modelYear || ''} ${boat.makeString || ''} ${boat.model || ''}`.trim() ||
    'Unknown Vessel',
  brand_make: boat.makeString || '',
  model: boat.model || '',
  built_year: boat.modelYear || 0,
  price: boat.price || undefined,
  location: [boat.city, boat.state].filter(Boolean).join(', ') || 'N/A',
  image:
    (boat.images as { uri?: string }[])?.[0]?.uri || '/placeholder-boat.jpg',
});

export const getBackendBoatComById = async (
  documentId: string,
): Promise<BackendBoatsComBoat | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/boats-com/${documentId}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Backend boats-com getOne error:', error);
    return null;
  }
};

export const mapBackendBoatToDetails = (b: BackendBoatsComBoat) => {
  const engines = Array.isArray(b.engines)
    ? (
        b.engines as {
          make?: string;
          model?: string;
          fuel?: string;
          enginePower?: string;
          type?: string;
          year?: number;
          hours?: number;
        }[]
      ).map((e) => ({
        Make: e.make || '',
        Model: e.model || '',
        FuelType: e.fuel || '',
        Power: e.enginePower || '',
        Type: e.type || '',
        Year: e.year || null,
        Hours: e.hours || null,
      }))
    : [];

  const images = Array.isArray(b.images)
    ? (b.images as { uri?: string }[])
        .map((img) => ({ uri: img.uri || '' }))
        .filter((i) => i.uri)
    : [];

  const specs = [
    { key: 'Make', value: b.makeString || null },
    { key: 'Model', value: b.model || null },
    { key: 'Year', value: b.modelYear || null },
    { key: 'Condition', value: b.saleClassCode || null },
    { key: 'Category', value: b.boatCategoryCode || null },
    { key: 'Length', value: b.nominalLength ? `${b.nominalLength} ft` : null },
    {
      key: 'Length Overall',
      value: b.lengthOverall ? `${b.lengthOverall} ft` : null,
    },
    { key: 'Beam', value: b.beamMeasure ? `${b.beamMeasure} ft` : null },
    { key: 'Hull Material', value: b.boatHullMaterialCode || null },
    { key: 'Fuel Capacity', value: b.fuelTankCapacity || null },
    { key: 'Total Engine Power', value: b.totalEnginePowerQuantity || null },
  ].filter((s) => s.value !== null && s.value !== '');

  return {
    id: b.documentId,
    title:
      b.listingTitle ||
      `${b.modelYear || ''} ${b.makeString || ''} ${b.model || ''}`.trim() ||
      'Unknown Vessel',
    price: b.price ? `$${b.price.toLocaleString()}` : 'Price on request',
    source: 'boats-com',
    description:
      [b.description, b.additionalDescription].filter(Boolean).join('\n\n') ||
      '',
    images,
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
      {
        key: 'Location',
        value: [b.city, b.state].filter(Boolean).join(', ') || null,
      },
      { key: 'Last Modified', value: b.lastModificationDate || null },
      { key: 'Listed Date', value: b.itemReceivedDate || null },
    ].filter((a) => a.value !== null && a.value !== ''),
  };
};
