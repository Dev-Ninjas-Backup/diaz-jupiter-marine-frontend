'use client';

import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import {
  getWhatSetsUsApart,
  WhatSetsUsApartResponse,
} from '@/services/about/about';
import { useEffect, useState } from 'react';

const WhatSetsUsApart = () => {
  const [whatSetsUsApartData, setWhatSetsUsApartData] =
    useState<WhatSetsUsApartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWhatSetsUsApart = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWhatSetsUsApart('JUPITER');
        if (data) {
          setWhatSetsUsApartData(data);
        } else {
          setError('Failed to load what sets us apart');
        }
      } catch (err) {
        setError('Error loading what sets us apart');
        console.error('Error fetching what sets us apart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhatSetsUsApart();
  }, []);

  if (loading) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 md:mb-12 uppercase">
          What Sets Us Apart
        </h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner message="Loading what sets us apart..." />
        </div>
      </section>
    );
  }

  if (error || !whatSetsUsApartData) {
    return (
      <section className="py-10 md:py-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 md:mb-12 uppercase">
          What Sets Us Apart
        </h2>
        <NoDataFound
          dataTitle="what sets us apart"
          noDataText={error || 'No what sets us apart data found.'}
        />
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16">
      <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 md:mb-12 uppercase">
        {whatSetsUsApartData.title || 'What Sets Us Apart'}
      </h2>

      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-6xl mx-auto text-center">
        {whatSetsUsApartData.description}
      </p>

      {/* Yacht Images */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 h-[300px]">
        <div className="col-span-7  rounded-lg overflow-hidden">
          <img
            src={whatSetsUsApartData.image1?.url || ''}
            alt={
              whatSetsUsApartData.image1?.originalFilename || 'Yacht image 1'
            }
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>

        {/* Top Right - Aerial view yacht */}
        <div className="col-span-5 rounded-lg overflow-hidden">
          <img
            src={whatSetsUsApartData.image2?.url || ''}
            alt={
              whatSetsUsApartData.image2?.originalFilename || 'Yacht image 2'
            }
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
          />
        </div>
      </div>

      {/* Stats Banner */}
      <div className="max-w-6xl mx-auto p-4 mb-8 md:mb-12 mt-10 md:mt-16                                                           ">
        <div className="bg-[#DCFCFF] rounded-[40px] py-12 px-6 flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#002127] mb-2">
              {whatSetsUsApartData.yearsOfYachtingExcellence || '20+'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-[180px] leading-snug">
              Years of Yachting Excellence
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#002127] mb-2">
              {whatSetsUsApartData.boatsSoldIn2024 || '1000+'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-[180px] leading-snug">
              Boats Sold in 2024
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#002127] mb-2">
              {whatSetsUsApartData.listingsViewedMonthly || '10M+'}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-[180px] leading-snug">
              Listings viewed monthly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
