'use client';

import HtmlContentWithToc from '@/components/CustomComponents/HtmlContentWithToc';
import { getPrivacyPolicy } from '@/services/privacy-policy/privacyPolicy';
import { useEffect, useState } from 'react';

const PrivacyPolicyContent = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPrivacyPolicy('JUPITER');
        if (data) {
          setHtmlContent(data.privacyDescription);
          setTitle(data.privacyTitle);
        } else {
          setError('Failed to load privacy policy');
        }
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setError('Failed to load privacy policy');
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
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
          <p className="text-lg text-gray-600">No privacy policy available.</p>
        </div>
      </div>
    );
  }

  return <HtmlContentWithToc htmlContent={htmlContent} title={title} />;
};

export default PrivacyPolicyContent;
