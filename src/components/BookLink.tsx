"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { trackBookClick } from "@/lib/tracking";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  children: ReactNode;
  /** Where on the page the button is, for measurement (e.g. "hero", "sticky"). */
  source: string;
};

/** Every "Book" button scrolls to the price and calendar section (#book) and counts the click. */
export function BookLink({ children, source, onClick, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    trackBookClick(source);
    onClick?.(e);
  }
  return (
    <a href="#book" onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
