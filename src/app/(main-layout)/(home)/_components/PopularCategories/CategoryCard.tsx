import { CategoryImg } from '@/types/product-types-demo';
import Image from 'next/image';
import React from 'react';

const CategoryCard = ({ category }: { category: CategoryImg }) => {
  return (
    <div className="relative w-96 h-56 rounded-3xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
      <Image
        src={category.image}
        alt={category.name}
        height={400}
        width={400}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <h3 className="absolute inset-0 flex items-center justify-center text-white text-xl p-2">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
