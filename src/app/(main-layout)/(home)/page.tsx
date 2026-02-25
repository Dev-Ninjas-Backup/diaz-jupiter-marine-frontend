import AdComponent from '@/components/CustomComponents/AdComponent';
import Banner from './_components/Banner/Banner';
import DockSideBlog from './_components/DockSideBlog/DockSideBlog';
import FeaturedBrands from './_components/FeaturedBrands/FeaturedBrands';
import FeaturedItems from './_components/FeaturedItems/FeaturedItems';
// import FloridaItems from './_components/FloridaItems/FloridaItems';
import PopularCategories from './_components/PopularCategories/PopularCategories';
import WhyUs from './_components/WhyUs/WhyUs';

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedItems />
      {/* <FloridaItems /> */}
      <PopularCategories />
      <WhyUs />
      <FeaturedBrands />
      <DockSideBlog />
      <AdComponent />
    </div>
  );
};

// Revalidate every hour to keep content fresh while maintaining performance
export const revalidate = 3600;

export default HomePage;
