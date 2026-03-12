import { BoatDetails } from '@/types/product-types';
import React from 'react';
import ItemDescriptions from './ItemDescriptions';
import ItemDetailsGallery from './ItemsDetailsGallery';
import ItemSpecifications from './ItemSpecifications';
import ItemVideos from './ItemVideos';
import ShowItemsLocation from './ShowItemsLocation';

interface ItemDetailsComponentsProps {
  boatDetails: BoatDetails;
}

const ItemDetailsComponents: React.FC<ItemDetailsComponentsProps> = ({
  boatDetails,
}) => {
  // Transform images to the format expected by ItemDetailsGallery
  const images = boatDetails.images.map((img) => img.uri);

  // Combine specifications, engines info, and additional info for a complete view
  const allSpecifications = [
    ...boatDetails.specifications,
    ...boatDetails.additionalInfo.map((info) => ({
      key: info.key,
      value: info.value,
    })),
  ].filter((s) => {
    const v = String(s.value ?? '');
    return v && !v.includes('[') && !v.includes(']');
  });

  return (
    <div>
      <ItemDetailsGallery name={boatDetails.title} images={images} />
      <ItemSpecifications
        specifications={allSpecifications}
        engines={boatDetails.engines}
      />
      <ItemDescriptions description={boatDetails.description} />
      {boatDetails.videos && boatDetails.videos.length > 0 && (
        <ItemVideos videos={boatDetails.videos} />
      )}
      <ShowItemsLocation title={boatDetails.title} />
    </div>
  );
};

export default ItemDetailsComponents;
