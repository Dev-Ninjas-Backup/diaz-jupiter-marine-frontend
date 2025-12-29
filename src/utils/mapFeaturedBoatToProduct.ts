import { FeaturedBoat } from '@/services/boats/featuredBoats';
import { YachtProduct } from '@/types/product-types';

export const mapFeaturedBoatToProduct = (boat: FeaturedBoat): YachtProduct => {
  // Get primary image or first image
  const primaryImage =
    boat.images?.find((img) => img.isPrimary) || boat.images?.[0];
  const imageUrl =
    primaryImage?.file?.url || primaryImage?.url || '/images/placeholder.jpg';

  return {
    id: boat.id,
    name: boat.name,
    image: imageUrl,
    location: boat.location || 'Unknown',
    brand_make: boat.make || 'N/A',
    model: boat.model || 'N/A',
    built_year: boat.year,
    price: boat.price,
  };
};
