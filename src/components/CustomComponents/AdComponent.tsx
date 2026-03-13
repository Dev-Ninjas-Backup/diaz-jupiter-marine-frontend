'use client';

import bannerDown from '@/assets/yacht-images/subscription.png';
import { getAiSearchBanner } from '@/services/ai-search-banner/aiSearchBanner';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="h-[500px] sm:h-[600px] md:h-[850px] relative rounded-2xl">
      <Image
        src={bannerDown}
        fill
        className="w-full h-full rounded-2xl object-cover"
        alt="banner"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-2xl"></div>
      <div className="absolute bottom-0 w-full text-center px-4 text-white flex flex-col items-center justify-end space-y-3 md:space-y-5 pb-8 md:pb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-bold leading-tight">
          {bannerTitle}
        </h1>
        <p className="text-sm sm:text-base md:text-xl max-w-3xl">{subtitle}</p>
        <Link href="/search-listing" className="pt-2">
          <button className="px-6 sm:px-8 md:px-10 py-2 md:py-3 rounded-2xl bg-black text-sm md:text-base text-white hover:bg-gray-900 transition-colors">
            Start AI Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdComponent;
