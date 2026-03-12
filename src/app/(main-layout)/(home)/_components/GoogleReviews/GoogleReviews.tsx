'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type GoogleReview = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
};

type GoogleReviewsResponse = {
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews: GoogleReview[];
};

const GoogleReviews = () => {
  const [data, setData] = useState<GoogleReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/google-reviews');
        if (!res.ok) {
          throw new Error('Failed to load Google reviews');
        }
        const json: GoogleReviewsResponse = await res.json();
        setData(json);
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        const message =
          err instanceof Error ? err.message : 'Failed to load Google reviews';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!data || !data.reviews || data.reviews.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = data.reviews.length - 3;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  if (loading) {
    return <LoadingSpinner message="Loading Google reviews..." />;
  }

  if (error || !data) {
    return (
      <CustomContainer>
        <section className="py-16 md:py-20">
          <NoDataFound
            dataTitle="Google reviews"
            noDataText={error || 'Unable to load Google reviews at the moment.'}
          />
        </section>
      </CustomContainer>
    );
  }

  const { name, rating, user_ratings_total, reviews } = data;
  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  if (visibleReviews.length === 0) {
    return (
      <CustomContainer>
        <section className="py-16 md:py-20">
          <NoDataFound
            dataTitle="Google reviews"
            noDataText="No Google reviews available right now."
          />
        </section>
      </CustomContainer>
    );
  }

  return (
    <CustomContainer>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Google Reviews
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold">
                What our customers say
              </h2>
              {name && (
                <p className="text-base text-gray-600">
                  Real experiences from buyers and sellers who worked with{' '}
                  <span className="font-semibold">{name}</span>.
                </p>
              )}
            </div>

            {typeof rating === 'number' &&
              typeof user_ratings_total === 'number' && (
                <div className="flex flex-col items-start md:items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-semibold">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-yellow-400 text-xl">★★★★★</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Based on {user_ratings_total} Google reviews
                  </p>
                </div>
              )}
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-500">
              {visibleReviews.map((review, idx) => (
                <article
                  key={currentIndex + idx}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {review.profile_photo_url ? (
                        <Image
                          src={review.profile_photo_url}
                          alt={review.author_name || 'Reviewer avatar'}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-semibold text-gray-500">
                          {(review.author_name || '?').charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      {review.author_url ? (
                        <Link
                          href={review.author_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-secondary"
                        >
                          {review.author_name || 'Google user'}
                        </Link>
                      ) : (
                        <p className="font-semibold text-gray-900">
                          {review.author_name || 'Google user'}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {review.relative_time_description}
                      </p>
                      {typeof review.rating === 'number' && (
                        <p className="mt-1 text-sm text-yellow-500">
                          {'★'.repeat(review.rating)}{' '}
                          <span className="text-gray-400">
                            ({review.rating.toFixed(1)})
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  {review.text && (
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-6">
                      {review.text}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </CustomContainer>
  );
};

export default GoogleReviews;

