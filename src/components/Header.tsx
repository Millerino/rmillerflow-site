"use client";

import { useEffect, useState } from "react";
import { brand, header } from "@/content/site";
import { BookLink } from "./BookLink";

/** Minimal header: name and one booking button. Gains a hairline once the page scrolls. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header" data-solid={scrolled}>
      <div className="wrap header__bar">
        <a className="wordmark" href="#top" aria-label={`${brand.name}, back to top`}>
          {brand.name}
        </a>
        <BookLink className="btn btn--forest btn--small" source="header">
          {header.book}
        </BookLink>
      </div>
    </header>
  );
}
