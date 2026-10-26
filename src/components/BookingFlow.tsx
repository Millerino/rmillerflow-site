"use client";

import { useEffect, useRef, useState } from "react";
import { flow, priceText, promoNote, session, type PricePromo } from "@/content/site";
import { onOpenBooking, setBookingReady, type BookingMode } from "@/lib/booking";
import {
  trackBookClick,
  trackCalendarOpen,
  trackGuidedAnswer,
  trackGuidedClose,
  trackGuidedSkip,
  trackGuidedStart,
} from "@/lib/tracking";
import { CalendarEmbed, preconnectCal } from "./CalendarEmbed";
import { ArrowLeft, Check, Close, choiceIcons } from "./icons";

type Step = "q1" | "q2" | "calendar";

/**
 * Puts focus back on the button that opened the dialog. The floating button is hidden (inert)
 * while the dialog is open and only reappears a frame or two later, so keep trying briefly.
 */
function returnFocus(el: HTMLElement | null, tries = 12) {
  if (!el || !el.isConnected) return;
  el.focus({ preventScroll: true });
  if (document.activeElement !== el && tries > 0) {
    requestAnimationFrame(() => returnFocus(el, tries - 1));
  }
}

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const labelOf = (options: { id: string; label: string }[], id: string | null) =>
  options.find((o) => o.id === id)?.label ?? null;

/**
 * The booking dialog, shared by both paths:
 * - Direct ("Book my 30-minute call" and every other booking button): opens at the calendar.
 * - Guided ("Help me find my focus"): two optional questions, then the same calendar, with the
 *   answers prefilled into Cal.com's booking notes.
 * Full screen on phones, a centred panel on larger screens. Esc, the close button or a click
 * outside closes it; focus returns to the button that opened it.
 */
