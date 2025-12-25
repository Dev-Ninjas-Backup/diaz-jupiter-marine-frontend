
export interface PremiumBoatApi {
  DocumentID: string;
  ListingTitle: string;
  Price: string;
  BoatLocation?: {
    BoatCityName?: string;
    BoatStateCode?: string;
  };
  MakeString?: string;
  Model?: string;
  ModelYear?: number;
  Images?: {
    Uri: string;
    Priority?: number;
  }[];
}

interface PremiumBoatsResponse {
  success: boolean;
  message: string;
  data: PremiumBoatApi[];
}

export const getFloridaPremiumBoats = async (
  page = 1,
  limit = 10,
): Promise<PremiumBoatApi[]> => {
     const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const res = await fetch(
    `${baseUrl}/boats/premium-deals/florida?page=${page}&limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch premium boats (${res.status})`);
  }

  const json: PremiumBoatsResponse = await res.json();
  return json.data ?? [];
};
