/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/style-gen',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;