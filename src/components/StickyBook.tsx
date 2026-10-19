"use client";

import { useEffect, useState } from "react";
import { stickyCta } from "@/content/site";
import { BookLink } from "./BookLink";

/**
 * Phone-only bottom button. It appears once the hero's Book button has scrolled away and hides
 * while the price and calendar are on screen, or while the cookie banner is open.
 */
export function StickyBook() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.getElementById("hero-cta");
    const book = document.getElementById("book");
    const footer = document.querySelector("footer");
    const visible = new Set<Element>();
    const update = () => {
      const bannerOpen = document.documentElement.hasAttribute("data-consent-open");
      setShow(visible.size === 0 && !bannerOpen);
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      update();
    });
    [hero, book, footer].forEach((el) => el && io.observe(el));
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-consent-open"] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="sticky-book" data-show={show} inert={!show}>
      <BookLink className="btn btn--light btn--block" source="sticky">
        {stickyCta}
      </BookLink>
    </div>
  );
}
