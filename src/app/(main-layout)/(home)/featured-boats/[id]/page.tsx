'use client';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import {
  getBackendBoatComById,
  mapBackendBoatToDetails,
} from '@/services/boats/boatsCom';
import { BoatDetails, BoatDetailsResponse } from '@/types/product-types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import BoatNotFound from './_components/BoatNotFound';

const FeaturedBoatDetailsPage = () => {
  const id = useParams().id as string;
  const navigate = useRouter();
  const [boatDetails, setBoatDetails] = useState<BoatDetailsResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBoatDetails = async () => {
      setIsLoading(true);
      try {
        const boat = await getBackendBoatComById(id);
        if (!boat) {
          setError('Boat not found');
          return;
        }
        const mapped = mapBackendBoatToDetails(boat) as BoatDetails;
        setBoatDetails({ success: true, message: '', data: mapped });
      } catch (err) {
        console.error('Error fetching boat details:', err);
        setError('Failed to load boat details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoatDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !boatDetails?.data) {
    return <BoatNotFound error={error || undefined} />;
  }

  const boat = boatDetails.data;
  const location =
    boat.additionalInfo?.find((info) => info.key === 'Location')?.value || '';

  return (
    <div>
      <GradientBannerCustom>
        <div className="text-white flex flex-row md:flex-row items-start justify-between gap-3 w-full md:pt-4 px-4 pt-2 pb-2">
          <div className="flex flex-row items-center justify-start gap-3 font-semibold text-sm md:text-xl lg:text-2xl">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => navigate.back()}
            />
            <h1>{boat.title}</h1>
          </div>
          <div className="text-right md:text-left text-sm md:text-xl lg:text-2xl pl-5 w-full md:w-max">
            <p>Price: {boat.price}</p>
            {location && (
              <p className="text-xs md:text-base lg:text-lg">
                {String(location)}
              </p>
            )}
          </div>
        </div>
      </GradientBannerCustom>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <ItemDetailsComponents boatDetails={boat} />
      </div>
    </div>
  );
};

export default FeaturedBoatDetailsPage;
