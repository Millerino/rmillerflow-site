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

type Props = {
  /** Each calendar on the page needs its own Cal.com namespace. */
  namespace: string;
  /**
   * "near": load when the visitor scrolls close to it (or jumps to #book).
   * "manual": load only when `active` becomes true (the drawer opening).
   */
  load: "near" | "manual";
  active?: boolean;
};

/** Inline Cal.com booking calendar, loaded only when it's about to be needed. */
export function CalendarEmbed({ namespace, load, active = false }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "failed">("idle");
  const [fallbackUrl, setFallbackUrl] = useState(brand.bookingUrl);

  function start() {
    if (started.current || !boxRef.current) return;
    started.current = true;
    setStatus("loading");
    installCalLoader();
    const Cal = window.Cal!;
    Cal("init", namespace, { origin: "https://app.cal.com" });
    const ns = Cal.ns![namespace];
    ns("inline", {
      elementOrSelector: boxRef.current,
      calLink: brand.calLink,
      config: { layout: "month_view", theme: "light", ...getUtm() },
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

  useEffect(() => {
    setFallbackUrl(withUtm(brand.bookingUrl));
  }, []);

  useEffect(() => {
    if (load === "manual" && active) start();
  }, [load, active]);

  useEffect(() => {
    if (load !== "near") return;
    const el = boxRef.current;
    if (!el) return;
    const onHash = () => window.location.hash === "#book" && start();
    window.addEventListener("hashchange", onHash);
    if (window.location.hash === "#book") start();
    if (!("IntersectionObserver" in window)) {
      start();
      return () => window.removeEventListener("hashchange", onHash);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, [load]);

  return (
    <div className="calendar" data-status={status}>
      <div ref={boxRef} className="calendar__box" />
      {status === "loading" || status === "idle" ? (
        <p className="calendar__status" aria-live="polite">
          {booking.calendarLoading}
        </p>
      ) : null}
      <a
        className="calendar__fallback"
        href={fallbackUrl}
        target="_blank"
        rel="noopener"
        data-prominent={status === "failed"}
      >
        {booking.calendarFallback}
        <ArrowUpRight width={16} height={16} />
      </a>
    </div>
  );
}
