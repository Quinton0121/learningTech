import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow other devices on the local network (like iPad/Phone) to load the JS properly
  experimental: {
    // some next.js versions use experimental for this
  },
  // the log specifically said top level
  allowedDevOrigins: ['192.168.31.222', '192.168.31.0/24'],
};

export default nextConfig;
