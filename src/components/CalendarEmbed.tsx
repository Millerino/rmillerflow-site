"use client";

import { useEffect, useRef, useState } from "react";
import { booking, brand } from "@/content/site";
import { trackBooked, trackCalendarViewed } from "@/lib/tracking";
import { getUtm, withUtm } from "@/lib/utm";
import { ArrowUpRight } from "./icons";

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const NAMESPACE = "rm30";
const EMBED_SRC = "https://app.cal.com/embed/embed.js";

/** Cal.com's official loader (from @calcom/embed-snippet), queued until embed.js arrives. */
function installCalLoader() {
  const w = window as unknown as { Cal?: CalApi; document: Document };
  if (w.Cal) return;
  const push = (api: CalApi, args: unknown) => (api.q as unknown[]).push(args);
  const cal = function (...args: unknown[]) {
    const self = w.Cal as CalApi;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      w.document.head.appendChild(w.document.createElement("script")).src = EMBED_SRC;
      self.loaded = true;
    }
    if (args[0] === "init") {
      const api = function (...a: unknown[]) {
        push(api as CalApi, a);
      } as CalApi;
      api.q = api.q || [];
      const namespace = args[1];
      if (typeof namespace === "string") {
        self.ns![namespace] = self.ns![namespace] || api;
        push(self.ns![namespace] as CalApi, args);
        push(self, ["initNamespace", namespace]);
      } else push(self, args);
      return;
    }
    push(self, args);
  } as CalApi;
  w.Cal = cal;
}

/**
 * Inline Cal.com booking calendar. It loads when the visitor gets near the booking section (or taps
 * a Book button), so it costs nothing for people who never scroll that far.
 */
export function CalendarEmbed() {
  const boxRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [fallbackUrl, setFallbackUrl] = useState(brand.bookingUrl);

  useEffect(() => {
    setFallbackUrl(withUtm(brand.bookingUrl));

    function start() {
      if (started.current || !boxRef.current) return;
      started.current = true;
      setStatus("loading");
      installCalLoader();
      const Cal = window.Cal!;
      Cal("init", NAMESPACE, { origin: "https://app.cal.com" });
      const ns = Cal.ns![NAMESPACE];
      const utm = getUtm();
      ns("inline", {
        elementOrSelector: boxRef.current,
        calLink: brand.calLink,
        config: { layout: "month_view", theme: "light", ...utm },
      });
      ns("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: true,
        styles: { body: { background: "transparent" } },
        cssVarsPerTheme: { light: { "cal-brand": "#5a1b17" }, dark: { "cal-brand": "#e3ad4e" } },
      });
      ns("on", { action: "linkReady", callback: () => setStatus("ready") });
      ns("on", { action: "linkFailed", callback: () => setStatus("failed") });
      ns("on", { action: "bookerViewed", callback: () => trackCalendarViewed() });
      ns("on", { action: "bookingSuccessfulV2", callback: () => trackBooked() });
      // If Cal.com is blocked or very slow, offer the direct link instead of an empty box.
      window.setTimeout(() => setStatus((s) => (s === "loading" ? "failed" : s)), 15000);
    }

    const el = boxRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    // A tap on any Book button starts loading right away.
    const onHash = () => window.location.hash === "#book" && start();
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href="#book"]')) start();
    };
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    if (window.location.hash === "#book") start();
    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="calendar" data-status={status}>
      <div ref={boxRef} className="calendar__box" aria-label={booking.calendarTitle} />
      {status !== "ready" ? (
        <p className="calendar__status" aria-live="polite">
          {status === "failed" ? null : booking.calendarLoading}
        </p>
      ) : null}
      <a className="calendar__fallback" href={fallbackUrl} target="_blank" rel="noopener" data-prominent={status === "failed"}>
        {booking.calendarFallback}
        <ArrowUpRight width={16} height={16} />
      </a>
    </div>
  );
}
