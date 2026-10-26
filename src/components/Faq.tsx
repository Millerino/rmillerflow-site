"use client";

import { useState } from "react";
import { faq, type PricePromo } from "@/content/site";
import { Chevron } from "./icons";

/** Short, accessible accordion. The price question shows only while the intro price runs. */
export function Faq({ promo }: { promo: PricePromo | null }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const items = promo?.kind === "intro" ? [...faq.items.slice(0, 3), faq.introPrice(promo), ...faq.items.slice(3)] : faq.items;

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="section section--sand" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <h2 id="faq-title" data-reveal>
          {faq.title}
        </h2>
        <div className="accordion" data-reveal>
          {items.map((item, i) => {
            const isOpen = open.has(i);
            return (
              <div key={item.q} className="accordion__item" data-open={isOpen}>
                <h3 className="accordion__heading">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    className="accordion__btn"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.q}</span>
                    <Chevron className="accordion__chevron" />
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="accordion__panel"
                  inert={!isOpen}
                >
                  <div className="accordion__inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
