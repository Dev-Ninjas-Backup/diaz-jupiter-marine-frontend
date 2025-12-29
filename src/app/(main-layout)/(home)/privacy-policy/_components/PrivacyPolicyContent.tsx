'use client';

import HtmlContentWithToc from '@/components/CustomComponents/HtmlContentWithToc';
import { getPrivacyPolicy } from '@/services/privacy-policy/privacyPolicy';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';

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
    return <LoadingSpinner message="Loading privacy policy..." />;
  }

  if (error || !htmlContent) {
    return <NoDataFound dataTitle="Privacy Policy data" />;
  }

  return <HtmlContentWithToc htmlContent={htmlContent} title={title} />;
};

export default PrivacyPolicyContent;
