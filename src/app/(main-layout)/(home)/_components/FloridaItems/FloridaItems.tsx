'use client';

import React, { useEffect, useState } from 'react';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import ProductCard from '@/components/Product/ProductCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  getFloridaPremiumBoats,
  PremiumBoatApi,
} from '@/services/boats/premiumBoats';
import { mapPremiumBoatToProduct } from '../../../../../../utils/mapPremiumBoatToProduct';

const VISIBLE_COUNT = 4;

const FloridaItems = () => {
  const [boats, setBoats] = useState<PremiumBoatApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [activeArrow, setActiveArrow] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const fetchBoats = async () => {
      setLoading(true);
      try {
        // একবারই API call
        const data = await getFloridaPremiumBoats(1, 12);
        setBoats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < boats.length) {
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

  // optional: active state auto reset
  useEffect(() => {
    if (!activeArrow) return;
    const timer = setTimeout(() => setActiveArrow(null), 1200);
    return () => clearTimeout(timer);
  }, [activeArrow]);

  const visibleBoats = boats.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

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
              disabled={startIndex === 0}
              className={`p-3 rounded-xl transition
                ${
                  activeArrow === 'left'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-300 text-black'
                }
                disabled:opacity-50
              `}
            >
              <IoIosArrowBack className="text-xl" />
            </button>

            <button
              onClick={handleNext}
              disabled={startIndex + VISIBLE_COUNT >= boats.length}
              className={`p-3 rounded-xl transition
                ${
                  activeArrow === 'right'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-300 text-black'
                }
                disabled:opacity-50
              `}
            >
              <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <p className="text-center text-lg py-20">
            Loading premium yachts...
          </p>
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
