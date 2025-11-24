/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/style-gen',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
