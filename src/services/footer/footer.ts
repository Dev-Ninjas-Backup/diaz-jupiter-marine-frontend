export interface FooterLink {
  url: string;
  label: string;
}

export interface SocialMediaLink {
  url: string;
  icon: string;
  platform: string;
}

export interface FooterResponse {
  id: string;
  site: string;
  companyName: string;
  companyDescription: string;
  quickLinks: FooterLink[];
  policyLinks: FooterLink[];
  phone: string;
  email: string;
  socialMediaLinks: SocialMediaLink[];
  copyrightText: string;
  createdAt: string;
  updatedAt: string;
}

export interface FooterApiResponse {
  success: boolean;
  message: string;
  data: FooterResponse;
}

export const getFooter = async (
  site: string = 'JUPITER',
): Promise<FooterResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/footer?site=${site}`, {
      method: 'GET',
      next: { tags: [`FOOTER_${site}`] },
    });

    if (!res.ok) {
      console.error(`Footer fetch failed with status: ${res.status}`);
      return null;
    }

    const response: FooterApiResponse = await res.json();
    return response.data || null;
  } catch (error: unknown) {
    console.error('Footer fetch error:', error);
    return null;
  }
};
