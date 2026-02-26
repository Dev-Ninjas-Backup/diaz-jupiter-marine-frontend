// Boats.com API Response Types
export interface BoatsComBoat {
  DocumentID: string;
  MakeString?: string;
  ModelYear?: number;
  Model?: string;
  Price?: string;
  OriginalPrice?: string;
  BoatLocation?: {
    BoatCityName?: string;
    BoatStateCode?: string;
  };
  NominalLength?: string;
  BeamMeasure?: string;
  BoatHullMaterialCode?: string;
  SaleClassCode?: string;
  LastModificationDate?: string;
  ItemReceivedDate?: string;
  Images?: Array<{ Uri?: string; Priority?: string }>;
  GeneralBoatDescription?: string[];
  ListingTitle?: string;
  TotalEnginePowerQuantity?: string;
  NumberOfEngines?: number;
  Videos?: {
    url?: string[];
    title?: string[];
    thumbnailUrl?: string[];
  };
  EmbeddedVideo?: string[];
}

export interface BoatsComApiResponse {
  numResults: number;
  results: BoatsComBoat[];
}

// Legacy types kept for backward compatibility
export interface InventoryBoatEngine {
  Make?: string;
  Model?: string;
  Fuel?: string;
  EnginePower?: string;
  Type?: string;
  Year?: number;
  Hours?: number;
  DriveTransmissionDescription?: string;
  PropellerType?: string;
  BoatEngineLocationCode?: string;
}

export interface InventoryBoatLocation {
  BoatCityName: string;
  BoatCountryID: string;
  BoatStateCode: string;
}

export interface InventoryBoatImages {
  Priority: string;
  Caption: string;
  Uri: string;
  LastModifiedDateTime: string;
}

export interface InventoryBoat {
  Source: string;
  DocumentID: string;
  LastModificationDate: string;
  ItemReceivedDate: string;
  OriginalPrice: string;
  Price: string;
  BoatLocation: InventoryBoatLocation;
  MakeString: string;
  ModelYear: number;
  Model: string;
  BeamMeasure?: string;
  FuelTankCountNumeric?: number;
  FuelTankCapacityMeasure?: string;
  TotalEnginePowerQuantity?: string;
  NominalLength?: string;
  LengthOverall?: string;
  ListingTitle?: string;
  Engines?: InventoryBoatEngine[];
  GeneralBoatDescription?: string[];
  AdditionalDetailDescription?: string[];
  Images?: InventoryBoatImages;
}

export interface InventoryBoatsApiResponse {
  success: boolean;
  message: string;
  data: InventoryBoat[];
  metadata: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export const getFeaturedBoats = async (): Promise<BoatsComBoat[]> => {
  try {
    const res = await fetch('/api/boats-com?status=Active&sort=LastModificationDate|desc', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Featured boats fetch failed with status: ${res.status}`);
      return [];
    }

    const response: BoatsComApiResponse = await res.json();
    return response.results || [];
  } catch (error: unknown) {
    console.error('Featured boats fetch error:', error);
    return [];
  }
};
