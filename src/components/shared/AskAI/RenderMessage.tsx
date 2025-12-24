import Image from 'next/image';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Custom components for ReactMarkdown
const markdownComponents: Components = {
  // Custom paragraph rendering
  p: ({ children }) => (
    <p className="mb-3 text-sm text-gray-700 leading-relaxed">{children}</p>
  ),

  // Custom heading rendering
  h3: ({ children }) => (
    <h3 className="font-bold text-gray-900 mt-5 mb-3 text-lg border-b border-gray-200 pb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-bold text-gray-900 mt-4 mb-2 text-base">{children}</h4>
  ),

  // Custom link rendering
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#004DAC] hover:underline font-medium inline-flex items-center gap-1"
    >
      {children}
    </a>
  ),

  // Custom list rendering
  ul: ({ children }) => (
    <ul className="space-y-2 ml-5 my-3 list-disc list-outside">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="text-sm text-gray-700 leading-relaxed pl-1">{children}</li>
  ),

  // Ordered list rendering
  ol: ({ children }) => <ol className="space-y-4 my-4">{children}</ol>,

  // Custom strong/bold rendering
  strong: ({ children }) => (
    <strong className="font-bold text-gray-900">{children}</strong>
  ),

  // Custom image rendering
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;

    return (
      <div className="my-4 rounded-lg overflow-hidden shadow-md">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={500}
          className="w-full h-auto object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
    );
  },
};

export const renderMessage = (message: string) => {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {message}
      </ReactMarkdown>
    </div>
  );
};
