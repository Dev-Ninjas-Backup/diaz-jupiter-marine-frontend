'use client';

import React, { useEffect, useState } from 'react';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import FrontBlog from './_components/FrontBlog/FrontBlog';
import BlogCard from '@/components/Blog/BlogCard';
import AdComponent from '@/components/CustomComponents/AdComponent';
import SmallAdComponent from '@/components/CustomComponents/SmallAdComponent';

import banner from '@/assets/blogs/banner.jpg';
import generalBlog from '@/assets/blogs/generalblog.jpg';
import { getBlogs } from '@/services/blog/blog';

interface BlogCardData {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  readTime: string;
  publishDate: string;
  featuredImage: {
    url: string;
    alt: string;
  };
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogCardData[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getBlogs();

        const parsed: BlogCardData[] = data.map((item) => ({
          id: item.id,
          title: item.blogTitle,
          slug: item.sharedLink,
          readTime: `${item.readTime} min read`,
          publishDate: item.createdAt,
          excerpt: item.blogDescription.replace(/<[^>]+>/g, '').slice(0, 140),
          featuredImage: {
            url: item.blogImage?.url ?? '',
            alt: item.blogTitle,
          },
        }));

        setBlogs(parsed);
      } catch (error) {
        console.error('Blog page load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div>
      {/* Top Banner */}
      <CustomBanner banner={banner}>
        <h1 className="text-white text-xl md:text-4xl xl:text-5xl 2xl:text-6xl uppercase font-bold md:tracking-[5px] text-center leading-normal">
          Read Blog – Tips, Trends, <br />
          and Market Insights
        </h1>
      </CustomBanner>

      <CustomContainer>
        {/* Featured / Front section */}
        <div className="flex flex-col md:flex-row items-start gap-10 py-10">
          <div className="w-full md:w-3/4">
            <FrontBlog generalBlog={generalBlog} />
          </div>
          <div className="w-full md:w-1/4">
            <SmallAdComponent />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
          {!loading &&
            blogs
              .slice(0, visibleCount)
              .map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>

        {/* Load More */}
        {blogs.length > visibleCount && (
          <div className="flex justify-center my-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
            >
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
