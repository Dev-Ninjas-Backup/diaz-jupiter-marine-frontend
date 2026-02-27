'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import { getWhyUs, WhyUsResponse } from '@/services/why-us/whyUs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import WhyUsSkeleton from '../Skeletons/WhyUsSkeleton';

const WhyUs = () => {
  const [data, setData] = useState<WhyUsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWhyUs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getWhyUs('JUPITER');
        if (response) {
          setData(response);
        } else {
          setError('Failed to load Why Us data');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load Why Us data';
        setError(errorMessage);
        console.error('Error fetching Why Us data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyUs();
  }, []);

  if (loading) {
    return (
      <CustomContainer>
        <WhyUsSkeleton />
      </CustomContainer>
    );
  }

  if (error || !data) {
    return (
      <CustomContainer>
        <section className="py-16 md:py-20">
          <NoDataFound
            dataTitle="Why Us section"
            noDataText={error || 'Unable to load Why Us information'}
          />
        </section>
      </CustomContainer>
    );
  }

  const stats = [
    { value: data.excellence, label: 'Years of Excellence' },
    { value: data.boatsSoldPerYear, label: 'Boats Sold Per Year' },
    { value: data.listingViewed, label: 'Listings Viewed' },
  ];

  const images = [data.image1.url, data.image2.url, data.image3.url];

  return (
    <CustomContainer>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-5 md:gap-20 lg:gap-16">
            <div className="space-y-6 w-full lg:w-1/2">
              <div className="text-sm font-medium text-gray-600">Why us?</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {data.title}
              </h2>
              <p className="text-gray-500 text-base md:text-xl leading-relaxed">
                {data.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                {stats.map((s, idx) => (
                  <div className="space-y-1" key={idx}>
                    <h3 className="text-xl font-semibold">{s.value}</h3>
                    <p className="text-sm text-gray-600">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 md:pt-4">
                <Link
                  href={data.buttonLink || '/register-boat'}
                  className="inline-block bg-secondary hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-lg transition-colors shadow-md"
                >
                  {data.buttonText}
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center h-[250px] sm:h-80 md:h-[350px] lg:h-[400px] xl:h-[450px] w-full lg:w-1/2">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[45%] md:w-[40%] lg:w-[38%] aspect-[4.7/5] lg:aspect-4/5 z-10">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={images[0]}
                    alt="Yacht lifestyle"
                    height={500}
                    width={900}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>

              <div className="absolute left-1/2 lg:top-0 -translate-x-1/2 w-[55%] md:w-[50%] lg:w-[48%] aspect-[4.8/5] lg:aspect-3/4 z-30">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-teal-900">
                  <Image
                    src={images[2]}
                    alt="Yacht aerial view"
                    height={500}
                    width={900}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] md:w-[40%] lg:w-[38%] aspect-[4.7/5] lg:aspect-4/5 z-50">
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src={images[1]}
                    alt="Yacht interior"
                    height={500}
                    width={900}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CustomContainer>
  );
};

export default WhyUs;
