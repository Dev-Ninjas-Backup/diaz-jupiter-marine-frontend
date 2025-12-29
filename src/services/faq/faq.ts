export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQResponse {
  id: string;
  site: string;
  title: string;
  subtitle: string;
  questions: FAQQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface FAQApiResponse {
  success: boolean;
  message: string;
  data: FAQResponse;
}

export const getFAQ = async (site: string = 'JUPITER'): Promise<FAQResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/faq?site=${site}`, {
      method: 'GET',
      next: { tags: [`FAQ_${site}`] },
    });

    if (!res.ok) {
      console.error(`FAQ fetch failed with status: ${res.status}`);
      return null;
    }

    const response: FAQApiResponse = await res.json();
    return response.data || null;
  } catch (error: unknown) {
    console.error('FAQ fetch error:', error);
    return null;
  }
};

