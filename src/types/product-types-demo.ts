import { StaticImageData } from 'next/image';

export interface YachtProduct {
  brand_make: string;
  model: string;
  built_year: number;
  length: string;
  number_of_engine: number;
  class: string;
  material: string;
  number_of_cabin: number;
  number_of_heads: number;
  beam_size: string;
  fuel_type: string;
  max_draft: string;
  name: string;
  location: string;
  condition: string;
  price?: number;
  images: (string | StaticImageData)[];
  image: string | StaticImageData;
  id?: string; // Added for API data
  link?: string; // Added for API data
  description?: string; // Added for API data
}

// API Response format from search
export interface ApiBoatEngine {
  Make?: string;
  Model?: string;
  DriveTransmissionDescription?: string;
  Fuel?: string;
  EnginePower?: string;
  Type?: string;
  Year?: number;
  Hours?: number;
}

export interface ApiBoatLocation {
  BoatCityName?: string;
  BoatCountryID?: string;
  BoatStateCode?: string;
}

export interface ApiBoatImage {
  Priority?: string;
  Caption?: string;
  Uri?: string;
  LastModifiedDateTime?: string;
}

export interface ApiBoatData {
  Source?: string;
  DocumentID: string;
  BeamMeasure?: string;
  TotalEnginePowerQuantity?: string;
  Price: string | number; // Can be "114900.00 USD" or number
  BoatLocation?: ApiBoatLocation;
  Model: string;
  Engines?: ApiBoatEngine[];
  ModelYear: number;
  MakeString: string;
  LengthOverall?: string;
  NominalLength?: string;
  GeneralBoatDescription?: string[];
  AdditionalDetailDescription?: string[] | null;
  Images?: ApiBoatImage;
  Link?: string;
}

// New format from filter API response
export interface FilterApiBoatData {
  document_id: string;
  make: string;
  model: string;
  model_year: number;
  price: number;
  location: {
    BoatCityName?: string;
    BoatCountryID?: string;
    BoatStateCode?: string;
  };
  images: {
    Priority?: string;
    Caption?: string;
    Uri?: string;
    LastModifiedDateTime?: string;
  };
  link: string;
}

// Filter API Response wrapper
export interface FilterApiResponse {
  count: number;
  results: FilterApiBoatData[];
}

// Helper function to convert API data to YachtProduct
export function convertApiDataToYachtProduct(
  apiData: ApiBoatData,
): YachtProduct {
  const location = apiData.BoatLocation
    ? `${apiData.BoatLocation.BoatCityName || ''}, ${apiData.BoatLocation.BoatStateCode || ''}`
    : 'Location not specified';

  // Parse price - handle both "114900.00 USD" and number formats
  let price: number | undefined;
  if (typeof apiData.Price === 'string') {
    // Extract number from string like "114900.00 USD"
    const priceMatch = apiData.Price.match(/([\d,.]+)/);
    if (priceMatch) {
      price = parseFloat(priceMatch[1].replace(/,/g, ''));
    }
  } else if (typeof apiData.Price === 'number') {
    price = apiData.Price;
  }

  return {
    id: apiData.DocumentID,
    brand_make: apiData.MakeString || 'Unknown Make',
    model: apiData.Model || 'Unknown Model',
    built_year: apiData.ModelYear || 0,
    length: apiData.LengthOverall || apiData.NominalLength || 'N/A',
    number_of_engine: apiData.Engines?.length || 0,
    class: 'Power', // Default value
    material: 'Fiberglass', // Default value
    number_of_cabin: 0, // Not in API response
    number_of_heads: 0, // Not in API response
    beam_size: apiData.BeamMeasure || 'N/A',
    fuel_type: apiData.Engines?.[0]?.Fuel?.toLowerCase() || 'Not specified',
    max_draft: 'N/A',
    name: `${apiData.MakeString} ${apiData.Model}`,
    location: location.trim(),
    condition: 'Used',
    price: price,
    images: apiData.Images?.Uri ? [apiData.Images.Uri] : [],
    image: apiData.Images?.Uri || '/placeholder-boat.jpg',
    link: apiData.Link || `/search-listing/${apiData.DocumentID}`,
    description:
      apiData.GeneralBoatDescription?.[0] || 'No description available',
  };
}

// Helper function to convert Filter API data to YachtProduct
export function convertFilterApiDataToYachtProduct(
  filterData: FilterApiBoatData,
): YachtProduct {
  const location = filterData.location
    ? `${filterData.location.BoatCityName || ''}, ${filterData.location.BoatStateCode || ''}`
    : 'Location not specified';

  return {
    id: filterData.document_id,
    brand_make: filterData.make || 'Unknown Make',
    model: filterData.model || 'Unknown Model',
    built_year: filterData.model_year || 0,
    length: 'N/A', // Not in filter API response
    number_of_engine: 0, // Not in filter API response
    class: 'Power', // Default value
    material: 'Fiberglass', // Default value
    number_of_cabin: 0, // Not in API response
    number_of_heads: 0, // Not in API response
    beam_size: 'N/A', // Not in filter API response
    fuel_type: 'Not specified', // Not in filter API response
    max_draft: 'N/A',
    name: `${filterData.make} ${filterData.model}`,
    location: location.trim(),
    condition: 'Used',
    price: filterData.price,
    images: filterData.images?.Uri ? [filterData.images.Uri] : [],
    image: filterData.images?.Uri || '/placeholder-boat.jpg',
    link: filterData.link || `/search-listing/${filterData.document_id}`,
    description: filterData.images?.Caption || 'No description available',
  };
}

export interface CategoryImg {
  id: number;
  name: string;
  image: string | StaticImageData;
}
