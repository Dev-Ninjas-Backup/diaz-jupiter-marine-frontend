export interface YachtProduct {
  id: string;
  name: string;
  image: string;
  location: string;
  brand_make: string;
  model: string;
  built_year?: number;
  buildYear?: number;
  price?: number;
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
