export interface YBGalleryImage {
  Large?: string;
  HD?: string;
  Medium?: string;
  Thumbnail?: string;
}

export interface YBEngine {
  Make?: string;
  Model?: string;
  Year?: number;
  Hours?: number;
  FuelType?: string;
  EnginePower?: string;
  Type?: string;
}

export interface YBBoat {
  ID: number;
  Manufacturer?: string;
  Model?: string;
  Year?: number;
  VesselName?: string;
  PriceUSD?: number;
  PriceHidden?: boolean;
  City?: string;
  State?: string;
  Country?: string;
  DisplayLengthFeet?: number;
  BeamFeet?: number;
  BeamInch?: number;
  FuelType?: string;
  HullMaterial?: string;
  Category?: string;
  Condition?: string;
  Status?: string;
  Description?: string;
  Summary?: string;
  DisplayPicture?: YBGalleryImage;
  gallery?: YBGalleryImage[];
  Engines?: YBEngine[];
  EngineQty?: number;
  MaximumDraftFeet?: number;
  CabinCount?: number;
  HeadCount?: number;
  NotableUpgrades?: string;
}

export interface YBApiResponse {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  'V-Data': YBBoat[];
}

export interface YBFilterParams {
  keyword?: string;
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceMin?: number;
  priceMax?: number;
  lengthFrom?: number;
  lengthTo?: number;
  beamFrom?: number;
  beamTo?: number;
  numberOfEngines?: number;
  numberOfCabins?: number;
  numberOfHeads?: number;
  boatType?: string;
}

export const getYBListings = async (
  page = 1,
  filters?: YBFilterParams,
): Promise<{ data: YBBoat[]; total: number; totalPages: number }> => {
  try {
    const params = new URLSearchParams({ page: String(page) });
    if (filters?.keyword) params.set('keyword', filters.keyword);
    if (filters?.make) params.set('brand', filters.make);
    if (filters?.model) params.set('model', filters.model);
    if (filters?.boatType) params.set('category', filters.boatType);
    if (filters?.yearFrom || filters?.yearTo)
      params.set('year', `${filters.yearFrom ?? ''},${filters.yearTo ?? ''}`);
    if (filters?.priceMin != null || filters?.priceMax != null)
      params.set('price', `${filters.priceMin ?? 0},${filters.priceMax ?? 20000000}`);
    if (filters?.lengthFrom != null || filters?.lengthTo != null)
      params.set('length', `${filters.lengthFrom ?? 0},${filters.lengthTo ?? 500}`);
    if (filters?.beamFrom != null || filters?.beamTo != null)
      params.set('beam', `${filters.beamFrom ?? 0},${filters.beamTo ?? 150}`);
    if (filters?.numberOfEngines) params.set('engines', String(filters.numberOfEngines));
    if (filters?.numberOfCabins) params.set('cabins', String(filters.numberOfCabins));
    if (filters?.numberOfHeads) params.set('heads', String(filters.numberOfHeads));

    const res = await fetch(`/api/yachtbroker/vessel?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const json: YBApiResponse = await res.json();
    return {
      data: json['V-Data'] || [],
      total: json.total || 0,
      totalPages: json.last_page || 1,
    };
  } catch (error) {
    console.error('YB listings error:', error);
    return { data: [], total: 0, totalPages: 1 };
  }
};

export const getYBBoatById = async (id: string): Promise<YBBoat | null> => {
  try {
    const res = await fetch(`/api/yachtbroker/vessel/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('YB boat by id error:', error);
    return null;
  }
};
