import nextI18NextConfig from "./next-i18next.config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,
  images: {
    domains: [
      "s3-alpha-sig.figma.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
};

export default nextConfig;
