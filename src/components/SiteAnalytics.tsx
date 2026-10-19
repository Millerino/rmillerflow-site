"use client";

import { Analytics } from "@vercel/analytics/next";

/** Cookie-free visit counting (Vercel Web Analytics). Booking steps are added in src/lib/tracking.ts. */
export function SiteAnalytics() {
  return <Analytics />;
}
