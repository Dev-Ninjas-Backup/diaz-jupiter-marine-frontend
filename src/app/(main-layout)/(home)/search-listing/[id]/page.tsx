'use client';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { getBoatById } from '@/services/boats';
import { BoatDetailsResponse } from '@/types/product-types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import SendMessage from './_components/SendMessage';

const SearchListingDetailsPage = () => {
  const id = useParams().id as string;
  const navigate = useRouter();
  const [boatDetails, setBoatDetails] = useState<BoatDetailsResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoatDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getBoatById(id);
        setBoatDetails(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching boat details:', err);
        setError('Failed to load boat details');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBoatDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !boatDetails?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error || 'Boat not found'}</p>
      </div>
    );
  }

  const boat = boatDetails.data;
  const location =
    boat.additionalInfo?.find(
      (info) =>
        info.key.toLowerCase().includes('location') ||
        info.key.toLowerCase().includes('city'),
    )?.value || '';

  return (
    <div>
      <GradientBannerCustom>
        <div className="text-white flex flex-col md:flex-row items-start justify-between gap-3 w-full pt-10 md:pt-12">
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
              <p className="text-xs md:text-base lg:text-lg">{location}</p>
            )}
          </div>
        </div>
      </GradientBannerCustom>
      <CustomContainer>
        <div className="flex flex-col md:flex-row items-start gap-10 py-5">
          <div className="md:w-2/3">
            <ItemDetailsComponents boatDetails={boat} />
          </div>
          <div className="md:w-1/3">
            <SendMessage />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default SearchListingDetailsPage;
