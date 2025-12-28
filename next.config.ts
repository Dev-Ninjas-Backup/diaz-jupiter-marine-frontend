import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: path.resolve(__dirname),
    },
  },
  images: {
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
    ],
  },
};

export default nextConfig;
