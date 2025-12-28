import React from 'react';
import { faqData, faqIntro } from '../_data/faqData';

const FAQContent = () => {
  // Split FAQs into two columns (5 left, 5 right)
  const leftColumnFAQs = faqData.slice(0, 5);
  const rightColumnFAQs = faqData.slice(5, 10);

  return (
    <div className="py-10 md:py-16">
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          {faqIntro.heading}
        </h2>
        <p className="text-gray-700 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
          {faqIntro.description}
        </p>
      </div>

      {/* FAQ Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* Left Column */}
        <div className="space-y-8 md:space-y-10">
          {leftColumnFAQs.map((faq) => (
            <div key={faq.id} className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {faq.id}. {faq.question}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-8 md:space-y-10">
          {rightColumnFAQs.map((faq) => (
            <div key={faq.id} className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {faq.id}. {faq.question}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
