export interface OurStoryImage {
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

export interface OurStoryResponse {
  id: string;
  site: string;
  title: string;
  description: string;
  image1Id: string;
  image2Id: string;
  image3Id: string;
  image4Id: string;
  image5Id: string;
  createdAt: string;
  updatedAt: string;
  image1: OurStoryImage;
  image2: OurStoryImage;
  image3: OurStoryImage;
  image4: OurStoryImage;
  image5: OurStoryImage;
}

export const getOurStory = async (
  site: string = 'JUPITER',
): Promise<OurStoryResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/aboutus/our-story?site=${site}`, {
      method: 'GET',
      next: { tags: [`OUR_STORY_${site}`] },
    });

    if (!res.ok) {
      console.error(`Our Story fetch failed with status: ${res.status}`);
      return null;
    }

    const data: OurStoryResponse = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Our Story fetch error:', error);
    return null;
  }
};

export interface WhatSetsUsApartImage {
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

export interface WhatSetsUsApartResponse {
  id: string;
  site: string;
  title: string;
  description: string;
  yearsOfYachtingExcellence: string;
  boatsSoldIn2024: string;
  listingsViewedMonthly: string;
  image1Id: string;
  image2Id: string;
  createdAt: string;
  updatedAt: string;
  image1: WhatSetsUsApartImage;
  image2: WhatSetsUsApartImage;
}

export const getWhatSetsUsApart = async (
  site: string = 'JUPITER',
): Promise<WhatSetsUsApartResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/aboutus/what-sets-us-apart?site=${site}`,
      {
        method: 'GET',
        next: { tags: [`WHAT_SETS_US_APART_${site}`] },
      },
    );

    if (!res.ok) {
      console.error(
        `What Sets Us Apart fetch failed with status: ${res.status}`,
      );
      return null;
    }

    const data: WhatSetsUsApartResponse = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('What Sets Us Apart fetch error:', error);
    return null;
  }
};

export interface MissionVisionImage {
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

export interface MissionVisionResponse {
  id: string;
  site: string;
  title: string;
  missionTitle: string;
  description: string;
  visionTitle: string;
  visionDescription: string;
  image1Id: string;
  image2Id: string;
  image3Id: string;
  createdAt: string;
  updatedAt: string;
  image1: MissionVisionImage;
  image2: MissionVisionImage;
  image3: MissionVisionImage;
}

export const getMissionVision = async (
  site: string = 'JUPITER',
): Promise<MissionVisionResponse | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/aboutus/mission-vision?site=${site}`, {
      method: 'GET',
      next: { tags: [`MISSION_VISION_${site}`] },
    });

    if (!res.ok) {
      console.error(`Mission Vision fetch failed with status: ${res.status}`);
      return null;
    }

    const data: MissionVisionResponse = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Mission Vision fetch error:', error);
    return null;
  }
};

export interface TeamMemberImage {
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

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  imageId: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image: TeamMemberImage;
}

export interface TeamMembersApiResponse {
  success: boolean;
  message: string;
  data: TeamMember[];
}

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(`${baseUrl}/our-team`, {
      method: 'GET',
      next: { tags: ['TEAM_MEMBERS'] },
    });

    if (!res.ok) {
      console.error(`Team members fetch failed with status: ${res.status}`);
      return [];
    }

    const response: TeamMembersApiResponse = await res.json();
    return response.data || [];
  } catch (error: unknown) {
    console.error('Team members fetch error:', error);
    return [];
  }
};
