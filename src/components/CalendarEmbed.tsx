"use client";

import { useEffect, useRef, useState } from "react";
import { brand, flow } from "@/content/site";
import { trackBooked, trackCalendarError, trackCalendarViewed } from "@/lib/tracking";
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

const CAL_ORIGIN = "https://app.cal.com";
const EMBED_SRC = `${CAL_ORIGIN}/embed/embed.js`;

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

/** Warms up the connection to Cal.com while the visitor answers the questions. */
export function preconnectCal() {
  if (document.querySelector(`link[data-cal-warm]`)) return;
  const pre = document.createElement("link");
  pre.rel = "preconnect";
  pre.href = CAL_ORIGIN;
  pre.dataset.calWarm = "";
  const script = document.createElement("link");
  script.rel = "preload";
  script.as = "script";
  script.href = EMBED_SRC;
  document.head.append(pre, script);
}

type Props = {
  /** Each calendar instance needs its own Cal.com namespace. */
  namespace: string;
  /** Prefills Cal.com's "Additional notes" field. */
  notes?: string;
};

/**
 * Inline Cal.com booking calendar (real availability, booking form and payment all come from
 * Cal.com). It starts loading when it mounts, which only happens when the calendar step opens.
 */
export function CalendarEmbed({ namespace, notes }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [fallbackUrl, setFallbackUrl] = useState(brand.bookingUrl);

  useEffect(() => {
    const utm = getUtm();
    const fallback = new URL(withUtm(brand.bookingUrl, utm));
    if (notes) fallback.searchParams.set("notes", notes);
    setFallbackUrl(fallback.toString());

    if (started.current || !boxRef.current) return;
    started.current = true;
    installCalLoader();
    const Cal = window.Cal!;
    Cal("init", namespace, { origin: CAL_ORIGIN });
    const ns = Cal.ns![namespace];
    ns("inline", {
      elementOrSelector: boxRef.current,
      calLink: brand.calLink,
      config: { layout: "month_view", theme: "light", ...utm, ...(notes ? { notes } : {}) },
    });
    ns("ui", {
      theme: "light",
      layout: "month_view",
      hideEventTypeDetails: true,
      styles: { body: { background: "transparent" } },
      cssVarsPerTheme: { light: { "cal-brand": "#263d33" }, dark: { "cal-brand": "#e9e2d7" } },
    });
    const fail = () => {
      setStatus("failed");
      trackCalendarError();
    };
    ns("on", { action: "linkReady", callback: () => setStatus("ready") });
    ns("on", { action: "linkFailed", callback: fail });
    ns("on", { action: "bookerViewed", callback: () => trackCalendarViewed() });
    ns("on", { action: "bookingSuccessfulV2", callback: () => trackBooked() });
    // If Cal.com is blocked or very slow, offer the direct link instead of an empty box.
    const timer = window.setTimeout(() => {
      setStatus((s) => {
        if (s === "loading") trackCalendarError();
        return s === "loading" ? "failed" : s;
      });
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [namespace, notes]);

  return (
    <div className="calendar" data-status={status}>
      <div ref={boxRef} className="calendar__box" />
      {status === "loading" ? (
        <p className="calendar__status" aria-live="polite">
          {flow.calendarLoading}
        </p>
      ) : null}
      <a
        className="calendar__fallback"
        href={fallbackUrl}
        target="_blank"
        rel="noopener"
        data-prominent={status === "failed"}
      >
        {flow.calendarFallback}
        <ArrowUpRight width={16} height={16} />
      </a>
    </div>
  );
}
