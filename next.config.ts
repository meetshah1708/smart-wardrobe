import type { NextConfig } from "next";

// Start of Selection
const nextConfig: NextConfig = {
  experimental: {
    //serverActions: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      type: 'asset',
    });
    return config;
  },
};

export default nextConfig;


