'use client';
import React, { useState, useEffect } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { FaWhatsapp, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { MdEmail, MdContentCopy } from 'react-icons/md';
import { toast } from 'sonner';

interface ShowItemsLocationProps {
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  boatTitle: string;
}

const ShowItemsLocation: React.FC<ShowItemsLocationProps> = ({
  location,
  boatTitle,
}) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const locationString = [location?.city, location?.state, location?.country]
    .filter(Boolean)
    .join(', ');

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = boatTitle
    ? `${boatTitle} | Jupiter Marine Sales`
    : 'Boat Listing | Jupiter Marine Sales';
  const shareText = boatTitle
    ? `Check out this boat: ${boatTitle}`
    : 'Check out this boat listing!';

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

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

      <div className="pt-5 pb-6">
        <h2 className="text-lg md:text-xl font-semibold text-black pb-4 text-left">
          Share with
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 md:w-full">
          <div className="md:w-full flex items-center gap-2 mb-4 bg-gray-100  rounded-lg px-4 py-3">
            <span className="md:flex-1 text-sm text-gray-500 md:truncate">
              {shareUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-2 py-2 text-gray-700 rounded-lg transition-colors text-sm font-medium"
              title="Copy link"
            >
              <MdContentCopy size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] flex items-center justify-center transition-colors"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp className="text-white" size={24} />
            </button>

            <button
              onClick={handleFacebookShare}
              className="w-12 h-12 rounded-full bg-[#1877F2] hover:bg-[#0d65d9] flex items-center justify-center transition-colors"
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              <FaFacebookF className="text-white" size={24} />
            </button>

            <button
              onClick={handleTwitterShare}
              className="w-12 h-12 rounded-full bg-[#1DA1F2] hover:bg-[#0d8bd9] flex items-center justify-center transition-colors"
              title="Share on Twitter"
              aria-label="Share on Twitter"
            >
              <FaTwitter className="text-white" size={24} />
            </button>

            <button
              onClick={handleEmailShare}
              className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-700 flex items-center justify-center transition-colors"
              title="Share via Email"
              aria-label="Share via Email"
            >
              <MdEmail className="text-white" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowItemsLocation;
