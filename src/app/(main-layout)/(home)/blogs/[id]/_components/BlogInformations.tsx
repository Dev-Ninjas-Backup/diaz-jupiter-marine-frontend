import { demoBlogDetailsData } from '@/assets/demo-datas/demodata';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

const BlogInformations = ({
  blogDetailsImg,
}: {
  blogDetailsImg: string | StaticImageData;
}) => {
  return (
    <div>
      {/* Blog Details */}
      <div className="h-[400px] w-full overflow-hidden rounded-2xl">
        <Image
          src={blogDetailsImg}
          width={1200}
          height={300}
          alt="Blog Details"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex items-center gap-5 justify-start text-xs py-5">
        <p className="border-r border-gray-200 pr-5">8 min read</p>
        <p>October 1, 2025</p>
      </div>

      {/* Blog Content */}
      <div className="space-y-6">
        <h1 className="text-xl font-bold leading-tight">
          {demoBlogDetailsData.title}
        </h1>

        {/* Dynamic Blog Sections */}
        <div className="prose prose-lg max-w-none space-y-6">
          {demoBlogDetailsData.sections.map((section, index) => {
            if (section.type === 'paragraph') {
              return (
                <p
                  key={index}
                  className="text-gray-500 leading-relaxed text-base md:text-lg text-justify"
                >
                  {section.content}
                </p>
              );
            }

            if (section.type === 'heading') {
              return (
                <h2 key={index} className="text-xl font-bold mt-8 mb-4">
                  {section.content}
                </h2>
              );
            }

            if (section.type === 'image') {
              return (
                <div key={index} className="my-8">
                  <div className="flex flex-col-reverse md:flex-row items-center gap-5">
                    <div className="space-y-6">
                      {section.heading && (
                        <h3 className="text-xl font-bold mt-8 mb-4">
                          {section.heading}
                        </h3>
                      )}
                      <p className="text-gray-500 leading-relaxed text-base md:text-lg">
                        {section.content}
                      </p>
                    </div>
                    <div className="relative min-w-[250px] md:max-w-[300px]  ml-auto overflow-hidden rounded-2xl shadow-lg">
                      <Image
                        src={blogDetailsImg}
                        alt={section.caption || 'Blog image'}
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogInformations;
