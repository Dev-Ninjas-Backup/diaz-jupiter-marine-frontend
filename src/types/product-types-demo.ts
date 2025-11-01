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
  price: number;
  images: (string | StaticImageData)[];
  image: string | StaticImageData;
}

export interface CategoryImg {
  id: number;
  name: string;
  image: string | StaticImageData;
}
