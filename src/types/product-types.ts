export interface YachtProduct {
  id: string;
  name: string;
  image?: string;
  images?: string[];
  location: string;
  brand_make?: string;
  brand?: string;
  model: string;
  built_year?: number;
  year?: number;
  buildYear?: number;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  location: string;
  images: string[];
  description: string;
  specifications: {
    length: string;
    beam: string;
    year: string;
    fuelCapacity: string;
    engine: string;
    enginePower: string;
    engineHours: string;
  };
  features: string[];
  condition: 'new' | 'used';
  status: 'available' | 'sold' | 'pending';
  listingDate: string;
  lastModified: string;
}

export interface BoatSpecification {
  key: string;
  value: string | number | boolean | null;
}

export interface BoatImage {
  uri: string;
}

export interface BoatEngine {
  [key: string]: string | number | boolean | null | undefined;
}

export interface BoatAdditionalInfo {
  key: string;
  value: string | number | boolean | null;
}

export interface BoatDetails {
  id: string;
  title: string;
  price: string;
  source: string;
  specifications: BoatSpecification[];
  description: string;
  images: BoatImage[];
  engines: BoatEngine[];
  additionalInfo: BoatAdditionalInfo[];
}

export interface BoatDetailsResponse {
  success: boolean;
  message: string;
  data: BoatDetails;
}
