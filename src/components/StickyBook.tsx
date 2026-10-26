"use client";

import { useEffect, useState } from "react";
import { sticky } from "@/content/site";
import { BookLink } from "./BookLink";

/**
 * Slim phone-only "Book your call · US$30" button. It appears once the main button has scrolled
 * away and steps aside whenever it would sit on top of another booking button or something that
 * matters: the closing booking section, the footer (cookie settings), the dialog or the cookie banner.
 */
export function StickyBook() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const targets = [
      document.getElementById("hero-cta"),
      document.getElementById("book"),
      document.querySelector("footer"),
    ].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const root = document.documentElement;
    const update = () => {
      const blocked = root.hasAttribute("data-consent-open") || root.hasAttribute("data-booking-open");
      setShow(visible.size === 0 && !blocked);
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      update();
    });
    targets.forEach((el) => io.observe(el));
    const mo = new MutationObserver(update);
    mo.observe(root, { attributes: true, attributeFilter: ["data-consent-open", "data-booking-open"] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="sticky-book" data-show={show} inert={!show}>
      <BookLink className="sticky-book__btn" source="sticky">
        {sticky.label}
      </BookLink>
    </div>
  );
}
