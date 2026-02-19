// YachtBroker API - New Default
export const getAllBoats = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await fetch(
      `/api/yachtbroker/listings?page=${page}`,
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
    return {
      success: true,
      data: data['V-Data'] || [],
      pagination: {
        current_page: data.current_page,
        per_page: data.per_page,
        total: data.total,
        last_page: data.last_page,
      },
    };
  } catch (error: unknown) {
    console.error('Boat Gets Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch boats');
  }
};

// YachtBroker API - Get Single Boat
export const getBoatById = async (boatId: string) => {
  try {
    const res = await fetch(
      `/api/yachtbroker/listings/${boatId}`,
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
    return {
      success: true,
      message: 'Boat details fetched successfully',
      data: data['V-Data'] || data,
    };
  } catch (error: unknown) {
    console.error('Boat Get By ID Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch boat by ID');
  }
};
