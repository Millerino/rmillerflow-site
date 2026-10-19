import type { Metadata } from "next";
import { ConsentBanner, ConsentSettingsButton } from "@/components/Consent";
import { brand, privacyPage } from "@/content/site";
import { pixelEnabled } from "@/lib/tracking";

export const metadata: Metadata = {
  title: `Privacy | ${brand.name}`,
  description: `How ${brand.name}'s website handles visitor data.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="legal">
        <div className="wrap legal__wrap">
          <a className="legal__home" href="/">
            {brand.name}
          </a>
          <h1>Privacy</h1>
          <p className="legal__updated">Last updated {privacyPage.updated}</p>

          <p>
            This is the website of {brand.name}, who offers 1-on-1 fitness and nutrition coaching. It explains what
            happens with your data when you visit. In short: visits are counted without cookies, ad measurement only
            happens if you say yes, and bookings are handled by Cal.com.
          </p>

          <h2>Visit counting (no cookies)</h2>
          <p>
            The site uses Vercel Web Analytics to count visits and see which pages and buttons are used. It doesn&apos;t
            set cookies and doesn&apos;t identify you. Vercel also hosts the site and keeps short-lived technical logs
            (such as IP addresses) to run it securely.{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener">
              Vercel&apos;s privacy policy
            </a>
          </p>

          {pixelEnabled ? (
            <>
              <h2>Ad measurement with the Meta Pixel (only with your consent)</h2>
              <p>
                If you press Accept in the cookie banner, the site loads the Meta Pixel from Meta Platforms Ireland. It
                sets cookies (such as _fbp) and tells Meta that you visited, tapped a booking button, viewed the
                calendar or made a booking. This shows which Facebook and Instagram ads work. The legal basis is your
                consent. Meta may process this data outside the EU/EEA.{" "}
                <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener">
                  Meta&apos;s privacy policy
                </a>
              </p>
              <p>
                If you press Reject, or never answer, the pixel is not loaded. You can change your choice at any time:{" "}
                <ConsentSettingsButton />.
              </p>
            </>
          ) : (
            <>
              <h2>Ads and cookies</h2>
              <p>The site does not use ad trackers or cookies at the moment.</p>
            </>
          )}

          <h2>Booking</h2>
          <p>
            The booking calendar on the page is provided by Cal.com. When you pick a time and book, Cal.com processes
            the details you enter (such as your name and email) to schedule the session and send confirmations. If you
            arrived from an ad, the ad&apos;s campaign tags (utm_source, utm_campaign and similar) are passed along and
            saved with the booking so I can see which ads lead to bookings.{" "}
            <a href="https://cal.com/privacy" target="_blank" rel="noopener">
              Cal.com&apos;s privacy policy
            </a>
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask for access to, correction of, or deletion of your personal data, and you can withdraw consent
            at any time. You can also complain to your data protection authority (in Norway: Datatilsynet).
          </p>

          <h2>Contact</h2>
          <p>
            {privacyPage.contactEmail ? (
              <>
                Questions about privacy: <a href={`mailto:${privacyPage.contactEmail}`}>{privacyPage.contactEmail}</a>
              </>
            ) : (
              <>
                Questions about privacy: send me a message on{" "}
                <a href={brand.tiktokUrl} target="_blank" rel="noopener">
                  TikTok {brand.handle}
                </a>
                .
              </>
            )}
          </p>
        </div>
      </main>
      <ConsentBanner />
    </>
  );
}
