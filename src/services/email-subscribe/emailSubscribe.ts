export interface EmailSubscribeResponse {
  id: string;
  email: string;
  site: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmailSubscribeApiResponse {
  success: boolean;
  message: string;
  data: EmailSubscribeResponse;
}

export interface EmailSubscribeRequest {
  email: string;
  site?: string;
}

export const subscribeEmail = async (
  email: string,
  site: string = 'JUPITER',
): Promise<EmailSubscribeResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/email-subscribe/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        site,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Subscription failed with status: ${res.status}`,
      );
    }

    const response: EmailSubscribeApiResponse = await res.json();
    return response.data || null;
  } catch (error: unknown) {
    console.error('Email subscription error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to subscribe to newsletter');
  }
};
