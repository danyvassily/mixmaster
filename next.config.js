/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.thecocktaildb.com"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
