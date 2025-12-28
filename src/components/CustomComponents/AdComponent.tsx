'use client';

import bannerDown from '@/assets/yacht-images/subscription.png';
import { getAiSearchBanner } from '@/services/ai-search-banner/aiSearchBanner';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AdComponent = () => {
  const [bannerTitle, setBannerTitle] = useState<string>(
    'Where Luxury Meets Reliability',
  );
  const [subtitle, setSubtitle] = useState<string>(
    'Showcasing the finest yachts from our trusted network.',
  );

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const data = await getAiSearchBanner('JUPITER');
        if (data) {
          setBannerTitle(data.bannerTitle || 'Where Luxury Meets Reliability');
          setSubtitle(
            data.subtitle ||
              'Showcasing the finest yachts from our trusted network.',
          );
        }
      } catch (error) {
        console.error('Error fetching AI search banner:', error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="pb-10 md:h-[850px] relative rounded-2xl">
      <Image
        src={bannerDown}
        fill
        className="w-full h-full rounded-2xl object-cover"
        alt="banner"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-2xl"></div>
      <div className="absolute bottom-0 md:bottom-10 w-full text-center px-4 text-white flex flex-col items-center justify-end space-y-2 md:space-y-5 pb-10">
        <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-bold">
          {bannerTitle}
        </h1>
        <p className="text-xs md:text-xl pb-5">{subtitle}</p>
        <button className="px-2 md:px-10 py-1 md:py-3 rounded-2xl bg-black text-xs md:text-base text-white">
          Start AI Search
        </button>
      </div>
    </div>
  );
};

export default AdComponent;
