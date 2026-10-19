"use client";

import { useEffect, useRef, useState } from "react";
import { brand, nav } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowDown, Close, Menu } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="header" data-solid={scrolled || open}>
      <div className="wrap header__bar">
        <a className="wordmark" href="#top" aria-label={`${brand.name}, back to top`}>
          {brand.name}
        </a>

        <nav className="header__nav" aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} className="navlink" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <BookLink className="btn btn--small btn--header" source="header">
            <span className="header__book-long">Book a session</span>
            <span className="header__book-short">Book</span>
            <ArrowDown className="btn__icon btn__icon--down" width={16} height={16} />
          </BookLink>
          <button
            ref={buttonRef}
            type="button"
            className="header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div ref={menuRef} id="mobile-menu" className="mobile-menu" data-open={open} inert={!open}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
