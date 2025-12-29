'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import BlogCard from '@/components/Blog/BlogCard';
import React, { useEffect, useState } from 'react';
import { getBlogs } from '@/services/blog/blog';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import Link from 'next/link';

type BlogUI = {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  featuredImage: {
    url: string;
    alt: string;
  };
};

const DockSideBlog = () => {
  const [blogs, setBlogs] = useState<BlogUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getBlogs();
        console.log(data);

        const parsed: BlogUI[] = data.map((item) => ({
          id: item.id,
          title: item.blogTitle,
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) return <LoadingSpinner message="Loading blogs..." />;

  return (
    <CustomContainer>
      <div className="my-20 space-y-10">
        {/* Header */}
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
            <Link
              href={'/blogs'}
              className="bg-secondary text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Read All
            </Link>
          </div>
        </div>

        {/* Blog Grid or No Data */}
        {blogs.length === 0 ? (
          <NoDataFound dataTitle="Blog data" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {blogs.slice(0, 4).map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </CustomContainer>
  );
};

export default DockSideBlog;
