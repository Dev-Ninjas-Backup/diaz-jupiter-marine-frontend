'use client';

import HtmlContentWithToc from '@/components/CustomComponents/HtmlContentWithToc';
import { getTermsOfService } from '@/services/terms-of-service/termsOfService';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';

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
    return <LoadingSpinner message="Loading terms and conditions..." />;
  }

  if (error || !htmlContent) {
    return <NoDataFound dataTitle="Terms and Conditions data" />;
  }

  return <HtmlContentWithToc htmlContent={htmlContent} title={title} />;
};

export default TermsContent;
