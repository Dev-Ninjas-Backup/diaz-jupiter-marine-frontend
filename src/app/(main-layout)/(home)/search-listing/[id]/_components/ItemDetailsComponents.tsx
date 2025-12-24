import React from 'react';
import ItemDetailsGallery from './ItemsDetailsGallery';
import { demodata, demoSpecifications } from '@/assets/demo-datas/demodata';
import ItemSpecifications from './ItemSpecifications';
import ItemDescriptions from './ItemDescriptions';
import ShowItemsLocation from './ShowItemsLocation';

const ItemDetailsComponents = () => {
  const itemdetails = demodata[0];
  console.log('Item Details:', itemdetails);
  return (
    <div>
      <ItemDetailsGallery name={itemdetails.name} images={itemdetails.images} />
      <ItemSpecifications specifications={demoSpecifications} />
      <ItemDescriptions />
      <ShowItemsLocation />
    </div>
  );
};

export default ItemDetailsComponents;
