/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    domains: ["exam.elevateegy.com", "localhost"],
  },
  env: {
    NEXTAUTH_SECRET: process.env.AUTH_SECRET,
  },
};

export default nextConfig;
