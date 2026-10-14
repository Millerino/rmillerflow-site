import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & { children: ReactNode };

/**
 * Every booking action goes through /book, which counts the click and forwards to the Cal.com URL
 * in src/content/site.ts (brand.bookingUrl).
 */
export function BookLink({ children, ...rest }: Props) {
  return (
    <a href="/book" target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  );
}
