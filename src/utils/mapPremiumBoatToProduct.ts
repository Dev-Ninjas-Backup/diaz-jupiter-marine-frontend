import { PremiumBoatApi } from '@/services/boats/premiumBoats';
import { YachtProduct } from '@/types/product-types';

export const mapPremiumBoatToProduct = (boat: PremiumBoatApi): YachtProduct => {
  const priceNumber = Number(boat.Price?.replace(/[^\d]/g, ''));

  return {
    id: boat.DocumentID,
    name: boat.ListingTitle,
    image:
      boat.Images?.sort((a, b) => (a.Priority ?? 99) - (b.Priority ?? 99))?.[0]
        ?.Uri || '/images/placeholder.jpg',
    location: `${boat.BoatLocation?.BoatCityName ?? 'Unknown'}, ${
      boat.BoatLocation?.BoatStateCode ?? ''
    }`,
    brand_make: boat.MakeString ?? 'N/A',
    model: boat.Model ?? 'N/A',
    built_year: boat.ModelYear,
    price: isNaN(priceNumber) ? undefined : priceNumber,
  };
};
