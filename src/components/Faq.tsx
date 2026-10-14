"use client";

import { useState } from "react";
import { faq } from "@/content/site";
import { Chevron } from "./icons";

export function Faq() {
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="section section--paper faq" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <h2 id="faq-title" data-reveal>
          {faq.title}
        </h2>
        <div data-reveal>
          <div className="accordion">
            {faq.items.map((item, i) => {
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
          <p className="faq__disclaimer">{faq.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
