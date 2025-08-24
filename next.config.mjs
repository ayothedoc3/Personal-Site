/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add standalone output for Docker builds
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
}

export default nextConfig
