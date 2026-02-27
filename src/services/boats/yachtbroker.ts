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
  DisplayPicture?: YBGalleryImage | string;
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
  last_page?: number;
  per_page: number;
  total: number | string;
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
  numberOfEngines?: number;
  boatType?: string;
}

export const getYBListings = async (
  page = 1,
): Promise<{ data: YBBoat[]; total: number; totalPages: number }> => {
  try {
    const res = await fetch(`/api/yachtbroker/vessel?page=${page}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const json: YBApiResponse = await res.json();
    const total = Number(json.total) || 0;
    const perPage = json.per_page || 15;
    const totalPages = json.last_page || Math.ceil(total / perPage) || 1;
    return { data: json['V-Data'] || [], total, totalPages };
  } catch (error) {
    console.error('YB listings error:', error);
    return { data: [], total: 0, totalPages: 1 };
  }
};

export const getYBBoatById = async (id: string): Promise<YBBoat | null> => {
  try {
    const res = await fetch(`/api/yachtbroker/vessel/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('YB boat by id error:', error);
    return null;
  }
};
