import { NextResponse } from 'next/server';

const PLACE_ID = 'ChIJ_2v2SYnT3ogR25VpusoLe8g';

type GooglePlacesReview = {
  author_name?: string;
  author_url?: string;
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  text?: string;
};

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: missing Google Places API key' },
        { status: 500 },
      );
    }

    const url = new URL(
      'https://maps.googleapis.com/maps/api/place/details/json',
    );

    url.searchParams.set('place_id', PLACE_ID);
    url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews');
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Google APIs are fast but add a timeout guard
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Google reviews' },
        { status: res.status },
      );
    }

    const data = await res.json();

    if (data.status !== 'OK' || !data.result) {
      return NextResponse.json(
        { error: 'Unexpected response from Google Places API' },
        { status: 502 },
      );
    }

    const result = data.result;

    const responsePayload = {
      name: result.name as string | undefined,
      rating: result.rating as number | undefined,
      user_ratings_total: result.user_ratings_total as number | undefined,
      reviews: Array.isArray(result.reviews)
        ? (result.reviews as GooglePlacesReview[]).map((review) => ({
            author_name: review.author_name,
            author_url: review.author_url,
            profile_photo_url: review.profile_photo_url,
            rating: review.rating,
            relative_time_description: review.relative_time_description,
            text: review.text,
          }))
        : [],
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('Google Reviews API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
