'use client';

import { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { BannerResponse, getHomeBanner } from '@/services/banner/banner';
import Image from 'next/image';
import { BsStars } from 'react-icons/bs';

// const DEFAULT_VIDEO = '/assets/Video.mp4';

const DEFAULT_BANNER: BannerResponse = {
  id: 'default',
  bannerTitle: 'Jupiter Marine Sales',
  subtitle: '',
  background: {
    url: DEFAULT_VIDEO,
    mimeType: 'video/mp4',
    filename: 'default-banner.mp4',
  },
};

const Banner = () => {
  const [banner, setBanner] = useState<BannerResponse>(DEFAULT_BANNER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const data = await getHomeBanner('HOME', 'JUPITER');
        if (data) {
          setBanner(data);
        }
      } catch (error) {
        console.error('Failed to load banner:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBanner();
  }, []);

  if (loading) {
    return (
      <div className="h-[380px] md:h-screen bg-slate-900 animate-pulse rounded-2xl" />
    );
  }

  const isVideo = banner.background.mimeType.startsWith('video/');
  const backgroundUrl = banner.background.url;

  return (
    <section className="relative h-[380px] md:min-h-screen w-full flex items-center justify-center overflow-hidden rounded-2xl md:py-10">
      {/* Background media */}
      {isVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={DEFAULT_VIDEO}
        >
          <source src={backgroundUrl} type={banner.background.mimeType} />
        </video>
      ) : (
        <Image
          src={backgroundUrl}
          alt={banner.bannerTitle || 'Banner Background'}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      <div className="relative z-10 px-3 md:px-5 h-full w-full">
        <CustomContainer>
          <div className="flex flex-col items-start justify-between gap-5 h-full space-y-24 md:space-y-5">
            <div className="text-white space-y-3 xl:space-y-[17%] pt-[20%] md:pt-[6%]">
              <h1 className="text-2xl md:text-6xl xl:text-7xl 2xl:text-[115px] font-bold text-left uppercase tracking-[1px] md:tracking-[5px]">
                {banner.bannerTitle}
              </h1>

              <div className="text-xs xl:text-lg 2xl:text-xl max-w-[520px] pr-5 space-y-2">
                {banner.subtitle && (
                  <>
                    <h2 className="flex items-center gap-2 font-semibold">
                      <BsStars /> <span>AI Powered</span>
                    </h2>
                    <p>{banner.subtitle}</p>
                  </>
                )}
              </div>
            </div>

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
