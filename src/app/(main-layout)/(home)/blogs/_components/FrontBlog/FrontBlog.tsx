import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

const FrontBlog = ({
  generalBlog,
}: {
  generalBlog: string | StaticImageData;
}) => {
  return (
    <Link
      href={`/blogs/${1}`}
      className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm  flex flex-col md:flex-row items-center gap-5 h-full"
    >
      <div className=" w-full md:w-[850px] lg:w-[1280px] h-60 md:h-full">
        <Image
          src={generalBlog}
          alt="generalBlog"
          width={800}
          height={550}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>8 min read</span>
          <span>October 1, 2025</span>
        </div>

        <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:leading-relaxed text-justify">
          The Ultimate Guide to Buying a Pre-Owned Yacht in Florida: Insider
          Tips, Expert Advice, and Everything You Need to Know Before Setting
          Sail
        </h1>

        <p className="text-base md:text-xl text-gray-500 md:leading-relaxed mb-4 text-justify">
          Florida is one of the world&apos;s premier destinations for yacht
          ownership. With its year-round sunshine, vibrant coastal communities,
          and easy access to the Atlantic Ocean, Gulf of Mexico, and Caribbean,
          it&apos;s no surprise that thousands of boaters choose Florida as
          their hub for buying and selling yachts. But for first-time buyers,
          navigating the pre-owned...
        </p>

        <span className="text-primary hover:text-[#0052CC] font-medium text-base inline-block transition-colors">
          Read More
        </span>
      </div>
    </Link>
  );
};

export default FrontBlog;
