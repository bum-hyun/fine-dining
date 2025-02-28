import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.restaurant-mingles.com',
      },
      {
        protocol: 'https',
        hostname: 'abacrestaurant.com',
      },
      {
        protocol: 'https',
        hostname: 'www.martinberasategui.com',
      },
      {
        protocol: 'https',
        hostname: 'akelarre.net',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default nextConfig;
