'use client';
import React, { useMemo, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

interface ItemDescriptionsProps {
  description: string;
}

interface Section {
  question: string;
  answer: string;
}

const ItemDescriptions: React.FC<ItemDescriptionsProps> = ({ description }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Parse the HTML description and extract sections
  const { mainDescription, sections } = useMemo(() => {
    // Split by <strong> tags to find sections
    const parts = description.split(/\n<strong>/);
    const main = parts[0]; // First part is main description

    const extractedSections: Section[] = [];

    // Process remaining parts as sections
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const titleMatch = part.match(/^([^<]+)<\/strong>/);
      if (titleMatch) {
        const title = titleMatch[1].trim();
        const content = part.substring(titleMatch[0].length).trim();
        extractedSections.push({
          question: title,
          answer: content || 'Content not available.',
        });
      }
    }

    return {
      mainDescription: main,
      sections: extractedSections,
    };
  }, [description]);

  const viewAnswer = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="px-1 md:px-4 py-5">
      <h2 className="text-lg md:text-xl font-semibold text-black text-left">
        Description
      </h2>
      <div
        className="mt-3 text-sm md:text-base text-gray-500 prose prose-sm md:prose-base max-w-none"
        dangerouslySetInnerHTML={{ __html: mainDescription }}
      />

      {sections.length > 0 && (
        <div className="mt-6 space-y-2">
          {sections.map((item, idx) => (
            <div key={idx} className="border-b">
              <button
                type="button"
                onClick={() => viewAnswer(idx)}
                aria-expanded={openIndex === idx}
                className="w-full flex items-center justify-between px-2 py-3 text-left text-base md:text-lg font-semibold"
              >
                <span>{item.question}</span>
                <MdArrowForwardIos
                  className={`text-sm md:text-xl transition-transform duration-200 ${openIndex === idx ? 'rotate-90' : 'rotate-0'}`}
                />
              </button>

              <div
                className={`${openIndex === idx ? 'block' : 'hidden'} px-2 pb-4 text-gray-600 prose prose-sm max-w-none`}
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemDescriptions;
