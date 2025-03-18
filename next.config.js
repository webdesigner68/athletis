/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [],
  },
  serverExternalPackages: [],
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig; 