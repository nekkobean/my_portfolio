import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@eloisallena/web_components",
  ],
};

export default nextConfig;