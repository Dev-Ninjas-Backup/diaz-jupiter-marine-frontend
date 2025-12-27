export interface TermsOfServiceResponse {
  id: string;
  site: string;
  termsTitle: string;
  termsDescription: string;
  createdAt: string;
  updatedAt: string;
}

export const getTermsOfService = async (
  site: string = 'JUPITER',
): Promise<TermsOfServiceResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/terms-of-service?site=${site}`, {
      method: 'GET',
      next: { tags: [`TERMS_OF_SERVICE_${site}`] },
    });

    if (!res.ok) {
      console.error(`Terms of service fetch failed with status: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Terms of service fetch error:', error);
    return null;
  }
};

