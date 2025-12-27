export interface PrivacyPolicyResponse {
  id: string;
  site: string;
  privacyTitle: string;
  privacyDescription: string;
  createdAt: string;
  updatedAt: string;
}

export const getPrivacyPolicy = async (
  site: string = 'JUPITER',
): Promise<PrivacyPolicyResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/privacy-policy?site=${site}`, {
      method: 'GET',
      next: { tags: [`PRIVACY_POLICY_${site}`] },
    });

    if (!res.ok) {
      console.error(`Privacy policy fetch failed with status: ${res.status}`);
      return null;
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Privacy policy fetch error:', error);
    return null;
  }
};
