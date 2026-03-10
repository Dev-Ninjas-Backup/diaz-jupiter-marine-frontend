'use client';

import { getAboutUsDescription } from '@/services/about/about';
import { useEffect, useState } from 'react';

const AboutDescription = () => {
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescription = async () => {
      setLoading(true);
      try {
        const data = await getAboutUsDescription('JUPITER');
        if (data?.data?.aboutDescription) {
          setDescription(data.data.aboutDescription);
        }
      } catch (error) {
        console.error('Error fetching about description:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, []);

  if (loading || !description) {
    return null;
  }

  return (
    <section className="py-10 md:py-16 w-full overflow-hidden">
      <div
        className="w-full text-gray-700 leading-relaxed break-words overflow-hidden [&_p]:mb-4 [&_p]:break-words [&_strong]:font-bold [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-4 [&_h1]:break-words"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
};

export default AboutDescription;