export function BookingFlow({ promo }: { promo: PricePromo | null }) {
  const ref = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const advance = useRef<number | undefined>(undefined);
  const calCount = useRef(0);

  const [mode, setMode] = useState<BookingMode>("direct");
  const [step, setStep] = useState<Step>("calendar");
  const [focusArea, setFocusArea] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  /** The running calendar and the notes it was started with; null until first shown. */
  const [cal, setCal] = useState<{ ns: string; notes: string } | null>(null);
  const [openCount, setOpenCount] = useState(0);

  const stepRef = useRef(step);
  stepRef.current = step;
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const focusLabel = labelOf(flow.q1.options, focusArea);
  const challengeLabel = labelOf(flow.q2.options, challenge);
  const notes =
    mode === "guided" && (focusLabel || challengeLabel)
      ? [focusLabel && `Focus: ${focusLabel}.`, challengeLabel && `Biggest challenge: ${challengeLabel}.`]
          .filter(Boolean)
          .join(" ")
      : "";

  // Open requests from any booking button, plus ?start=guided / ?start=book links.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || typeof dialog.showModal !== "function") return;
    setBookingReady(true);

    const open = (from: HTMLElement | null, m: BookingMode) => {
      if (dialog.open) return;
      window.clearTimeout(advance.current);
      opener.current = from ?? (document.activeElement as HTMLElement | null);
      setMode(m);
      if (m === "guided") {
        preconnectCal();
        setStep("q1");
      } else {
        setStep("calendar");
      }
      dialog.showModal();
      document.documentElement.setAttribute("data-booking-open", "");
      setOpenCount((n) => n + 1);
    };
    const off = onOpenBooking(open);

    const onClose = () => {
      window.clearTimeout(advance.current);
      document.documentElement.removeAttribute("data-booking-open");
      if (modeRef.current === "guided" && stepRef.current !== "calendar") trackGuidedClose();
      returnFocus(opener.current);
    };
    // A click on the dimmed backdrop (the dialog element itself, outside the panel) closes it.
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onClick);

    const start = new URLSearchParams(window.location.search).get("start");
    if (start === "guided") {
      trackGuidedStart();
      open(null, "guided");
    } else if (start === "book") {
      trackBookClick("link");
      open(null, "direct");
    }

    return () => {
      setBookingReady(false);
      off();
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onClick);
    };
  }, []);

  // Every time a step appears: move focus to its heading so it is announced, and start the
  // calendar the first time the calendar step is shown (or restart it if the answers changed).
  useEffect(() => {
    if (openCount === 0) return;
    if (step === "calendar") {
      trackCalendarOpen();
      setCal((current) =>
        current && current.notes === notes ? current : { ns: `rmflow${++calCount.current}`, notes },
      );
    }
    const id = requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(id);
    // `notes` is read when the calendar step opens; changing answers later restarts it then.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, openCount]);

  function go(next: Step, delay = 0) {
    window.clearTimeout(advance.current);
    if (delay === 0 || reducedMotion()) setStep(next);
    else advance.current = window.setTimeout(() => setStep(next), delay);
  }

  function choose(question: 1 | 2, id: string) {
    if (question === 1) setFocusArea(id);
    else setChallenge(id);
    trackGuidedAnswer(question);
    go(question === 1 ? "q2" : "calendar", 220);
  }

  function back() {
    go(step === "calendar" ? "q2" : "q1");
  }

  function skip() {
    trackGuidedSkip();
    go("calendar");
  }

  const close = () => ref.current?.close();
  const showBack = mode === "guided" && step !== "q1";
  const questionNumber = step === "q1" ? 1 : step === "q2" ? 2 : null;
  const calTitle = flow.calendarTitle[mode === "guided" && focusArea ? focusArea : "direct"] ?? flow.calendarTitle.direct;

  const note = promoNote(promo);

  return (
    <dialog ref={ref} className="flow" aria-labelledby="flow-title" data-step={step}>
      <div className="flow__panel">
        <div className="flow__bar">
          <div className="flow__bar-side">
            {showBack ? (
              <button type="button" className="flow__back" onClick={back}>
                <ArrowLeft />
                {flow.back}
              </button>
            ) : null}
          </div>
          {questionNumber ? (
            <p className="flow__progress">
              <span className="sr-only">Question </span>
              {flow.progress(questionNumber)}
              <span className="flow__dots" aria-hidden="true">
                <span data-on={questionNumber >= 1} />
                <span data-on={questionNumber >= 2} />
              </span>
            </p>
          ) : (
            <span />
          )}
          <div className="flow__bar-side flow__bar-side--end">
            <button type="button" className="flow__close" aria-label={flow.close} onClick={close}>
              <Close />
            </button>
          </div>
        </div>

        <div className="flow__scroll">
          {step === "q1" ? (
            <section className="flow__step" key="q1">
              <p className="flow__intro">{flow.intro}</p>
              <h2 id="flow-title" ref={headingRef} tabIndex={-1} className="flow__title">
                {flow.q1.title}
              </h2>
              <div className="choices choices--grid" role="group" aria-labelledby="flow-title">
                {flow.q1.options.map((o) => {
                  const Icon = choiceIcons[o.icon as keyof typeof choiceIcons];
                  const on = focusArea === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className="choice choice--tile"
                      aria-pressed={on}
                      onClick={() => choose(1, o.id)}
                    >
                      <Icon className="choice__icon" />
                      <span className="choice__label">{o.label}</span>
                      <span className="choice__tick" aria-hidden="true">
                        <Check />
                      </span>
                    </button>
                  );
                })}
              </div>
              <button type="button" className="flow__skip" onClick={skip}>
                {flow.skip}
              </button>
            </section>
          ) : null}

          {step === "q2" ? (
            <section className="flow__step" key="q2">
              <h2 id="flow-title" ref={headingRef} tabIndex={-1} className="flow__title">
                {flow.q2.title}
              </h2>
              <div className="choices" role="group" aria-labelledby="flow-title">
                {flow.q2.options.map((o) => {
                  const on = challenge === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      className="choice choice--row"
                      aria-pressed={on}
                      onClick={() => choose(2, o.id)}
                    >
                      <span className="choice__label">{o.label}</span>
                      <span className="choice__tick" aria-hidden="true">
                        <Check />
                      </span>
                    </button>
                  );
                })}
              </div>
              <button type="button" className="flow__skip" onClick={skip}>
                {flow.skip}
              </button>
            </section>
          ) : null}

          {/* The calendar stays mounted once started, so going back to a question and returning
              doesn't reload it. It is hidden and inert while a question is showing. */}
          <div className="flow__calendar" data-hidden={step !== "calendar"} inert={step !== "calendar"}>
            {step === "calendar" ? (
              <h2 id="flow-title" ref={headingRef} tabIndex={-1} className="flow__title flow__title--cal">
                {calTitle}
              </h2>
            ) : null}

            <div className="summary">
              <div className="summary__main">
                <p className="summary__name">{session.name}</p>
                <p className="summary__with">{flow.summaryWith}</p>
              </div>
              <p className="summary__price">
                {session.durationMinutes} minutes · {priceText(promo)}
                {note ? <span className="summary__note">{note}</span> : null}
              </p>
              <p className="summary__pay">{flow.payNote}</p>
            </div>

            {mode === "guided" && notes ? (
              <p className="flow__notes">
                <span>{flow.notesLabel}</span> {notes}
              </p>
            ) : null}

            {cal ? <CalendarEmbed key={cal.ns} namespace={cal.ns} notes={cal.notes || undefined} /> : null}

            <div className="flow__fine">
              {flow.fine.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
