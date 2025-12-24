import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';

import blogDetailsImg from '@/assets/blogs/blogdetailsimg.png';
import { demoBlogData } from '@/assets/demo-datas/demodata';

import BlogCard from '@/components/Blog/BlogCard';
import AdComponent from '@/components/CustomComponents/AdComponent';
import ShareWIth from '@/components/shared/ShareWith/ShareWIth';
import SmallAdComponent from '@/components/CustomComponents/SmallAdComponent';
import BlogInformations from './_components/BlogInformations';

const BlogDetailsPage = () => {
  return (
    <div>
      <GradientBannerCustom>
        <h1 className="text-left text-white pt-14 font-semibold text-sm md:text-xl lg:text-2xl">
          The Future of Boating: Smarter Tech That’s Already Here
        </h1>
      </GradientBannerCustom>
      <CustomContainer>
        <div className="flex flex-col md:flex-row items-start gap-10 py-10">
          <div className="w-full md:w-3/4">
            <BlogInformations blogDetailsImg={blogDetailsImg} />
            <ShareWIth />
          </div>

          <div className="w-full md:w-1/4">
            <SmallAdComponent />
          </div>
        </div>
        <div className="py-10">
          <h1 className="text-2xl font-semibold py-5">
            Read More Related Blogs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {demoBlogData.slice(0, 4).map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      </CustomContainer>
      <AdComponent />
    </div>
  );
};

export default BlogDetailsPage;
