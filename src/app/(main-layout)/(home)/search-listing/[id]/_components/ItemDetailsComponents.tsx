import { BoatDetails } from '@/types/product-types';
import ShareWIth from '@/components/shared/ShareWith/ShareWIth';
import AskMoreDetailsButton from '@/components/shared/AskMoreDetailsButton/AskMoreDetailsButton';
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
      <AskMoreDetailsButton boatId={boatDetails.id} boatTitle={boatDetails.title} productUrlPath="search-listing" />
      {boatDetails.videos && boatDetails.videos.length > 0 && (
        <ItemVideos videos={boatDetails.videos} />
      )}
      <ShowItemsLocation location={boatDetails.location} />
      <div className="px-1 md:px-4">
        <ShareWIth
          title={boatDetails.title}
          boatInfo={{
            title: boatDetails.title,
            price: boatDetails.price,
            make:
              boatDetails.specifications.find((s) => s.key === 'Make')?.value !=
              null
                ? String(
                    boatDetails.specifications.find((s) => s.key === 'Make')!
                      .value,
                  )
                : undefined,
            model:
              boatDetails.specifications.find((s) => s.key === 'Model')
                ?.value != null
                ? String(
                    boatDetails.specifications.find((s) => s.key === 'Model')!
                      .value,
                  )
                : undefined,
            year:
              boatDetails.specifications.find((s) => s.key === 'Year')?.value !=
              null
                ? String(
                    boatDetails.specifications.find((s) => s.key === 'Year')!
                      .value,
                  )
                : undefined,
            location:
              boatDetails.additionalInfo?.find((a) =>
                a.key.toLowerCase().includes('location'),
              )?.value != null
                ? String(
                    boatDetails.additionalInfo.find((a) =>
                      a.key.toLowerCase().includes('location'),
                    )!.value,
                  )
                : undefined,
          }}
        />
      </div>
    </div>
  );
};

export default ItemDetailsComponents;
