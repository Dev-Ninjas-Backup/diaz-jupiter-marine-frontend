import React from 'react';

interface ContentRendererProps {
  content: string;
  className?: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ 
  content, 
  className = '' 
}) => {
  return (
    <div
      className={`prose prose-slate max-w-none 
        prose-headings:font-bold 
        prose-h1:text-4xl prose-h1:mb-4
        prose-h2:text-3xl prose-h2:mb-3
        prose-h3:text-2xl prose-h3:mb-3
        prose-h4:text-xl prose-h4:mb-2
        prose-p:text-base prose-p:mb-4 prose-p:leading-7
        prose-li:text-base prose-li:mb-2
        prose-strong:font-bold prose-strong:text-gray-900
        prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
        prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
        prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
        prose-img:rounded-lg prose-img:shadow-md
        prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ContentRenderer;