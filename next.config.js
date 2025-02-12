/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.thecocktaildb.com"],
  },
  experimental: {
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
