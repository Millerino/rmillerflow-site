import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { brand } from "@/content/site";
import "./globals.css";

const display = localFont({
  src: [
    { path: "./fonts/big-shoulders-display-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "./fonts/big-shoulders-display-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
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

const title = "R. Miller | Real Food, Fitness & 1-on-1 Coaching";
const description =
  "Simple nutrition, strength training, and habits that stick. Explore R. Miller's practical approach to real-food living and book a 1-on-1 coaching session.";

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
  themeColor: "#5A1B17",
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
