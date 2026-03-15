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
  page?: number;
  search?: string;
  type?: string;
  category?: string;
  brand?: string;
  model?: string;
  condition?: string;
  year?: string;
  price?: string;
  loa?: string;
  loatype?: string;
  length?: string;
  lengthtype?: string;
  cabins?: string;
  currency?: string;
  sort?: string;
  city?: string;
  state?: string;
  country?: string;
  regions?: string;
}

export interface YBFilterOptions {
  Categories?: {
    Power?: { [key: string]: string };
    Sail?: { [key: string]: string };
  };
  Brands?: (string | null)[];
  Types?: string[];
  City?: (string | null)[];
  State?: Array<{ key: string; value: string }>;
  Country?: Array<{ key: string | null; value: string }>;
}

export const getYBListings = async (
  page = 1,
  filters?: YBFilterParams,
  perPage = 15,
): Promise<{ data: YBBoat[]; total: number; totalPages: number }> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
    });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.set(key, String(value));
        }
      });
    }
    const res = await fetch(`/api/yachtbroker/vessel?${params.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const json: YBApiResponse = await res.json();
    const total = Number(json.total) || 0;
    const responsePerPage = json.per_page || perPage;
    const totalPages =
      json.last_page || Math.ceil(total / responsePerPage) || 1;
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

export const getYBFilters = async (): Promise<YBFilterOptions> => {
  try {
    const res = await fetch('/api/yachtbroker/filters', {
      cache: 'no-store',
    });
    if (!res.ok) return {};
    return await res.json();
  } catch (error) {
    console.error('YB filters error:', error);
    return {};
  }
};
