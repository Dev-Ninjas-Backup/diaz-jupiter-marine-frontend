import { demoBlogData } from '@/assets/demo-datas/demodata';
import BlogCard from '@/components/Blog/BlogCard';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import React from 'react';

const DockSideBlog = () => {
  return (
    <CustomContainer>
      <div className="my-20 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="text-left space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Read From the Dockside Blog
            </h1>
            <p className="text-base sm:text-lg text-secondary-txt">
              Expert tips, market insights, and stories to help you buy, sell,
              and enjoy your yacht life in Florida.
            </p>
          </div>
          <div className="flex items-center gap-3 lg:ml-6">
            <button className="bg-secondary text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              Read All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {demoBlogData.slice(0, 4).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </CustomContainer>
  );
};

export default DockSideBlog;
