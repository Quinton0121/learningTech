import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow other devices on the local network (like iPad/Phone) to load the JS properly
  experimental: {
    // some next.js versions use experimental for this
  },
  // the log specifically said top level
  allowedDevOrigins: ['192.168.31.222', '192.168.31.0/24', '192.168.1.0/24', '192.168.0.0/24', '10.0.0.0/8', '192.168.101.26', '192.168.101.0/24'],
};

export default nextConfig;
