import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Booking now happens on the home page; keep old /book links working.
    return [{ source: "/book", destination: "/#book", permanent: false }];
  },
};

export default nextConfig;
