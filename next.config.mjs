/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    domains: ["exam.elevateegy.com", "localhost"],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    API: process.env.API,

    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,

    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  },
};

export default nextConfig;
