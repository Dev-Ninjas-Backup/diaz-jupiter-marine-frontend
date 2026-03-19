'use client';
import React, { useEffect, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';

interface ShowItemsLocationProps {
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

const ShowItemsLocation: React.FC<ShowItemsLocationProps> = ({ location }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const locationString = [location?.city, location?.state, location?.country]
    .filter(Boolean)
    .join(', ');

  // Geocode location using Nominatim (OpenStreetMap)
  useEffect(() => {
    const geocodeLocation = async () => {
      if (!locationString) return;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationString)}`,
        );
        const data = await response.json();
        if (data && data[0]) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    geocodeLocation();
  }, [locationString]);

  const latitude = coordinates?.lat || 26.7153;
  const longitude = coordinates?.lng || -80.0534;

  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="w-full bg-white overflow-hidden mt-6 md:px-4">
      <div className="py-4">
        <h2 className="text-lg md:text-xl font-semibold text-black pb-2 text-left">
          Location
        </h2>
        {locationString && (
          <div className="flex items-center gap-2 text-gray-400">
            <IoLocationOutline />
            <span className="text-sm md:text-base">{locationString}</span>
          </div>
        )}
      </div>
      <div className="">
        <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            src={osmEmbedUrl}
            title="Location Map"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <a
          href={`https://www.google.com/maps?q=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 "
        >
          View on Google Maps
        </a>
        <a
          href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          View on OpenStreetMap
        </a>
      </div>
    </div>
  );
};

export default ShowItemsLocation;
