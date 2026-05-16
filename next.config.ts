import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // ADDED: The secret tunnel to bypass CORS
  async rewrites() {
    return [
      {
        source: '/api/chat',
        destination: 'http://127.0.0.1:5000/predict', // Secretly routes to your Python backend!
      },
    ];
  },
};

export default nextConfig;