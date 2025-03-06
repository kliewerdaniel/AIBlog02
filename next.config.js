/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Disable automatic favicon generation
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure dynamic routes
  experimental: {
    // This helps with client-side components in App Router
    appDir: true,
  },
  // Ensure search page is treated as dynamic
  async headers() {
    return [
      {
        source: '/search',
        headers: [
          {
            key: 'x-nextjs-page-type',
            value: 'dynamic',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
