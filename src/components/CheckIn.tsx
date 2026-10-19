"use client";

import { useRef, useState } from "react";
import { checkIn } from "@/content/site";
import { BookLink } from "./BookLink";
import { ArrowDown, Check } from "./icons";

export function CheckIn() {
  const [selected, setSelected] = useState<string | null>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const current = checkIn.options.find((o) => o.id === selected) ?? null;

  function choose(id: string) {
    setSelected(id);
    // On small screens the tip appears below the options; bring it into view without a jump.
    requestAnimationFrame(() => {
      const el = answerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom > window.innerHeight) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
      }
    });
  }

  return (
    <section className="section section--iron checkin" id="check-in" aria-labelledby="checkin-title">
      <div className="wrap checkin__grid">
        <div className="checkin__head" data-reveal>
          <h2 id="checkin-title">{checkIn.title}</h2>
          <p className="lead">{checkIn.intro}</p>
        </div>

        <div className="checkin__body" data-reveal>
          <div className="checkin__options" role="group" aria-label={checkIn.intro}>
            {checkIn.options.map((o) => (
              <button
                key={o.id}
                type="button"
                className="chip"
                aria-pressed={selected === o.id}
                onClick={() => choose(o.id)}
              >
                <span className="chip__mark" aria-hidden="true">
                  <Check width={14} height={14} />
                </span>
                <span>{o.label}</span>
              </button>
            ))}
          </div>

          <div ref={answerRef} className="checkin__answer" aria-live="polite">
            {current ? (
              <div key={current.id} className="tip">
                <p className="tip__title">{current.title}</p>
                <p className="tip__text">{current.tip}</p>
                <div className="tip__cta">
                  <p className="tip__cta-lead">{checkIn.followUpLead}</p>
                  <BookLink className="btn btn--beeswax btn--small" source={`quiz-${current.id}`}>
                    {checkIn.followUpCta}
                    <ArrowDown className="btn__icon btn__icon--down" width={16} height={16} />
                  </BookLink>
                </div>
              </div>
            ) : (
              <p className="tip__placeholder">{checkIn.placeholder}</p>
            )}
          </div>
          <p className="checkin__disclaimer">{checkIn.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
