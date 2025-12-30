'use client';

import logo from '@/assets/florida-yacht-logo.png';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { subscribeEmail } from '@/services/email-subscribe/emailSubscribe';
import { FooterResponse, getFooter } from '@/services/footer/footer';
import { CheckCircle, Mail, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

// Map social media platform to icon component
const getSocialIcon = (platform: string) => {
  const platformLower = platform.toLowerCase();
  if (platformLower.includes('facebook')) return FaFacebookF;
  if (platformLower.includes('instagram')) return FaInstagram;
  if (platformLower.includes('twitter')) return FaTwitter;
  if (platformLower.includes('linkedin')) return FaLinkedinIn;
  return null;
};

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterResponse | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const data = await getFooter('JUPITER');
        setFooterData(data);
      } catch (error) {
        console.error('Error loading footer:', error);
      }
    };

    loadFooter();
  }, []);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setSubscribeStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    setIsSubscribing(true);
    setSubscribeStatus({ type: null, message: '' });

    try {
      await subscribeEmail(newsletterEmail, 'JUPITER');
      setSubscribeStatus({
        type: 'success',
        message: 'Successfully subscribed to newsletter!',
      });
      setNewsletterEmail(''); // Clear input on success

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      setSubscribeStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to subscribe. Please try again.',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Default/fallback data
  const companyName = footerData?.companyName || 'Jupiter Marine Sales';
  const companyDescription =
    footerData?.companyDescription ||
    "At Jupiter Marine Sales, we make buying and selling yachts effortless. Built exclusively for the Sunshine State, our platform connects passionate boaters, serious buyers, and trusted sellers in the nation's most vibrant yachting market.";
  const quickLinks = footerData?.quickLinks || [
    { url: '/', label: 'Home' },
    { url: '/search-listing', label: 'Boats' },
    { url: '/blogs', label: 'Blogs' },
    { url: '/contact', label: 'Contact' },
  ];
  const policyLinks = footerData?.policyLinks || [
    { url: '/faq', label: 'FAQs' },
    { url: '/privacy-policy', label: 'Privacy Policy' },
    { url: '/terms-and-conditions', label: 'Terms and Conditions' },
  ];
  const phone = footerData?.phone || '(954) 673-7702';
  const email = footerData?.email || 'info.jupitermarine@gmail.com';
  const socialMediaLinks = footerData?.socialMediaLinks || [];
  const copyrightText =
    footerData?.copyrightText ||
    '© Copyright 2025 by Jupiter Marine Sales. All rights reserved.';

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <CustomContainer>
        {/* Main Footer Content */}
        <div className=" mx-auto px-4 sm:px-5 lg:px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Member Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center p-2 bg-white">
                  <Image
                    src={logo}
                    alt={`${companyName} Logo`}
                    width={80}
                    height={80}
                    className="w-16 h-14"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">{companyName}</h2>
              </div>
              <div>
                <p className="text-gray-50 text-sm mb-3">
                  {companyDescription}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6">
                Helpful Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {policyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact and Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6">Need Help?</h3>
              <div className="space-y-3 sm:space-y-4 mb-6">
                {phone && (
                  <p className="text-gray-300 text-sm sm:text-base">{phone}</p>
                )}
                {email && (
                  <p className="text-gray-300 text-sm sm:text-base">{email}</p>
                )}
              </div>

              {/* Newsletter Subscription */}
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="example@email.com"
                    disabled={isSubscribing}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base pl-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>

                {/* Status Messages */}
                {subscribeStatus.type && (
                  <div
                    className={`flex items-center gap-2 text-sm p-2 rounded ${
                      subscribeStatus.type === 'success'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {subscribeStatus.type === 'success' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    <span>{subscribeStatus.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-gray-400 text-sm text-center sm:text-left">
                {copyrightText}
              </p>

              {/* Social Links */}
              {socialMediaLinks.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-gray-400 text-sm mr-3">
                    Stay Connected:
                  </span>
                  {socialMediaLinks.map((social, index) => {
                    const IconComponent = getSocialIcon(social.platform);
                    if (!IconComponent) return null;

                    return (
                      <Link
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-700 rounded transition-colors"
                        aria-label={social.platform}
                      >
                        <IconComponent className="text-white text-xl" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </CustomContainer>
    </footer>
  );
};

export default Footer;
