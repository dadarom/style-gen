/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/style-gen',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/style-gen/',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;