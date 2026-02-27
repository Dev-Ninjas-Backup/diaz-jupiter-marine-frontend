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

export const getYBListings = async (page = 1): Promise<{ data: YBBoat[]; total: number; totalPages: number }> => {
  try {
    const res = await fetch(`/api/yachtbroker/vessel?page=${page}`, { cache: 'no-store' });
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

export const getAllYBListings = async (): Promise<YBBoat[]> => {
  try {
    const first = await getYBListings(1);
    if (first.totalPages <= 1) return first.data;
    const rest = await Promise.all(
      Array.from({ length: first.totalPages - 1 }, (_, i) => getYBListings(i + 2)),
    );
    return [first.data, ...rest.map((r) => r.data)].flat();
  } catch (error) {
    console.error('YB all listings error:', error);
    return [];
  }
};

export const applyYBFilters = (boats: YBBoat[], f: YBFilterParams): YBBoat[] =>
  boats.filter((b) => {
    if (f.make && !b.Manufacturer?.toLowerCase().includes(f.make.toLowerCase())) return false;
    if (f.model && !b.Model?.toLowerCase().includes(f.model.toLowerCase())) return false;
    if (f.boatType && b.Category?.toLowerCase() !== f.boatType.toLowerCase()) return false;
    if (f.yearFrom && (b.Year || 0) < f.yearFrom) return false;
    if (f.yearTo && (b.Year || 0) > f.yearTo) return false;
    if (f.priceMin != null && !b.PriceHidden && (b.PriceUSD || 0) < f.priceMin) return false;
    if (f.priceMax != null && !b.PriceHidden && (b.PriceUSD || 0) > f.priceMax) return false;
    if (f.lengthFrom && (b.DisplayLengthFeet || 0) < f.lengthFrom) return false;
    if (f.lengthTo && (b.DisplayLengthFeet || 0) > f.lengthTo) return false;
    if (f.beamFrom && (b.BeamFeet || 0) < f.beamFrom) return false;
    if (f.beamTo && (b.BeamFeet || 0) > f.beamTo) return false;
    if (f.numberOfEngines && (b.EngineQty || 0) < f.numberOfEngines) return false;
    if (f.numberOfCabins && (b.CabinCount || 0) < f.numberOfCabins) return false;
    if (f.numberOfHeads && (b.HeadCount || 0) < f.numberOfHeads) return false;
    return true;
  });

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
