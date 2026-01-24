import { InventoryBoat } from '@/services/boats/featuredBoats';
import { Product } from '@/types/product-types';

export const mapInventoryBoatToProduct = (boat: InventoryBoat): Product => {
  // Parse price - remove currency and convert to number
  const parsePrice = (priceStr: string): number => {
    const numericPrice = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericPrice) || 0;
  };

  // Extract just the numeric length value
  const parseLength = (lengthStr?: string): string => {
    if (!lengthStr) return 'N/A';
    const match = lengthStr.match(/[\d.]+/);
    return match ? match[0] : lengthStr;
  };

  // Build location string
  const location = `${boat.BoatLocation.BoatCityName}, ${boat.BoatLocation.BoatStateCode}`;

  // Get engine info
  const engineInfo = boat.Engines?.[0];
  const engineCount = boat.Engines?.length || 0;

  // Create product name
  const productName = `${boat.ModelYear} ${boat.MakeString} ${boat.Model}`;

  // Get first description (clean HTML)
  const getCleanDescription = (): string => {
    if (
      !boat.GeneralBoatDescription ||
      boat.GeneralBoatDescription.length === 0
    ) {
      return '';
    }
    // Remove HTML tags and take first 200 chars
    const htmlString = boat.GeneralBoatDescription[0];
    const stripped = htmlString
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return stripped.substring(0, 200) + (stripped.length > 200 ? '...' : '');
  };

  return {
    id: boat.DocumentID,
    name: productName,
    brand: boat.MakeString,
    model: boat.Model,
    year: boat.ModelYear,
    price: parsePrice(boat.Price),
    originalPrice:
      boat.OriginalPrice !== boat.Price
        ? parsePrice(boat.OriginalPrice)
        : undefined,
    location: location,
    images: boat.Images?.Uri ? [boat.Images.Uri] : [],
    description: getCleanDescription(),
    specifications: {
      length: parseLength(boat.LengthOverall || boat.NominalLength),
      beam: boat.BeamMeasure?.replace(/[^0-9.]/g, '') || 'N/A',
      year: boat.ModelYear.toString(),
      fuelCapacity: boat.FuelTankCapacityMeasure?.split('|')[0] || 'N/A',
      engine:
        engineInfo?.Make && engineInfo?.Model
          ? `${engineCount > 1 ? `(${engineCount}) ` : ''}${engineInfo.Make} ${engineInfo.Model}`
          : boat.TotalEnginePowerQuantity || 'N/A',
      enginePower: boat.TotalEnginePowerQuantity || 'N/A',
      engineHours: engineInfo?.Hours?.toString() || 'N/A',
    },
    features: [
      boat.ListingTitle || '',
      engineInfo?.Type || '',
      boat.BeamMeasure ? `Beam: ${boat.BeamMeasure}` : '',
      boat.FuelTankCapacityMeasure
        ? `Fuel: ${boat.FuelTankCapacityMeasure.replace('|', ' ')}`
        : '',
    ].filter(Boolean),
    condition: 'used' as const,
    status: 'available' as const,
    listingDate: boat.ItemReceivedDate,
    lastModified: boat.LastModificationDate,
  };
};

export const mapInventoryBoatsToProducts = (
  boats: InventoryBoat[],
): Product[] => {
  return boats.map(mapInventoryBoatToProduct);
};
