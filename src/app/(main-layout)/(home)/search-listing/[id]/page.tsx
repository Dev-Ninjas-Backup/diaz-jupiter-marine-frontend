'use client';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { useSearchResults } from '@/context/SearchResultsContext';
import { getBoatById } from '@/services/boats';
import { BoatDetails, BoatDetailsResponse } from '@/types/product-types';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ItemDetailsComponents from './_components/ItemDetailsComponents';
import SendMessage from './_components/SendMessage';

const SearchListingDetailsPage = () => {
  const id = useParams().id as string;
  const navigate = useRouter();
  const { searchResults } = useSearchResults();
  const [boatDetails, setBoatDetails] = useState<BoatDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoatDetails = async () => {
      try {
        setIsLoading(true);

        // First check context (covers AI/Filter search results)
        if (searchResults) {
          const found = searchResults.find((b) => b.id === id);
          if (found) {
            const mapped: BoatDetails = {
              id: found.id || id,
              title: found.name,
              price: found.price ? `$${Number(found.price).toLocaleString()}` : 'Price on request',
              source: 'ai',
              description: found.description || '',
              images: (found.images as string[]).filter(Boolean).map((uri) => ({ uri })),
              specifications: [
                { key: 'Make', value: found.brand_make || null },
                { key: 'Model', value: found.model || null },
                { key: 'Year', value: found.built_year || null },
                { key: 'Length', value: found.length !== 'N/A' ? found.length : null },
                { key: 'Beam', value: found.beam_size !== 'N/A' ? found.beam_size : null },
                { key: 'Fuel Type', value: found.fuel_type !== 'Not specified' ? found.fuel_type : null },
                { key: 'Condition', value: found.condition || null },
              ].filter((s) => s.value !== null && s.value !== ''),
              engines: [],
              additionalInfo: [
                { key: 'Location', value: found.location || null },
              ].filter((a) => a.value !== null && a.value !== ''),
            };
            setBoatDetails({ success: true, message: '', data: mapped });
            setError(null);
            setIsLoading(false);
            return;
          }
        }

        // Fallback: YachtBroker API fetch
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
  }, [id, searchResults]);

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
            <SendMessage listingId={id} />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default SearchListingDetailsPage;
