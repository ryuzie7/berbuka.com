import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable turbopack explicitly (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
