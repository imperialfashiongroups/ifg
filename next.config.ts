import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google profile pictures
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog'],
  },
};

export default nextConfig;
