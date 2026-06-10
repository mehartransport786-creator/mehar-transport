import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Allow local network IP access in development (so JS loads when accessing via 192.168.x.x)
  allowedDevOrigins: [
    '192.168.8.4',
    '192.168.8.4:3000',
    'localhost',
    'localhost:3000',
    '0.0.0.0',
  ],
  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
