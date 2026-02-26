// Boats.com API - All Listings with server-side pagination
export const getAllBoats = async ({ page = 1, limit = 9 }: { page?: number; limit?: number } = {}) => {
  try {
    const start = (page - 1) * limit;
    const res = await fetch(
      `/api/boats-com?status=Active&sort=LastModificationDate|desc&rows=${limit}&start=${start}`,
      { method: 'GET', next: { tags: ['ALL_BOATS'] } },
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    const total = data.numResults || 0;
    return {
      success: true,
      data: data.results || [],
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error: unknown) {
    console.error('Boat Gets Error:', error);
    if (error instanceof Error) throw error;
    throw new Error('Failed to fetch boats');
  }
};

// YachtBroker API - Get Single Boat
export const getBoatById = async (boatId: string) => {
  try {
    const res = await fetch(`/api/boats-com/${boatId}`, {
      method: 'GET',
      next: { tags: ['BOAT_BY_ID', boatId] },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const json = await res.json();
    const b = json.data;

    const parsePrice = (priceStr?: string): string => {
      if (!priceStr) return 'Price on request';
      const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      return num ? `$${num.toLocaleString()}` : 'Price on request';
    };

    const mapped = {
      id: String(b.DocumentID),
      title:
        b.ListingTitle ||
        `${b.ModelYear || ''} ${b.MakeString || ''} ${b.Model || ''}`.trim() ||
        'Unknown Vessel',
      price: parsePrice(b.Price),
      source: 'boats.com',
      description:
        (b.GeneralBoatDescription || []).join(' ').replace(/<[^>]*>/g, ' ').trim(),
      images: (b.Images || []).map((img: { Uri?: string }) => ({ uri: img.Uri || '' })).filter((img: { uri: string }) => img.uri),
      specifications: [
        { key: 'Make', value: b.MakeString || null },
        { key: 'Model', value: b.Model || null },
        { key: 'Year', value: b.ModelYear || null },
        { key: 'Length', value: b.NominalLength || null },
        { key: 'Beam', value: b.BeamMeasure || null },
        { key: 'Hull Material', value: b.BoatHullMaterialCode || null },
        { key: 'Condition', value: b.SaleClassCode || null },
        { key: 'Engines', value: b.NumberOfEngines ?? null },
      ].filter((s) => s.value !== null && s.value !== ''),
      engines: [],
      videos: (b.Videos?.url || []).map((url: string, i: number) => ({
        url,
        title: b.Videos?.title?.[i],
        thumbnailUrl: b.Videos?.thumbnailUrl?.[i],
      })).filter((v: { url: string }) => v.url),
      additionalInfo: [
        { key: 'City', value: b.BoatLocation?.BoatCityName || null },
        { key: 'State', value: b.BoatLocation?.BoatStateCode || null },
        {
          key: 'Location',
          value:
            [b.BoatLocation?.BoatCityName, b.BoatLocation?.BoatStateCode]
              .filter(Boolean)
              .join(', ') || null,
        },
      ].filter((a) => a.value !== null && a.value !== ''),
    };

    return {
      success: true,
      message: 'Boat details fetched successfully',
      data: mapped,
    };
  } catch (error: unknown) {
    console.error('Boat Get By ID Error:', error);
    if (error instanceof Error) throw error;
    throw new Error('Failed to fetch boat by ID');
  }
};
