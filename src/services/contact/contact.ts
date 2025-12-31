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

export interface ContactInfoWorkingHours {
  day: string;
  hours: string;
}

export interface ContactInfoSocialMedia {
  twitter?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
}

export interface ContactInfoBackgroundImage {
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

export interface ContactInfoResponse {
  id: string;
  address: string;
  email: string;
  phone: string;
  workingHours: ContactInfoWorkingHours[];
  socialMedia: ContactInfoSocialMedia;
  backgroundImageId: string;
  site: string;
  createdAt: string;
  updatedAt: string;
  backgroundImage: ContactInfoBackgroundImage;
}

export interface ContactInfoApiResponse {
  success: boolean;
  message: string;
  data: ContactInfoResponse;
}

export const getContactInfo = async (
  site: string = 'JUPITER',
): Promise<ContactInfoResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/contact/contact-info?site=${site}`, {
      method: 'GET',
      next: { tags: [`CONTACT_INFO_${site}`] },
    });

    if (!res.ok) {
      console.error(`Contact info fetch failed with status: ${res.status}`);
      return null;
    }

    const response: ContactInfoApiResponse = await res.json();
    return response.data || null;
  } catch (error: unknown) {
    console.error('Contact info fetch error:', error);
    return null;
  }
};
