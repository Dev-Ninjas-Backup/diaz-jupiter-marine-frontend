'use client';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import {
  getBackendBoatComById,
  mapBackendBoatToDetails,
} from '@/services/boats/boatsCom';
import {
  getBackendYBById,
  mapBackendYBToDetails,
} from '@/services/boats/yachtbrokerBackend';
import { BoatDetails, BoatDetailsResponse } from '@/types/product-types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import BoatNotFound from './_components/BoatNotFound';

const SearchListingDetailsPage = () => {
  const rawId = useParams().id as string;
  const navigate = useRouter();
  const [boatDetails, setBoatDetails] = useState<BoatDetailsResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rawId) return;

    const fetchBoatDetails = async () => {
      setIsLoading(true);
      try {
        // ID format: "boats-com__<documentId>" or "yachtbroker__<externalId>"
        const [source, ...rest] = rawId.split('__');
        const id = rest.join('__');

        let mapped: BoatDetails | null = null;

        if (source === 'boats-com' && id) {
          const boat = await getBackendBoatComById(id);
          if (boat) mapped = mapBackendBoatToDetails(boat) as BoatDetails;
        } else if (source === 'yachtbroker' && id) {
          const boat = await getBackendYBById(id);
          if (boat) mapped = mapBackendYBToDetails(boat) as BoatDetails;
        } else {
          // fallback: try boats-com first, then yachtbroker
          const boatsCom = await getBackendBoatComById(rawId);
          if (boatsCom) {
            mapped = mapBackendBoatToDetails(boatsCom) as BoatDetails;
          } else {
            const yb = await getBackendYBById(rawId);
            if (yb) mapped = mapBackendYBToDetails(yb) as BoatDetails;
          }
        }

        if (!mapped) {
          setError('Boat not found');
          return;
        }

        setBoatDetails({ success: true, message: '', data: mapped });
      } catch (err) {
        console.error('Error fetching boat details:', err);
        setError('Failed to load boat details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoatDetails();
  }, [rawId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );

  if (error || !boatDetails?.data)
    return <BoatNotFound error={error || undefined} />;

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

export default SearchListingDetailsPage;
