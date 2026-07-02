export interface PartnerImage {
  id: string;
  filename: string;
  originalFilename: string;
  path: string;
  url: string;
  fileType: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerResponse {
  id: string;
  site: string;
  name: string;
  description: string | null;
  link: string | null;
  logoId: string | null;
  createdAt: string;
  updatedAt: string;
  logo: PartnerImage | null;
}

export const getPartners = async (
  site: string = 'JUPITER',
): Promise<PartnerResponse[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const url = site
      ? `${baseUrl}/partners?site=${site}`
      : `${baseUrl}/partners`;

    const res = await fetch(url, {
      method: 'GET',
      next: { tags: [`PARTNERS_${site}`] },
    });

    if (!res.ok) {
      console.error(`Partners fetch failed with status: ${res.status}`);
      return [];
    }

    const data: PartnerResponse[] = await res.json();
    return data || [];
  } catch (error: unknown) {
    console.error('Partners fetch error:', error);
    return [];
  }
};
