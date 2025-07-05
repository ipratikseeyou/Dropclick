import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper handling of both routing systems
  trailingSlash: false,
  // Add proper output configuration for Vercel
  output: 'standalone',
  // Ensure proper handling of static assets
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
