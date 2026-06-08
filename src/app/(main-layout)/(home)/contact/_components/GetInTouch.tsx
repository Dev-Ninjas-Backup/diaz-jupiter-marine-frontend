'use client';

import {
  ContactInfoResponse,
  getContactInfo,
} from '@/services/contact/contact';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaLink,
} from 'react-icons/fa';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NoDataFound from '@/components/shared/NoDataFound/NoDataFound';

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('facebook')) return <FaFacebookF className="w-6 h-6" />;
  if (p.includes('linkedin')) return <FaLinkedinIn className="w-6 h-6" />;
  if (p.includes('twitter') || p === 'x')
    return <FaTwitter className="w-6 h-6" />;
  if (p.includes('youtube')) return <FaYoutube className="w-6 h-6" />;
  if (p.includes('instagram')) return <FaInstagram className="w-6 h-6" />;
  if (p.includes('tiktok')) return <FaTiktok className="w-6 h-6" />;
  return <FaLink className="w-6 h-6" />;
};

const GetInTouch = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfoResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getContactInfo('JUPITER');
        if (data) {
          setContactInfo(data);
        } else {
          setError('Failed to load contact information');
        }
      } catch (err) {
        setError('Error loading contact information');
        console.error('Error fetching contact info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  if (loading) {
    return (
      <div className="relative bg-linear-to-r from-[#006EF0] to-[#00CABE] rounded-2xl overflow-hidden">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner message="Loading contact information..." />
        </div>
      </div>
    );
  }

  if (error || !contactInfo) {
    return (
      <div className="relative bg-linear-to-r from-[#006EF0] to-[#00CABE] rounded-2xl overflow-hidden">
        <div className="px-6 md:px-10 lg:px-12 py-10 md:py-12 lg:py-16">
          <NoDataFound
            dataTitle="contact information"
            noDataText={error || 'No contact information found.'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-linear-to-r from-[#006EF0] to-[#00CABE] rounded-2xl overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 px-6 md:px-10 lg:px-12 py-10 md:py-12 lg:py-16">
        {/* Get In Touch With Us */}
        <div className="text-white space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Get In Touch With Us
          </h2>

          {/* Address */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Address:</h3>
            <p className="flex items-start gap-2">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 stroke-[1.5]" />
              <span>{contactInfo.address}</span>
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Email:</h3>
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 shrink-0 stroke-[1.5]" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:underline"
              >
                {contactInfo.email}
              </a>
            </p>
          </div>

          {/* Call */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Call:</h3>
            <p className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 shrink-0 stroke-[1.5]" />
              <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                {contactInfo.phone}
              </a>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            {Object.entries(contactInfo.socialMedia || {}).map(
              ([platform, value]) => {
                if (!value) return null;
                return (
                  <a
                    key={platform}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity hover:scale-110 transform"
                    aria-label={platform}
                    title={platform}
                  >
                    {getSocialIcon(platform)}
                  </a>
                );
              },
            )}
          </div>
        </div>

        {/* Working Hours */}
        <div className="text-white space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Working Hours</h2>

          <ul className="space-y-3">
            {contactInfo.workingHours && contactInfo.workingHours.length > 0 ? (
              contactInfo.workingHours.map((workingHour, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    {workingHour.day}: {workingHour.hours}
                  </span>
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>No working hours available</span>
              </li>
            )}
          </ul>
        </div>

        {/* Yacht Image */}
        {contactInfo.backgroundImage?.url && (
          <div className="hidden max-h-60 lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-md">
              <Image
                src={contactInfo.backgroundImage.url}
                alt="Yacht"
                width={400}
                height={300}
                className="w-full h-auto object-contain drop-shadow-2xl scale-150"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetInTouch;
