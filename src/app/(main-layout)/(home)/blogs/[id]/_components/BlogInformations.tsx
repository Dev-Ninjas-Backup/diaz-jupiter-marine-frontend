'use client';

import React from 'react';

interface BlogInformationsProps {
  description: string; 
}

const BlogInformations = ({ description }: BlogInformationsProps) => {
  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};

export default BlogInformations;
