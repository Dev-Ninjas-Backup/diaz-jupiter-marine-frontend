import React from 'react';
import Banner from './_components/Banner/Banner';
import PopularCategories from './_components/PopularCategories/PopularCategories';
// import WhyUs from './_components/WhyUs/WhyUs';
import FeaturedBrands from './_components/FeaturedBrands/FeaturedBrands';
import DockSideBlog from './_components/DockSideBlog/DockSideBlog';
import FeaturedItems from './_components/FeaturedItems/FeaturedItems';
import FloridaItems from './_components/FloridaItems/FloridaItems';
import AdComponent from '@/components/CustomComponents/AdComponent';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedItems />
      <FloridaItems />
      <PopularCategories />
      {/* <WhyUs /> */}
      <FeaturedBrands />
      <DockSideBlog />
      <AdComponent />
    </div>
  );
};
export default HomePage;
