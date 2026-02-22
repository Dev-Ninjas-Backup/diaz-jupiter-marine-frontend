'use client';

import React, { useEffect, useState } from 'react';
import { getFAQ, FAQResponse } from '@/services/faq/faq';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';

import { richTextClass } from '@/lib/utils';

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

  if (loading) return <LoadingSpinner message="Loading FAQs..." />;

  if (!faqData || !faqData.questions || faqData.questions.length === 0) {
    return <NoDataFound dataTitle="FAQ data" />;
  }

  const midPoint = Math.ceil(faqData.questions.length / 2);
  const leftColumnFAQs = faqData.questions.slice(0, midPoint);
  const rightColumnFAQs = faqData.questions.slice(midPoint);

  return (
    <div className="py-10 md:py-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        <div className="space-y-8 md:space-y-10 min-w-0">
          {leftColumnFAQs.map((faq, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {index + 1}. {faq.question}
              </h3>
              <div className={richTextClass} dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          ))}
        </div>

        <div className="space-y-8 md:space-y-10 min-w-0">
          {rightColumnFAQs.map((faq, index) => (
            <div key={index + midPoint} className="space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {index + midPoint + 1}. {faq.question}
              </h3>
              <div className={richTextClass} dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQContent;
