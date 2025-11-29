/**
 * Search Query Type Definitions
 *
 * Types for search queries and filters used in AI chatbot integration
 */

export interface SearchFilters {
  boat_type: string | null;
  make: string | null;
  model: string | null;
  build_year_min: number | null;
  build_year_max: number | null;
  price_min: number | null;
  price_max: number | null;
  length_min: number | null;
  length_max: number | null;
  beam_min: number | null;
  beam_max: number | null;
  number_of_engine: number | null;
  number_of_cabin: number | null;
  number_of_heads: number | null;
  additional_unit: string | null;
}

export interface SearchQueryData {
  query: string | null;
  filters: SearchFilters;
}
