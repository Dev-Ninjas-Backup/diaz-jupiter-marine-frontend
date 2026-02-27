'use client';
import React from 'react';

interface ItemDescriptionsProps {
  description: string;
}

const STOP_SECTIONS = [
  'steering system',
  'additional information',
  'disclaimer',
];

const ItemDescriptions: React.FC<ItemDescriptionsProps> = ({ description }) => {
  const cleanDescription = () => {
    let cutIndex = description.length;
    for (const stop of STOP_SECTIONS) {
      const regex = new RegExp(`\\n?<strong>${stop}<\/strong>`, 'i');
      const match = regex.exec(description);
      if (match && match.index < cutIndex) cutIndex = match.index;
    }
    return description
      .slice(0, cutIndex)
      .replace(
        /<li[^>]*>\s*<p[^>]*>\s*<strong>Location:<\/strong>\s*\[Add your location\]\s*<\/p>\s*<\/li>/gi,
        '',
      )
      .trim();
  };

  return (
    <div className="px-1 md:px-4 py-5">
      <h2 className="text-lg md:text-xl font-semibold text-black text-left mb-3">
        Description
      </h2>
      <div
        className="text-sm md:text-base text-gray-600 prose prose-sm md:prose-base max-w-none"
        dangerouslySetInnerHTML={{ __html: cleanDescription() }}
      />
    </div>
  );
};

export default ItemDescriptions;
