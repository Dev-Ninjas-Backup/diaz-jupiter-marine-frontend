'use client';

import BlogCard from '@/components/Blog/BlogCard';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import SmallAdComponent from '@/components/CustomComponents/SmallAdComponent';
import ShareWIth from '@/components/shared/ShareWith/ShareWIth';
import { BlogDetails, getBlogDetails, getBlogs } from '@/services/blog/blog';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlogInformations from './_components/BlogInformations';

/* ---------- types ---------- */

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

/* ---------- component ---------- */

const BlogDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const blogId = params.id;

  const [blog, setBlog] = useState<BlogDetails | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;

    const loadData = async () => {
      try {
        //  blog details
        const blogDetails = await getBlogDetails(blogId);
        setBlog(blogDetails);

        // related blogs
        const blogs = await getBlogs();

        const related = blogs
          .filter(
            (b) => b.postStatus === blogDetails.postStatus && b.id !== blogId,
          )
          .slice(0, 4)
          .map((item) => ({
            id: item.id,
            title: item.blogTitle,
            readTime: `${item.readTime} min read`,
            publishDate: item.createdAt,
            excerpt: item.blogDescription.replace(/<[^>]+>/g, '').slice(0, 120),
            featuredImage: {
              url: item.blogImage?.url ?? '',
              alt: item.blogTitle,
            },
          }));

        setRelatedBlogs(related);
      } catch (error) {
        console.error('Blog details load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [blogId]);

  if (loading) {
    return <div className="min-h-[300px]" />;
  }

  if (!blog) return null;

  return (
    <div>
      <GradientBannerCustom>
        <h1 className="text-left text-white pt-10 md:pt-14 font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight">
          {blog.blogTitle}
        </h1>
      </GradientBannerCustom>

      <CustomContainer>
        <div className="flex flex-col md:flex-row items-start gap-10 py-10">
          <div className="w-full md:w-3/4 overflow-hidden">
            {/* Blog Thumbnail */}
            {blog.blogImage?.url && (
              <div className="mb-8 w-full">
                <div className="relative w-full h-[250px] sm:h-[400px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={blog.blogImage.url}
                    alt={blog.blogTitle}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            <BlogInformations description={blog.blogDescription} />
            <div className="mt-6">
              <ShareWIth />
            </div>
          </div>

          <div className="w-full md:w-1/4 shrink-0">
            <SmallAdComponent />
          </div>
        </div>

        {relatedBlogs.length > 0 && (
          <div className="py-10 w-full">
            <h1 className="text-xl md:text-2xl font-semibold py-5">
              Read More Related Blogs
            </h1>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
              {relatedBlogs.map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>
          </div>
        )}
      </CustomContainer>

      <AdComponent />
    </div>
  );
};

export default BlogDetailsPage;
