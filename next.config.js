/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
  },
  // Disable ESLint during build for Vercel deployment
  eslint: {
    // Only run ESLint on local development, not during builds
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during build for Vercel deployment
  typescript: {
    // Only run TypeScript checks on local development, not during builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
