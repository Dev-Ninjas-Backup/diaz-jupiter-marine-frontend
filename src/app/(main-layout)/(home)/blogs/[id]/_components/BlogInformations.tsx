'use client';

import { richTextClass, sanitizeHtmlContent } from '@/lib/utils';

interface BlogInformationsProps {
  description: string;
}

const BlogInformations = ({ description }: BlogInformationsProps) => {
  const cleanDescription = sanitizeHtmlContent(description);

  return (
    <div
      className={richTextClass}
      dangerouslySetInnerHTML={{ __html: cleanDescription }}
    />
  );
};

export default BlogInformations;
