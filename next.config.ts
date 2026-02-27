import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'floridayt.s3.eu-north-1.amazonaws.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.boatsgroup.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.yachtbroker.org',
      },
    ],
  },
};

export default nextConfig;
