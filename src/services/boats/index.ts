export const getAllBoats = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/boats/all?source=inventory&fields=minimal&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        next: {
          tags: ['ALL_BOATS'],
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Boat Gets Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch boats');
  }
};

export const getBoatById = async (boatId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
    const res = await fetch(
      `${baseUrl}/boats/${boatId}/transform?source=inventory&fields=minimal`,
      {
        method: 'GET',
        next: {
          tags: ['BOAT_BY_ID', boatId],
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error('Boat Get By ID Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch boat by ID');
  }
};
