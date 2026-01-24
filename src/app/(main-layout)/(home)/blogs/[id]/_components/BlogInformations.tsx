'use client';

import React from 'react';

interface BlogInformationsProps {
  description: string;
}

const BlogInformations = ({ description }: BlogInformationsProps) => {
  return (
    <div
      className="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-a:text-primary prose-img:rounded-lg prose-img:w-full wrap-break-word overflow-wrap-anywhere"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};

export default BlogInformations;
