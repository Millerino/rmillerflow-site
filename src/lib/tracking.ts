/**
 * Client-side measurement, in one place.
 *
 * - Vercel Web Analytics (cookie-free, always on): the free plan can't record custom events, so
 *   booking steps are sent as "virtual" page views under /event/... and show up in the Pages list.
 * - Meta Pixel (ad measurement): loaded only after the visitor accepts cookies, and only when a
 *   Pixel ID is set in src/content/site.ts.
 */
import { pageview } from "@vercel/analytics";
import { meta, session } from "@/content/site";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type ConsentState = "granted" | "denied" | "unset";

const CONSENT_KEY = "rm-consent-v1";
const CONSENT_EVENT = "rm:consent-change";
const OPEN_SETTINGS_EVENT = "rm:open-consent";

export const pixelEnabled = typeof meta.pixelId === "string" && /^\d{5,20}$/.test(meta.pixelId);

export function readConsent(): ConsentState {
  if (!pixelEnabled) return "denied";
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

export function writeConsent(next: "granted" | "denied") {
  const previous = readConsent();
  try {
    localStorage.setItem(CONSENT_KEY, next);
  } catch {
    // If storage is blocked, the choice still applies for this page view.
  }
  if (next === "granted") {
    loadPixel();
  } else if (previous === "granted") {
    // Withdrawing consent: stop the pixel, remove its cookies and reload so its script is gone.
    window.fbq?.("consent", "revoke");
    for (const name of ["_fbp", "_fbc"]) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}`;
      document.cookie = `${name}=; Max-Age=0; path=/`;
    }
    window.location.reload();
    return;
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
}

export function onConsentChange(fn: (state: ConsentState) => void) {
  const handler = (e: Event) => fn((e as CustomEvent<ConsentState>).detail);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenConsentSettings(fn: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, fn);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, fn);
}

let pixelLoaded = false;

/** Meta's base code, run only after consent. Sends PageView for the current page. */
export function loadPixel() {
  if (!pixelEnabled || pixelLoaded || readConsent() !== "granted") return;
  pixelLoaded = true;
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    } as Fbq;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    window.fbq = n;
    if (!window._fbq) window._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  // Keep the data limited to the events below instead of Meta's automatic button scanning.
  window.fbq!("set", "autoConfig", false, meta.pixelId);
  window.fbq!("init", meta.pixelId);
  window.fbq!("track", "PageView");
}

function fbTrack(event: string, params?: Record<string, unknown>) {
  if (!pixelEnabled || readConsent() !== "granted" || !window.fbq) return;
  window.fbq("track", event, params);
}

const sentViews = new Set<string>();

/** Counts a booking step once per page load as a Vercel page view, e.g. "/event/book-click". */
function virtualView(path: string) {
  if (sentViews.has(path)) return;
  sentViews.add(path);
  try {
    pageview({ route: path, path });
  } catch {
    // Analytics is optional; never let it break booking.
  }
}

let leadSent = false;

function lead(source: string) {
  if (leadSent) return;
  leadSent = true;
  fbTrack("Lead", { content_name: session.name, content_category: source });
}

/** Someone tapped a direct booking button ("Book my 30-minute call", sticky, header...). */
export function trackBookClick(source: string) {
  virtualView("/event/book-click");
  lead(source);
}

/*
 * The optional two-question flow. Only the step is recorded, never the answers.
 */
export function trackGuidedStart() {
  virtualView("/event/guided-start");
}

export function trackGuidedAnswer(step: 1 | 2) {
  virtualView(`/event/guided-answer-${step}`);
}

export function trackGuidedSkip() {
  virtualView("/event/guided-skip");
}

/** The dialog was closed during the questions, before reaching the calendar. */
export function trackGuidedClose() {
  virtualView("/event/guided-close");
}

/** The calendar step of the booking dialog was shown (direct or after the questions). */
export function trackCalendarOpen() {
  virtualView("/event/calendar-open");
  lead("calendar");
}

/** Cal.com's booking calendar finished loading and became visible. */
export function trackCalendarViewed() {
  virtualView("/event/calendar-view");
  lead("calendar");
}

/** Cal.com failed to load (blocked, offline or too slow). */
export function trackCalendarError() {
  virtualView("/event/calendar-error");
}

/** Cal.com reported a completed booking in the embed. */
export function trackBooked() {
  virtualView("/event/booking-complete");
  fbTrack("Schedule", { content_name: session.name });
}
