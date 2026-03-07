import BlogCard from '@/components/Blog/BlogCard';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import SmallAdComponent from '@/components/CustomComponents/SmallAdComponent';
import ShareWIth from '@/components/shared/ShareWith/ShareWIth';
import { BlogDetails, getBlogDetails, getBlogs } from '@/services/blog/blog';
import { Metadata } from 'next';
import Image from 'next/image';
import BlogInformations from './_components/BlogInformations';

/* ---------- metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const blog = await getBlogDetails(id);
    const description = blog.blogDescription.slice(0, 160);

    return {
      title: `${blog.blogTitle} | Jupiter Marine Sales`,
      description,
      openGraph: {
        title: blog.blogTitle,
        description,
        images: blog.blogImage?.url ? [blog.blogImage.url] : [],
        type: 'article',
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.blogTitle,
        description,
        images: blog.blogImage?.url ? [blog.blogImage.url] : [],
      },
    };
  } catch {
    return {
      title: 'Blog | Jupiter Marine Sales',
      description: 'Read our latest boating articles and news',
    };
  }
}

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

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  let blog: BlogDetails | null = null;
  let relatedBlogs: BlogCardData[] = [];

  try {
    blog = await getBlogDetails(id);
    const blogs = await getBlogs();

    if (blog) {
      relatedBlogs = blogs
        .filter((b) => b.postStatus === blog!.postStatus && b.id !== id)
        .slice(0, 4)
        .map((item) => ({
          id: item.id,
          title: item.blogTitle,
          readTime: `${item.readTime} min read`,
          publishDate: item.createdAt,
          excerpt: item.blogDescription.slice(0, 300),
          featuredImage: {
            url: item.blogImage?.url ?? '',
            alt: item.blogTitle,
          },
        }));
    }
  } catch (error) {
    console.error('Blog details load error:', error);
    return null;
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
