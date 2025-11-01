import CustomBanner from '@/components/CustomComponents/CustomBanner';
import React from 'react';
import banner from '@/assets/blogs/banner.jpg';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import generalBlog from '@/assets/blogs/generalblog.jpg';
import FrontBlog from './_components/FrontBlog/FrontBlog';
import { demoBlogData } from '@/assets/demo-datas/demodata';
import BlogCard from '@/components/Blog/BlogCard';
import AdComponent from '@/components/CustomComponents/AdComponent';
import SmallAdComponent from '@/components/CustomComponents/SmallAdComponent';

const BlogPage = () => {
  return (
    <div>
      <CustomBanner banner={banner}>
        <h1 className="text-white text-xl md:text-4xl lg:text-6xl uppercase font-bold md:tracking-[5px] text-center leading-normal">
          Read Blog – Tips, Trends, <br />
          and Market Insights
        </h1>
      </CustomBanner>
      <CustomContainer>
        <div className="flex flex-col md:flex-row items-start gap-10 py-10">
          <div className="w-full md:w-3/4">
            <FrontBlog generalBlog={generalBlog} />
          </div>
          <div className="w-full md:w-1/4">
            <SmallAdComponent />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {demoBlogData.slice(0, 6).map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
        {demoBlogData.length > 6 && (
          <div className="flex justify-center mt-10">
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
              Load More
            </button>
          </div>
        )}
      </CustomContainer>
      <AdComponent />
    </div>
  );
};

export default BlogPage;
