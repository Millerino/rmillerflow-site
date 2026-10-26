"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { openBooking } from "@/lib/booking";
import { trackBookClick } from "@/lib/tracking";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  children: ReactNode;
  /** Where on the page the button is, for measurement (e.g. "hero", "sticky"). */
  source: string;
};

/**
 * Every primary booking button. It opens the booking drawer with the Cal.com calendar straight
 * away. Without JavaScript (or if the drawer can't open) it is a plain link to the booking section.
 */
export function BookLink({ children, source, onClick, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    trackBookClick(source);
    if (openBooking(e.currentTarget)) e.preventDefault();
    onClick?.(e);
  }
  return (
    <a href="#book" onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
