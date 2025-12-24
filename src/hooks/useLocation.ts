/**
 * Location Hook
 * Get user's current location (city and state) using browser geolocation and reverse geocoding
 */

import { useCallback, useEffect, useState } from 'react';

interface LocationData {
  city: string;
  state: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

interface LocationError {
  code: number;
  message: string;
}

interface UseLocationReturn {
  location: LocationData | null;
  loading: boolean;
  error: LocationError | null;
  getLocation: () => Promise<void>;
  clearLocation: () => void;
}

/**
 * Reverse geocode coordinates to get city and state
 * Uses OpenStreetMap Nominatim API (free, no API key required)
 */
const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<LocationData> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&zoom=10`,
    {
      headers: {
        'User-Agent': 'Diaz-Florida-Yacht-App/1.0', // Required by Nominatim
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }

  const data = await response.json();

  if (!data || !data.address) {
    throw new Error('No address data found');
  }

  const address = data.address;

  return {
    city:
      address.city || address.town || address.village || address.hamlet || '',
    state: address.state || address.region || '',
    country: address.country || '',
    latitude,
    longitude,
  };
};

/**
 * Get user's current location using browser geolocation API
 * Returns city and state names via reverse geocoding
 */
export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<LocationError | null>(null);

  /**
   * Get current location
   */
  const getLocation = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError({
        code: -1,
        message: 'Geolocation is not supported by this browser',
      });
      setLoading(false);
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000, // 10 seconds
            maximumAge: 300000, // 5 minutes
          });
        },
      );

      const { latitude, longitude } = position.coords;

      // Reverse geocode to get city and state
      const locationData = await reverseGeocode(latitude, longitude);

      setLocation(locationData);
    } catch (err) {
      let errorMessage = 'Failed to get location';
      let errorCode = 0;

      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            errorCode = err.PERMISSION_DENIED;
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            errorCode = err.POSITION_UNAVAILABLE;
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out';
            errorCode = err.TIMEOUT;
            break;
          default:
            errorMessage = err.message || 'Unknown geolocation error';
            errorCode = err.code;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
        errorCode = -2;
      }

      setError({
        code: errorCode,
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear location data
   */
  const clearLocation = useCallback(() => {
    setLocation(null);
    setError(null);
  }, []);

  return {
    location,
    loading,
    error,
    getLocation,
    clearLocation,
  };
};

/**
 * Hook to get location on mount (optional auto-load)
 */
export const useLocationAuto = (
  autoLoad: boolean = false,
): UseLocationReturn => {
  const locationHook = useLocation();

  useEffect(() => {
    if (autoLoad) {
      locationHook.getLocation();
    }
  }, [autoLoad, locationHook.getLocation]);

  return locationHook;
};

export default useLocation;
