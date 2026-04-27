import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/toolbox-website' : '',
  assetPrefix: isProd ? '/toolbox-website/' : '',
};

export default nextConfig;
