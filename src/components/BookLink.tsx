import type { AnchorHTMLAttributes, ReactNode } from "react";
import { brand } from "@/content/site";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & { children: ReactNode };

/** Every booking action goes through here so the Cal.com URL lives in one place. */
export function BookLink({ children, ...rest }: Props) {
  return (
    <a href={brand.bookingUrl} target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  );
}
