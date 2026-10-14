import type { Metadata } from "next";
import { brand } from "@/content/site";
import { BookRedirect } from "./BookRedirect";

export const metadata: Metadata = {
  title: "Opening the booking calendar | R. Miller",
  robots: { index: false, follow: false },
};

/** Counted as a page view, then forwards to Cal.com (see SiteAnalytics). */
export default function BookPage() {
  return (
    <main className="handoff">
      {/* Works even with JavaScript turned off. */}
      <meta httpEquiv="refresh" content={`3;url=${brand.bookingUrl}`} />
      <p className="handoff__title">Opening the booking calendar</p>
      <p className="handoff__text">
        If nothing happens, <a href={brand.bookingUrl}>continue to Cal.com</a>.
      </p>
      <BookRedirect />
    </main>
  );
}
