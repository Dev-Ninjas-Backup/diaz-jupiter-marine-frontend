'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import { getOurStory, OurStoryResponse } from '@/services/about/about';
import { useEffect, useState } from 'react';

const OurStory = () => {
  const [ourStoryData, setOurStoryData] = useState<OurStoryResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOurStory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOurStory('JUPITER');
        if (data) {
          setOurStoryData(data);
        } else {
          setError('Failed to load our story');
        }
      } catch (err) {
        setError('Error loading our story');
        console.error('Error fetching our story:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOurStory();
  }, []);

  if (loading) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ">
          OUR STORY
        </h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner message="Loading our story..." />
        </div>
      </section>
    );
  }

  if (error || !ourStoryData) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ">
          OUR STORY
        </h2>
        <NoDataFound
          dataTitle="our story"
          noDataText={error || 'No our story data found.'}
        />
      </section>
    );
  }

  // Map API images to array for easier access
  const images = [
    ourStoryData.image1,
    ourStoryData.image2,
    ourStoryData.image3,
    ourStoryData.image4,
    ourStoryData.image5,
  ].filter(Boolean);

  return (
    <section className="py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 ">
        {ourStoryData.title?.toUpperCase() || 'OUR STORY'}
      </h2>

      <div className=" mb-10 ">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed ">
          {ourStoryData.description}
        </p>
      </div>

      {/* Yacht Images Grid - Image layout matching design */}
      <div className="flex flex-col gap-4 md:gap-6">
        {/* Top Left - Large image (spans 2 columns, 2 rows) */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 h-[300px]">
          <div className="col-span-7  rounded-lg overflow-hidden">
            <img
              src={images[0]?.url || ''}
              alt={images[0]?.originalFilename || 'Yacht image 1'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>

          {/* Top Right - Aerial view yacht */}
          <div className="col-span-5 rounded-lg overflow-hidden">
            <img
              src={images[1]?.url || ''}
              alt={images[1]?.originalFilename || 'Yacht image 2'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6 h-[300px]">
          {/* Bottom Left - Yacht cutting through water */}
          <div className="col-span-4  rounded-lg overflow-hidden">
            <img
              src={images[2]?.url || ''}
              alt={images[2]?.originalFilename || 'Yacht image 3'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>

          {/* Bottom Middle - Superyacht in cove */}
          <div className="col-span-5  rounded-lg overflow-hidden">
            <img
              src={images[3]?.url || ''}
              alt={images[3]?.originalFilename || 'Yacht image 4'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>

          {/* Bottom Right - Catamaran sailboat */}
          <div className="col-span-3  rounded-lg overflow-hidden">
            <img
              src={images[4]?.url || ''}
              alt={images[4]?.originalFilename || 'Yacht image 5'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
