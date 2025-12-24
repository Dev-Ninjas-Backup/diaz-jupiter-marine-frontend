'use client';
import { demoDescription } from '@/assets/demo-datas/demodata';
import React, { useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

const faq = [
  {
    question: 'Information & Features',
    answer: 'This information is currently unavailable. It will come soon.',
  },
  {
    question: 'Accommodations',
    answer:
      'This information is currently unavailable. It will come soon. due to the unavailability of data. working on it.',
  },
  {
    question: 'Salon',
    answer:
      'This information is currently unavailable. It will come soon. due to the unavailability of data. working on it.',
  },
  {
    question: 'Salon Day Head',
    answer:
      'This information is currently unavailable. It will come soon. due to the unavailability of data. working on it.',
  },
  {
    question: 'Companionway',
    answer:
      'This information is currently unavailable. due to the unavailability of data. working on it.',
  },
];

const ItemDescriptions = () => {
  const modifyText = (text: string) => {
    return text.split(/\n\s*\n/).map((p) => p.trim());
  };
  const paragraphs = modifyText(demoDescription);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const viewAnswer = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="px-1 md:px-4 py-5">
      <h2 className="text-lg md:text-xl font-semibold text-black text-left">
        Description
      </h2>
      <div className="mt-3 text-sm md:text-base space-y-4 text-gray-500">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {para}
          </p>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        {faq.map((item, idx) => (
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
              className={`${openIndex === idx ? 'block' : 'hidden'} px-2 pb-4 text-gray-600`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDescriptions;
