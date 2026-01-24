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
    <section className="relative h-[380px] md:min-h-screen w-full flex items-center justify-center overflow-hidden rounded-2xl md:py-10">
      {/* ---------- Background ---------- */}
      {isVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={backgroundUrl} type={banner.background.mimeType} />
        </video>
      ) : (
        <Image
          src={backgroundUrl}
          alt={banner.bannerTitle || 'Banner background'}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 px-3 md:px-5 h-full w-full">
        <CustomContainer>
          <div className="flex flex-col items-center justify-between gap-5 h-full space-y-24 md:space-y-5">
            {/* Text */}
            <div className="text-white space-y-3 xl:space-y-[17%] pt-[20%] md:pt-[10%] lg:pt-[6%]">
              <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-[115px] font-bold uppercase tracking-[1px] md:tracking-[5px] text-center">
                {banner.bannerTitle}
              </h1>

              {banner.subtitle && (
                <div className="text-xs xl:text-lg 2xl:text-xl max-w-[520px] pr-5 space-y-2">
                  <h2 className="flex items-center gap-2 font-semibold">
                    <BsStars /> <span>AI Powered</span>
                  </h2>
                  <p>{banner.subtitle}</p>
                </div>
              )}
            </div>

            {/* Search */}
            <div className="md:mt-10 w-full">
              <SearchComponent />
            </div>
          </div>
        </CustomContainer>
      </div>
    </section>
  );
};

export default Banner;
