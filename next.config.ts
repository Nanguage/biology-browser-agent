import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/public_hubs/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, HEAD, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Range" },
          { key: "Access-Control-Expose-Headers", value: "Accept-Ranges, Content-Length, Content-Range" },
        ],
      },
    ];
  },
};

export default nextConfig;
