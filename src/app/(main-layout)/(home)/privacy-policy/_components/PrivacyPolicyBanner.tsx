'use client';

import React, { useEffect, useState } from 'react';
import { getPrivacyPolicy } from '@/services/privacy-policy/privacyPolicy';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';

const PrivacyPolicyBanner = () => {
  const [title, setTitle] = useState<string>('PRIVACY POLICY');

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const data = await getPrivacyPolicy('JUPITER');
        if (data?.privacyTitle) {
          setTitle(data.privacyTitle.toUpperCase());
        }
      } catch (error) {
        console.error('Error fetching privacy policy title:', error);
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

export default PrivacyPolicyBanner;
