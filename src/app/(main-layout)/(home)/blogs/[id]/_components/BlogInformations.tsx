'use client';

import { richTextClass } from '@/lib/utils';

interface BlogInformationsProps {
  description: string;
}

const BlogInformations = ({ description }: BlogInformationsProps) => {
  return (
    <div
      className={richTextClass}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};

export default BlogInformations;
