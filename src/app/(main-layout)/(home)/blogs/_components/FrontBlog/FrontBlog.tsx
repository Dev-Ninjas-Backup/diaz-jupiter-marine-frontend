import Image from 'next/image';
import Link from 'next/link';

interface BlogCardData {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  slug: string;
  readTime: string;
  publishDate: string;
  featuredImage: {
    url: string;
    alt: string;
  };
}

const FrontBlog = ({ blog }: { blog: BlogCardData }) => {
  const formattedDate = new Date(blog.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  console.log(blog.featuredImage.url);

  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 items-stretch gap-3 h-full w-full"
    >
      <div className=" col-span-4 h-full">
        <Image
          src={blog.featuredImage.url}
          alt={blog.featuredImage.alt || blog.title}
          width={800}
          height={550}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 md:p-8 col-span-8">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>{blog.readTime}</span>
          <span>{formattedDate}</span>
        </div>

        <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:leading-relaxed text-justify">
          {blog.title}
        </h1>

        <div
          className="text-base md:text-xl text-gray-500 md:leading-relaxed mb-4 text-justify prose prose-sm max-w-none overflow-hidden"
          style={{
            maxHeight: '120px',
            position: 'relative',
          }}
          dangerouslySetInnerHTML={{
            __html: blog.description,
          }}
        />

        <span className="text-primary hover:text-[#0052CC] font-medium text-base inline-block transition-colors">
          Read More
        </span>
      </div>
    </Link>
  );
};

export default FrontBlog;
