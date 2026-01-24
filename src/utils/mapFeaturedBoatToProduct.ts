import { InventoryBoat } from '@/services/boats/featuredBoats';
import { YachtProduct } from '@/types/product-types';

export const mapFeaturedBoatToProduct = (boat: InventoryBoat): YachtProduct => {
  // Parse price - remove currency and convert to number
  const parsePrice = (priceStr: string): number => {
    const numericPrice = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericPrice) || 0;
  };

  // Build location string
  const location = `${boat.BoatLocation.BoatCityName}, ${boat.BoatLocation.BoatStateCode}`;

  // Create product name
  const productName = `${boat.ModelYear} ${boat.MakeString} ${boat.Model}`;

  // Get image
  const imageUrl = boat.Images?.Uri || '/images/placeholder.jpg';

  return {
    id: boat.DocumentID,
    name: productName,
    image: imageUrl,
    images: boat.Images?.Uri ? [boat.Images.Uri] : [],
    location: location,
    brand_make: boat.MakeString,
    brand: boat.MakeString,
    model: boat.Model,
    buildYear: boat.ModelYear,
    built_year: boat.ModelYear,
    year: boat.ModelYear,
    price: parsePrice(boat.Price),
  };
};
