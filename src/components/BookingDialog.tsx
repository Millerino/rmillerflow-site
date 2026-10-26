"use client";

import { useEffect, useRef, useState } from "react";
import { booking, promoLine, session } from "@/content/site";
import { onOpenBooking, setBookingReady } from "@/lib/booking";
import { CalendarEmbed } from "./CalendarEmbed";
import { Close } from "./icons";

/**
 * Puts focus back on the button that opened the drawer. The floating button is hidden (inert)
 * while the drawer is open and only reappears a frame or two later, so keep trying briefly.
 */
function returnFocus(el: HTMLElement | null, tries = 12) {
  if (!el) return;
  el.focus({ preventScroll: true });
  if (document.activeElement !== el && tries > 0) {
    requestAnimationFrame(() => returnFocus(el, tries - 1));
  }
}

/**
 * Booking drawer: a native modal <dialog> with the offer summary on top and the Cal.com calendar
 * below. A bottom sheet on phones, a centred panel on larger screens.
 * Keyboard: focus moves into the drawer, Esc or the close button closes it, the rest of the page
 * is inert while it's open, and focus goes back to the button that opened it.
 */
export function BookingDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [opened, setOpened] = useState(false);
  const promo = promoLine();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || typeof dialog.showModal !== "function") return;
    setBookingReady(true);

    const off = onOpenBooking((from) => {
      if (dialog.open) return;
      opener.current = from ?? (document.activeElement as HTMLElement | null);
      dialog.showModal();
      document.documentElement.setAttribute("data-booking-open", "");
      setOpened(true);
    });

    const onClose = () => {
      document.documentElement.removeAttribute("data-booking-open");
      returnFocus(opener.current);
    };
    // A click on the dimmed backdrop (the dialog element itself, outside the panel) closes it.
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onClick);

    return () => {
      setBookingReady(false);
      off();
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <dialog ref={ref} className="drawer" aria-labelledby="drawer-title" aria-describedby="drawer-offer">
      <div className="drawer__panel">
        <div className="drawer__head">
          <div className="drawer__summary">
            <h2 id="drawer-title" className="drawer__title">
              {booking.drawerTitle}
            </h2>
            <div id="drawer-offer">
              <p className="drawer__offer">{session.name}</p>
              <p className="drawer__details">{session.details}</p>
              {promo && <p className="drawer__details drawer__promo">{promo}</p>}
              <p className="drawer__details">{session.reschedule}</p>
            </div>
          </div>
          <button type="button" className="drawer__close" aria-label={booking.close} onClick={() => ref.current?.close()}>
            <Close />
          </button>
        </div>
        <div className="drawer__body">
          <CalendarEmbed namespace="rm30drawer" load="manual" active={opened} />
          <div className="drawer__fine">
            {booking.fine.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
