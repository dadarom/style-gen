/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: isProduction ? 'export' : undefined,
  basePath: isProduction ? '/style-gen' : '',
  images: {
    unoptimized: isProduction,
  },
  assetPrefix: isProduction ? '/style-gen/' : '',
  trailingSlash: false,
  skipTrailingSlashRedirect: isProduction,
};

module.exports = nextConfig;