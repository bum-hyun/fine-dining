import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const wrap = withBundleAnalyzer({
  enabled: true,
  openAnalyzer: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    deviceSizes: [480, 768, 1024, 1440],
    imageSizes: [480, 768, 1024, 1440],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default wrap(nextConfig);
