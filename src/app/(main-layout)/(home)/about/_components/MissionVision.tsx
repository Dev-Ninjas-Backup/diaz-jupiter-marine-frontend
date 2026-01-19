'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import {
  getMissionVision,
  MissionVisionResponse,
} from '@/services/about/about';
import { useEffect, useState } from 'react';

const MissionVision = () => {
  const [missionVisionData, setMissionVisionData] =
    useState<MissionVisionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissionVision = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMissionVision('JUPITER');
        if (data) {
          setMissionVisionData(data);
        } else {
          setError('Failed to load mission & vision');
        }
      } catch (err) {
        setError('Error loading mission & vision');
        console.error('Error fetching mission & vision:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMissionVision();
  }, []);

  if (loading) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
          MISSION & VISION
        </h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner message="Loading mission & vision..." />
        </div>
      </section>
    );
  }

  if (error || !missionVisionData) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
          MISSION & VISION
        </h2>
        <NoDataFound
          dataTitle="mission & vision"
          noDataText={error || 'No mission & vision data found.'}
        />
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12">
        {missionVisionData.title?.toUpperCase() || 'MISSION & VISION'}
      </h2>

      {/* White Card Container */}
      <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg border border-gray-200 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start h-[350px]">
          {/* Left Side - Overlapping Yacht Images */}
          <div className="relative h-full">
            <div className="relative flex h-full justify-center items-center">
              {/* First image - base layer */}
              <div className="absolute left-0 h-4/5 w-2/5 rounded-lg overflow-hidden">
                <img
                  src={missionVisionData.image1?.url || ''}
                  alt={
                    missionVisionData.image1?.originalFilename ||
                    'Yacht image 1'
                  }
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Second image - overlapping from right */}
              <div className="absolute h-5/5 w-3/5 rounded-lg overflow-hidden">
                <img
                  src={missionVisionData.image2?.url || ''}
                  alt={
                    missionVisionData.image2?.originalFilename ||
                    'Yacht image 2'
                  }
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Third image - overlapping from right */}
              <div className="absolute right-0 h-4/5 w-2/5 rounded-lg overflow-hidden">
                <img
                  src={missionVisionData.image3?.url || ''}
                  alt={
                    missionVisionData.image3?.originalFilename ||
                    'Yacht image 3'
                  }
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Mission & Vision */}
          <div className="space-y-8 md:space-y-12">
            {/* Mission */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                {missionVisionData.missionTitle?.trim() || 'Mission'}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {missionVisionData.description}
              </p>
            </div>

            {/* Vision */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                {missionVisionData.visionTitle?.trim() || 'Vision'}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {missionVisionData.visionDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
