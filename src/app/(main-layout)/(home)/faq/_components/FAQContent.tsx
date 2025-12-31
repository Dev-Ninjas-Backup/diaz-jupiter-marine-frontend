'use client';

import React, { useEffect, useState } from 'react';
import { getFAQ, FAQResponse } from '@/services/faq/faq';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';

const FAQContent = () => {
  const [faqData, setFaqData] = useState<FAQResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFAQ = async () => {
      try {
        const data = await getFAQ('JUPITER');
        setFaqData(data);
      } catch (error) {
        console.error('Error loading FAQ:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQ();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading FAQs..." />;
  }

  if (!faqData || !faqData.questions || faqData.questions.length === 0) {
    return <NoDataFound dataTitle="FAQ data" />;
  }

  // Split FAQs into two columns (half left, half right)
  const midPoint = Math.ceil(faqData.questions.length / 2);
  const leftColumnFAQs = faqData.questions.slice(0, midPoint);
  const rightColumnFAQs = faqData.questions.slice(midPoint);

  return (
    <div className="py-10 md:py-16">
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          {faqData.title || 'Frequently Asked Questions'}
        </h2>
        {faqData.subtitle && (
          <p className="text-gray-700 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            {faqData.subtitle}
          </p>
        )}
      </div>

      {/* FAQ Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* Left Column */}
        <div className="space-y-8 md:space-y-10">
          {leftColumnFAQs.map((faq, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {index + 1}. {faq.question}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-8 md:space-y-10">
          {rightColumnFAQs.map((faq, index) => (
            <div key={index + midPoint} className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {index + midPoint + 1}. {faq.question}
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
