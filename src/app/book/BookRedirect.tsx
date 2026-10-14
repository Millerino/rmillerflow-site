"use client";

import { useEffect } from "react";
import { brand } from "@/content/site";

/** Fallback for when the analytics script is blocked or slow: never keep anyone waiting long. */
export function BookRedirect() {
  useEffect(() => {
    const t = window.setTimeout(() => window.location.replace(brand.bookingUrl), 1500);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
