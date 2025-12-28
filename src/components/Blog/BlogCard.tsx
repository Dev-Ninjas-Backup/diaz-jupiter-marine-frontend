'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardData {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  featuredImage: {
    url: string;
    alt: string;
  };
}

interface BlogCardProps {
  blog: BlogCardData;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      {blog.featuredImage?.url && (
        <div className="relative w-full aspect-[4/2.7] overflow-hidden">
          <Image
            src={blog.featuredImage.url}
            alt={blog.featuredImage.alt || blog.title}
            height={500}
            width={900}
            className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span>{blog.readTime}</span>
          <span>|</span>
          <span>
            {new Date(blog.publishDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {blog.excerpt}
        </p>

        <Link
          href={`/blogs/${blog.id}`}
          className="text-primary font-semibold hover:text-cyan-600 transition-colors mt-auto"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
