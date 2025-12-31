'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import ProductCard from '@/components/Product/ProductCard';
import {
  getFloridaPremiumBoats,
  PremiumBoatApi,
} from '@/services/boats/premiumBoats';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { mapPremiumBoatToProduct } from '@/utils/mapPremiumBoatToProduct';

const VISIBLE_COUNT = 4;
const INITIAL_PAGE = 1;
const INITIAL_LIMIT = 12;
const ARROW_ACTIVE_DURATION = 1200;

type ArrowDirection = 'left' | 'right' | null;

const FloridaItems = () => {
  // State
  const [boats, setBoats] = useState<PremiumBoatApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [activeArrow, setActiveArrow] = useState<ArrowDirection>(null);

  // Fetch boats on component mount
  useEffect(() => {
    const fetchBoats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFloridaPremiumBoats(INITIAL_PAGE, INITIAL_LIMIT);
        setBoats(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to load premium yachts';
        setError(errorMessage);
        console.error('Error fetching Florida premium boats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  // Navigation handlers
  const handleNext = () => {
    const maxIndex = boats.length - VISIBLE_COUNT;
    if (startIndex < maxIndex) {
      setStartIndex((prev) => prev + 1);
      setActiveArrow('right');
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
      setActiveArrow('left');
    }
  };

  // Auto-reset arrow active state after animation
  useEffect(() => {
    if (!activeArrow) return;
    const timer = setTimeout(() => setActiveArrow(null), ARROW_ACTIVE_DURATION);
    return () => clearTimeout(timer);
  }, [activeArrow]);

  // Computed values
  const visibleBoats = boats.slice(startIndex, startIndex + VISIBLE_COUNT);
  const canGoNext = startIndex + VISIBLE_COUNT < boats.length;
  const canGoPrev = startIndex > 0;

  return (
    <CustomContainer>
      <div className="my-20 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Florida Yacht Trader
            </h1>
            <p className="text-base sm:text-lg text-secondary-txt">
              Discover premium yachts hand-picked from trusted Florida sellers.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label="Previous boats"
              className={`p-3 rounded-xl transition cursor-pointer hover:bg-secondary hover:text-white ${
                activeArrow === 'left'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-300 text-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <IoIosArrowBack className="text-xl" />
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Next boats"
              className={`p-3 rounded-xl transition cursor-pointer hover:bg-secondary hover:text-white ${
                activeArrow === 'right'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-300 text-black'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <LoadingSpinner message="Loading premium yachts..." />
          </div>
        ) : error ? (
          <NoDataFound dataTitle="premium yachts" noDataText={error} />
        ) : visibleBoats.length === 0 ? (
          <NoDataFound dataTitle="premium yachts" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {visibleBoats.map((boat) => (
              <ProductCard
                key={boat.DocumentID}
                isPremium
                product={mapPremiumBoatToProduct(boat)}
              />
            ))}
          </div>
        )}
      </div>
    </CustomContainer>
  );
};

export default FloridaItems;
