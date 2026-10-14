"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { brand } from "@/content/site";

/**
 * Cookie-free page view counting (Vercel Web Analytics, free plan).
 *
 * The free plan can't count button clicks, so booking buttons go through /book first. That page
 * view is the click count. As soon as it has been handed to the analytics script we forward the
 * visitor to Cal.com; the /book page also has its own fallback redirect in case the script is
 * blocked or slow.
 */
function beforeSend(event: BeforeSendEvent): BeforeSendEvent {
  if (event.type === "pageview" && new URL(event.url).pathname === "/book") {
    window.setTimeout(() => window.location.replace(brand.bookingUrl), 150);
  }
  return event;
}

export function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
