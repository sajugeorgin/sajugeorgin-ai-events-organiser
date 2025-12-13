import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**", // Only allow paths starting with '/photo-'
      },
    ],
  },
};

export default nextConfig;
