import { FeaturedBoat } from '@/services/boats/featuredBoats';
import { YachtProduct } from '@/types/product-types';

export const mapFeaturedBoatToProduct = (boat: FeaturedBoat): YachtProduct => {
  // Get cover image (imageType === 'COVER') or first image
  const coverImage = boat.images?.find((img) => img.imageType === 'COVER');
  const primaryImage = coverImage || boat.images?.[0];
  const imageUrl = primaryImage?.file?.url || '/images/placeholder.jpg';

  // Construct location from city, state, zip
  const locationParts = [boat.city, boat.state, boat.zip]
    .filter(Boolean)
    .join(', ');
  const location = locationParts || 'Unknown';

  return {
    id: boat.id,
    name: boat.name,
    image: imageUrl,
    location: location,
    brand_make: boat.make || 'N/A',
    model: boat.model || 'N/A',
    buildYear: boat.buildYear,
    built_year: boat.buildYear, // Keep both for compatibility
    price: boat.price,
  };
};
