'use client';

import React, { useEffect, useState } from 'react';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import { getTermsOfService } from '@/services/terms-of-service/termsOfService';

const TermsBanner = () => {
  const [title, setTitle] = useState<string>('TERMS AND CONDITIONS');

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const data = await getTermsOfService('JUPITER');
        if (data?.termsTitle) {
          setTitle(data.termsTitle.toUpperCase());
        }
      } catch (error) {
        console.error('Error fetching terms of service title:', error);
      }
    };

    fetchTitle();
  }, []);

  return (
    <GradientBannerCustom>
      <h1 className="text-white text-xl md:text-4xl xl:text-5xl 2xl:text-6xl uppercase font-bold md:tracking-[5px] text-center leading-normal">
        {title}
      </h1>
    </GradientBannerCustom>
  );
};

export default TermsBanner;
