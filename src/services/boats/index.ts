// YachtBroker API - New Default
export const getAllBoats = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  try {
    const res = await fetch(`/api/yachtbroker/listings?page=${page}`, {
      method: 'GET',
      next: {
        tags: ['ALL_BOATS'],
      },
    });

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
    const res = await fetch(`/api/yachtbroker/listings/${boatId}`, {
      method: 'GET',
      next: { tags: ['BOAT_BY_ID', boatId] },
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const json = await res.json();
    const b = json['V-Data'];

    // Map raw YachtBroker object to BoatDetails shape
    const mapped = {
      id: String(b.ID),
      title: b.VesselName || `${b.Manufacturer || ''} ${b.Model || ''}`.trim() || 'Unknown Vessel',
      price: b.PriceUSD ? `$${Number(b.PriceUSD).toLocaleString()}` : 'Price on request',
      source: 'yachtbroker',
      description: b.Description || b.Comments || '',
      images: [
        ...(b.DisplayPicture?.Large ? [{ uri: b.DisplayPicture.Large }] : []),
        ...(b.DisplayPicture?.HD ? [{ uri: b.DisplayPicture.HD }] : []),
        ...((b.Pictures || []).map((p: { Large?: string; HD?: string }) => ({ uri: p.Large || p.HD || '' }))),
      ].filter((img) => img.uri),
      specifications: [
        { key: 'Make', value: b.Manufacturer || null },
        { key: 'Model', value: b.Model || null },
        { key: 'Year', value: b.Year || null },
        { key: 'Length', value: b.LOAFeet ? `${b.LOAFeet} ft` : null },
        { key: 'Beam', value: b.BeamFeet ? `${b.BeamFeet} ft` : null },
        { key: 'Fuel Type', value: b.FuelType || null },
        { key: 'Hull Material', value: b.HullMaterial || null },
        { key: 'Condition', value: b.Condition || null },
        { key: 'Type', value: b.Type || null },
        { key: 'Cabins', value: b.CabinCount ?? null },
      ].filter((s) => s.value !== null && s.value !== ''),
      engines: b.Engines || [],
      additionalInfo: [
        { key: 'City', value: b.City || null },
        { key: 'State', value: b.State || null },
        { key: 'Country', value: b.Country || null },
        { key: 'Location', value: [b.City, b.State, b.Country].filter(Boolean).join(', ') || null },
      ].filter((a) => a.value !== null && a.value !== ''),
    };

    return { success: true, message: 'Boat details fetched successfully', data: mapped };
  } catch (error: unknown) {
    console.error('Boat Get By ID Error:', error);
    if (error instanceof Error) throw error;
    throw new Error('Failed to fetch boat by ID');
  }
};
