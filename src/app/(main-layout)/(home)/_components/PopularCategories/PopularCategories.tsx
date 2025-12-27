'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { getCategories } from '@/services/category/category';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';

type CategoryUI = {
  id: string;
  name: string;
  image: string;
};

const PopularCategories = () => {
  const [categories, setCategories] = useState<CategoryUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        const parsed: CategoryUI[] = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.image?.url ?? '',
        }));

        setCategories(parsed);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (categories.length === 0)
    return <NoDataFound dataTitle="Popular Category data" />;

  return (
    <CustomContainer>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold">
        Browse From Popular Categories
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-10 my-10">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </CustomContainer>
  );
};

export default PopularCategories;
