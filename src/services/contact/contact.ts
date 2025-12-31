export interface ContactUsRequest {
  fullName: string;
  phone: string;
  email: string;
  boatInformation: string;
  comments: string;
}

export interface ContactUsResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export interface ContactOwnerRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: 'JUPITER' | 'FLORIDA';
  type: 'GLOBAL' | 'INDIVIDUAL_LISTING';
  listingId?: string;
  listingSource?: 'inventory' | 'custom';
}

export interface ContactOwnerResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

export const submitContactUs = async (
  data: ContactUsRequest,
): Promise<ContactUsResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/contact/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
      next: {
        tags: ['CONTACT_US'],
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();
    return {
      success: true,
      message: responseData.message || 'Message sent successfully!',
      data: responseData,
    };
  } catch (error: unknown) {
    console.error('Contact form submission error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit contact form');
  }
};

export const submitContactOwner = async (
  data: ContactOwnerRequest,
): Promise<ContactOwnerResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const responseData = await res.json();
    return {
      success: true,
      message: responseData.message || 'Message sent successfully!',
      data: responseData,
    };
  } catch (error: unknown) {
    console.error('Contact owner submission error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to submit contact form');
  }
};
