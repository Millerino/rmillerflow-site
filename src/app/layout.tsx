import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { brand } from "@/content/site";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const body = localFont({
  src: [
    { path: "./fonts/instrument-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/instrument-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const title = "R. Miller | Personal coaching call with Coach Miller";
const description =
  "One focused 30-minute video call with Coach Miller to find practical next steps for your food, training and everyday routine. US$30, free rescheduling with at least 24 hours' notice.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F4EE",
  colorScheme: "light",
};

// Hide reveal targets only once JS is confirmed; undo it if the observer never starts.
const jsFlag =
  "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},3000);";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: brand.name,
  url: brand.siteUrl,
  image: `${brand.siteUrl}/images/me-portrait.jpg`,
  sameAs: [brand.tiktokUrl],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
