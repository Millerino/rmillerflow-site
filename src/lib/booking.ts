/**
 * Small bridge between the booking buttons and the booking drawer.
 * If the drawer can't open (no <dialog> support, or it hasn't mounted yet), buttons fall back to
 * their normal link behaviour and jump to the booking section (#book) instead.
 */

const OPEN_EVENT = "rm:open-booking";

declare global {
  interface Window {
    __rmBookingReady?: boolean;
  }
}

export function setBookingReady(ready: boolean) {
  window.__rmBookingReady = ready;
}

/** Returns true when the drawer will open, so the caller can cancel the link's default jump. */
export function openBooking(opener: HTMLElement | null): boolean {
  if (!window.__rmBookingReady) return false;
  window.dispatchEvent(new CustomEvent<{ opener: HTMLElement | null }>(OPEN_EVENT, { detail: { opener } }));
  return true;
}

export function onOpenBooking(fn: (opener: HTMLElement | null) => void) {
  const handler = (e: Event) => fn((e as CustomEvent<{ opener: HTMLElement | null }>).detail?.opener ?? null);
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
