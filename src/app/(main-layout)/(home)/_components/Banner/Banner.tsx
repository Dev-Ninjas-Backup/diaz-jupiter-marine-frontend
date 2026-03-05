'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { BannerResponse, getHomeBanner } from '@/services/banner/banner';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import SearchComponent from './SearchComponent';

const DEFAULT_BANNER: BannerResponse = {
  id: 'default',
  page: 'HOME',
  site: 'JUPITER',
  bannerTitle: 'Jupiter Marine Sales',
  subtitle: '',
  backgroundId: 'default',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  background: {
    id: 'default',
    filename: 'default-banner.jpg',
    originalFilename: 'default-banner.jpg',
    path: '/assets/bannerImage.jpg',
    url: '/assets/bannerImage.jpg',
    fileType: 'image',
    mimeType: 'image/jpeg',
    size: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

/* ---------- COMPONENT ---------- */

const Banner = () => {
  const [banner, setBanner] = useState<BannerResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const data = await getHomeBanner('HOME', 'JUPITER');

        // API success & valid background
        if (data?.background?.url && data?.background?.mimeType) {
          setBanner(data);
        } else {
          setBanner(DEFAULT_BANNER);
        }
      } catch (error) {
        console.error('Failed to load banner:', error);
        setBanner(DEFAULT_BANNER);
      } finally {
        setLoading(false);
      }
    };

    loadBanner();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!banner) return null;

  const isVideo = banner.background.mimeType.startsWith('video/');
  const backgroundUrl = banner.background.url;

  return (
    <section className="relative min-h-[550px] md:min-h-screen w-full flex items-center justify-center overflow-hidden rounded-2xl md:py-10">
      {/* ---------- Background ---------- */}
      {isVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={backgroundUrl} type={banner.background.mimeType} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={backgroundUrl}
          alt={banner.bannerTitle || 'Banner background'}
          fill
          priority
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 px-3 md:px-5 py-10 md:py-0 h-full flex items-center w-full">
        <CustomContainer>
          <div className="flex flex-col items-center md:items-start justify-between gap-10 h-full">
            <div className="w-full text-white space-y-4 md:space-y-3 xl:space-y-[14%] pt-10 md:pt-[5%]">
              <h1 className="w-full text-3xl sm:text-4xl md:text-6xl xl:text-7xl 2xl:text-[115px] font-bold text-center uppercase tracking-[1px] md:tracking-[5px] leading-tight">
                {banner.bannerTitle}
              </h1>
              {banner.subtitle && (
                <div className="w-full md:w-1/2 text-sm xl:text-lg 2xl:text-xl max-w-[520px] mx-auto md:mx-0 md:px-10 space-y-2 text-center md:text-left">
                  <h2 className="flex items-center justify-center md:justify-start gap-2 font-semibold">
                    <BsStars className="text-white" /> <span>AI Powered</span>
                  </h2>
                  <p className="text-gray-100 md:text-white font-light">
                    {banner.subtitle}
                  </p>
                </div>
              )}
            </div>
            <div className="w-full mt-auto md:mt-10">
              <SearchComponent />
            </div>
          </div>
        </CustomContainer>
      </div>
    </section>
  );
};

export default Banner;
