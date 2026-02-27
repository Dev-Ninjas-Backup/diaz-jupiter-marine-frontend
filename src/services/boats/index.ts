export interface BoatsComFilterParams {
  keyword?: string;
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceMin?: number;
  priceMax?: number;
  lengthFrom?: number;
  lengthTo?: number;
  boatType?: string;
  engines?: number;
  condition?: string;
  fuel?: string;
  hull?: string;
  state?: string;
  country?: string;
  cabinsFrom?: number;
  cabinsTo?: number;
  headsFrom?: number;
  headsTo?: number;
  beamFrom?: number;
  beamTo?: number;
  city?: string;
  type?: string;
  sort?: string;
}

// Boats.com API - All Listings with server-side pagination
export const getAllBoats = async ({
  page = 1,
  limit = 9,
  filters,
}: { page?: number; limit?: number; filters?: BoatsComFilterParams } = {}) => {
  try {
    const start = (page - 1) * limit;
    const params = new URLSearchParams({
      status: 'Active',
      sort: 'LastModificationDate|desc',
      rows: String(limit),
      start: String(start),
    });
    if (filters?.keyword) params.set('AdvancedKeywordSearch', filters.keyword);
    if (filters?.make) params.set('make', filters.make);
    if (filters?.model) params.set('model', filters.model);
    if (filters?.yearFrom && filters?.yearTo)
      params.set('year', `${filters.yearFrom}:${filters.yearTo}`);
    else if (filters?.yearFrom) params.set('year', `${filters.yearFrom}:`);
    else if (filters?.yearTo) params.set('year', `:${filters.yearTo}`);
    if (filters?.priceMin != null || filters?.priceMax != null)
      params.set(
        'price',
        `${filters.priceMin ?? 0}:${filters.priceMax ?? 20000000}|USD`,
      );
    if (filters?.lengthFrom != null || filters?.lengthTo != null) {
      // boats.com length is in meters, convert from feet
      const toM = (ft: number) => (ft / 3.28084).toFixed(2);
      params.set(
        'length',
        `${toM(filters.lengthFrom ?? 0)}:${toM(filters.lengthTo ?? 500)}|meter`,
      );
    }
    if (filters?.boatType) params.set('class', filters.boatType);
    if (filters?.engines) params.set('engines', String(filters.engines));
    if (filters?.condition) params.set('condition', filters.condition);
    if (filters?.fuel) params.set('fuel', filters.fuel);
    if (filters?.hull) params.set('hull', filters.hull);
    if (filters?.state) params.set('state', filters.state);
    if (filters?.country) params.set('country', filters.country);
    if (filters?.city) params.set('city', filters.city);
    if (filters?.type) params.set('type', filters.type);
    if (filters?.sort) params.set('sort', filters.sort);
    if (filters?.cabinsFrom != null || filters?.cabinsTo != null)
      params.set(
        'cabins',
        `${filters.cabinsFrom ?? 0}:${filters.cabinsTo ?? 20}`,
      );
    if (filters?.headsFrom != null || filters?.headsTo != null)
      params.set('heads', `${filters.headsFrom ?? 0}:${filters.headsTo ?? 20}`);
    if (filters?.beamFrom != null || filters?.beamTo != null) {
      const toM = (ft: number) => (ft / 3.28084).toFixed(2);
      params.set(
        'beam',
        `${toM(filters.beamFrom ?? 0)}:${toM(filters.beamTo ?? 100)}|meter`,
      );
    }
    const res = await fetch(`/api/boats-com?${params.toString()}`, {
      method: 'GET',
      next: { tags: ['ALL_BOATS'] },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    const total = data.numResults || 0;
    return {
      success: true,
      data: data.results || [],
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error: unknown) {
    console.error('Boat Gets Error:', error);
    if (error instanceof Error) throw error;
    throw new Error('Failed to fetch boats');
  }
};

// YachtBroker API - Get Single Boat
export const getBoatById = async (boatId: string) => {
  try {
    const res = await fetch(`/api/boats-com/${boatId}`, {
      method: 'GET',
      next: { tags: ['BOAT_BY_ID', boatId] },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const json = await res.json();
    const b = json.data;

    const parsePrice = (priceStr?: string): string => {
      if (!priceStr) return 'Price on request';
      const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      return num ? `$${num.toLocaleString()}` : 'Price on request';
    };

    const mapped = {
      id: String(b.DocumentID),
      title:
        b.ListingTitle ||
        `${b.ModelYear || ''} ${b.MakeString || ''} ${b.Model || ''}`.trim() ||
        'Unknown Vessel',
      price: parsePrice(b.Price),
      source: 'boats.com',
      description: (b.GeneralBoatDescription || [])
        .join(' ')
        .replace(/<[^>]*>/g, ' ')
        .trim(),
      images: (b.Images || [])
        .map((img: { Uri?: string }) => ({ uri: img.Uri || '' }))
        .filter((img: { uri: string }) => img.uri),
      specifications: [
        { key: 'Make', value: b.MakeString || null },
        { key: 'Model', value: b.Model || null },
        { key: 'Year', value: b.ModelYear || null },
        { key: 'Length', value: b.NominalLength || null },
        { key: 'Beam', value: b.BeamMeasure || null },
        { key: 'Hull Material', value: b.BoatHullMaterialCode || null },
        { key: 'Condition', value: b.SaleClassCode || null },
        { key: 'Engines', value: b.NumberOfEngines ?? null },
      ].filter((s) => s.value !== null && s.value !== ''),
      engines: [],
      videos: (b.Videos?.url || [])
        .map((url: string, i: number) => ({
          url,
          title: b.Videos?.title?.[i],
          thumbnailUrl: b.Videos?.thumbnailUrl?.[i],
        }))
        .filter((v: { url: string }) => v.url),
      additionalInfo: [
        { key: 'City', value: b.BoatLocation?.BoatCityName || null },
        { key: 'State', value: b.BoatLocation?.BoatStateCode || null },
        {
          key: 'Location',
          value:
            [b.BoatLocation?.BoatCityName, b.BoatLocation?.BoatStateCode]
              .filter(Boolean)
              .join(', ') || null,
        },
      ].filter((a) => a.value !== null && a.value !== ''),
    };

    return {
      success: true,
      message: 'Boat details fetched successfully',
      data: mapped,
    };
  } catch (error: unknown) {
    console.error('Boat Get By ID Error:', error);
    if (error instanceof Error) throw error;
    throw new Error('Failed to fetch boat by ID');
  }
};
