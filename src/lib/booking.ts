/**
 * Small bridge between the booking buttons and the booking dialog.
 * "direct" opens straight at the calendar; "guided" starts with the two optional questions.
 * If the dialog can't open (no <dialog> support, or it hasn't mounted yet), buttons fall back to
 * their normal link behaviour and open the Cal.com booking page instead.
 */

export type BookingMode = "direct" | "guided";

type Detail = { opener: HTMLElement | null; mode: BookingMode };

const OPEN_EVENT = "rm:open-booking";

declare global {
  interface Window {
    __rmBookingReady?: boolean;
  }
}

export function setBookingReady(ready: boolean) {
  window.__rmBookingReady = ready;
}

/** Returns true when the dialog will open, so the caller can cancel the link's default action. */
export function openBooking(opener: HTMLElement | null, mode: BookingMode = "direct"): boolean {
  if (!window.__rmBookingReady) return false;
  window.dispatchEvent(new CustomEvent<Detail>(OPEN_EVENT, { detail: { opener, mode } }));
  return true;
}

export function onOpenBooking(fn: (opener: HTMLElement | null, mode: BookingMode) => void) {
  const handler = (e: Event) => {
    const d = (e as CustomEvent<Detail>).detail;
    fn(d?.opener ?? null, d?.mode ?? "direct");
  };
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
