import { BoatsComBoat } from '@/services/boats/featuredBoats';
import { Product } from '@/types/product-types';

export const mapInventoryBoatToProduct = (boat: BoatsComBoat): Product => {
  const parsePrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  };

  const parseLength = (lengthStr?: string): string => {
    if (!lengthStr) return 'N/A';
    const match = lengthStr.match(/[\d.]+/);
    return match ? match[0] : lengthStr;
  };

  const location = boat.BoatLocation
    ? `${boat.BoatLocation.BoatCityName || ''}, ${boat.BoatLocation.BoatStateCode || ''}`.trim()
    : 'N/A';

  const productName =
    `${boat.ModelYear || ''} ${boat.MakeString || ''} ${boat.Model || ''}`.trim();

  return {
    id: boat.DocumentID,
    name: productName,
    brand: boat.MakeString || '',
    model: boat.Model || '',
    year: boat.ModelYear || 0,
    price: parsePrice(boat.Price),
    originalPrice:
      boat.OriginalPrice !== boat.Price
        ? parsePrice(boat.OriginalPrice)
        : undefined,
    location,
    images: boat.Images?.[0]?.Uri ? [boat.Images[0].Uri] : [],
    description:
      boat.GeneralBoatDescription?.[0]?.replace(/<[^>]*>/g, ' ').trim() || '',
    specifications: {
      length: parseLength(boat.NominalLength),
      beam: boat.BeamMeasure?.replace(/[^0-9.]/g, '') || 'N/A',
      year: boat.ModelYear?.toString() || 'N/A',
      fuelCapacity: 'N/A',
      engine: boat.TotalEnginePowerQuantity || 'N/A',
      enginePower: boat.TotalEnginePowerQuantity || 'N/A',
      engineHours: 'N/A',
    },
    features: [boat.ListingTitle || '', boat.BoatHullMaterialCode || ''].filter(
      Boolean,
    ),
    condition: (boat.SaleClassCode?.toLowerCase() === 'new'
      ? 'new'
      : 'used') as 'new' | 'used',
    status: 'available' as const,
    listingDate: boat.ItemReceivedDate || '',
    lastModified: boat.LastModificationDate || '',
  };
};

export const mapInventoryBoatsToProducts = (
  boats: BoatsComBoat[],
): Product[] => {
  return boats.map(mapInventoryBoatToProduct);
};
