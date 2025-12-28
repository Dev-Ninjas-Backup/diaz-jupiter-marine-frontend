'use client';

import HtmlContentWithToc from '@/components/CustomComponents/HtmlContentWithToc';
import { getTermsOfService } from '@/services/terms-of-service/termsOfService';
import { useEffect, useState } from 'react';

const TermsContent = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTermsOfService = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTermsOfService('JUPITER');
        if (data) {
          setHtmlContent(data.termsDescription);
          setTitle(data.termsTitle);
        } else {
          setError('Failed to load terms of service');
        }
      } catch (err) {
        console.error('Error fetching terms of service:', err);
        setError('Failed to load terms of service');
      } finally {
        setLoading(false);
      }
    };

    fetchTermsOfService();
  }, []);

  if (loading) {
    return (
      <div className="py-10 md:py-16">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 md:py-16">
        <div className="text-center py-20">
          <p className="text-lg text-red-600">{error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  if (!htmlContent) {
    return (
      <div className="py-10 md:py-16">
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">
            No terms of service available.
          </p>
        </div>
      </div>
    );
  }

  return <HtmlContentWithToc htmlContent={htmlContent} title={title} />;
};

export default TermsContent;
