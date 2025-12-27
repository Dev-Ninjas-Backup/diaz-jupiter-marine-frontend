'use client';

import React, { useEffect, useState } from 'react';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { getPrivacyPolicy } from '@/services/privacy-policy/privacyPolicy';

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
    <div className="w-full bg-linear-to-r from-[#006EF0] to-[#00CABE] py-12 md:py-16 lg:py-20 rounded-xl md:rounded-2xl">
      <CustomContainer>
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center uppercase tracking-wide mt-[3%]">
          {title}
        </h1>
      </CustomContainer>
    </div>
  );
};

export default PrivacyPolicyBanner;
