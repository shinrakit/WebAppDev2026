import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['10.50.11.49'],
  reactCompiler: true, 
  reactStrictMode: true,
  cacheComponents: true,
};

export default nextConfig;

