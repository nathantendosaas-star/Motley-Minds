import type {NextConfig} from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  transpilePackages: ['motion/react'],
  poweredByHeader: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    serverComponentsHmrCache: true,
    optimizePackageImports: ['lucide-react', 'gsap', 'motion/react', 'lenis'],
  },
};

export default nextConfig;
