import { democategoriesdata } from '@/assets/demo-datas/demodata';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import React from 'react';
import CategoryCard from './CategoryCard';

const PopularCategories = () => {
  return (
    <CustomContainer>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold">
        Browse From Popular Categories
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-10 my-10">
        {democategoriesdata.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </CustomContainer>
  );
};

export default PopularCategories;
