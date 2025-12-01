import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: true,
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    // allowedDevOrigins property is now at the root level
  },
  allowedDevOrigins: [
    'https://6000-firebase-studio-1760653920184.cluster-mdgxqvvkkbfpqrfigfiuugu5pk.cloudworkstations.dev',
    'https://9000-firebase-studio-1760653920184.cluster-mdgxqvvkkbfpqrfigfiuugu5pk.cloudworkstations.dev',
  ],
};

export default nextConfig;
