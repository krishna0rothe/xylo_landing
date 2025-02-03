import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: "/xylo_landing/" ,
  basePath: "/xylo_landing" ,
  output: "export",
};

export default nextConfig;
