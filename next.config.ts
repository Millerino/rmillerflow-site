import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Booking happens on the home page; old /book links open the calendar straight away.
    return [{ source: "/book", destination: "/?start=book", permanent: false }];
  },
};

export default nextConfig;
