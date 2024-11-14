import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.teepee.kr',
      },
    ],
  },
};

export default nextConfig;
