// Inventory API Response Types
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

export const getFeaturedBoats = async (): Promise<InventoryBoat[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/boats/all?source=inventory&fields=minimal&page=1&limit=50`,
      {
        method: 'GET',
        next: { tags: [`FEATURED_BOATS`] },
      },
    );

    if (!res.ok) {
      console.error(`Featured boats fetch failed with status: ${res.status}`);
      return [];
    }

    const response: InventoryBoatsApiResponse = await res.json();

    // Return the data array directly
    if (response.success && Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error: unknown) {
    console.error('Featured boats fetch error:', error);
    return [];
  }
};
