"use client";

import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { brand } from "@/content/site";
import { openBooking, type BookingMode } from "@/lib/booking";
import { trackBookClick, trackGuidedStart } from "@/lib/tracking";
import { withUtm } from "@/lib/utm";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  children: ReactNode;
  /** Where on the page the button is, for measurement (e.g. "hero", "sticky"). */
  source: string;
  /** "direct" opens the calendar straight away; "guided" starts with the two questions. */
  mode?: BookingMode;
};

/**
 * Every booking button. It opens the booking dialog on this page. Without JavaScript (or if the
 * dialog can't open) it is a plain link to the Cal.com booking page, so booking always works.
 */
export function BookLink({ children, source, mode = "direct", onClick, ...rest }: Props) {
  const [href, setHref] = useState(brand.bookingUrl);

  useEffect(() => {
    setHref(withUtm(brand.bookingUrl));
  }, []);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let people open the Cal.com page in a new tab if they want to.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (mode === "guided") trackGuidedStart();
    else trackBookClick(source);
    if (openBooking(e.currentTarget, mode)) e.preventDefault();
    onClick?.(e);
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
