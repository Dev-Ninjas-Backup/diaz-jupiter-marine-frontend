import Image from 'next/image';
import React from 'react';

interface BlogInformationsProps {
  title: string;
  description: string;
  imageUrl?: string;
  readTime: number;
  createdAt: string;
}

interface Section {
  subtitle: string;
  content: string;
}

const BlogInformations = ({
  title,
  description,
  imageUrl,
  readTime,
  createdAt,
}: BlogInformationsProps) => {
  // 🔹 Clean & split description
  const sentences = description
    .replace(/&apos;|&quot;/g, "'")
    .split('. ')
    .filter(Boolean);

  // 🔹 First few sentences = intro content
  const intro = sentences.slice(0, 3).join('. ') + '.';

  // 🔹 Rest into sections (subtitle + content)
  const sections: Section[] = [];
  for (let i = 3; i < sentences.length; i += 3) {
    sections.push({
      subtitle: sentences[i],
      content: sentences.slice(i + 1, i + 3).join('. ') + '.',
    });
  }

  return (
    <div>
      {/* Top Banner Image */}
      {imageUrl && (
        <div className="h-[400px] w-full overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={title}
            width={1200}
            height={400}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-5 text-xs py-5">
        <p className="border-r pr-5 border-gray-200">
          {readTime} min read
        </p>
        <p>
          {new Date(createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Blog Title */}
      <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
        {title}
      </h1>

      {/* Intro Content */}
      <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 text-justify">
        {intro}
      </p>

      {/* Sections with Right-side Image */}
      <div className="space-y-12">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-black">
                {section.subtitle}
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed text-justify">
                {section.content}
              </p>
            </div>

            {/* Right Side Small Image */}
            {imageUrl && (
              <div className="w-full md:w-[260px] shrink-0">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={imageUrl}
                    alt={`${title} section image`}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogInformations;
