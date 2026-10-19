"use client";

import { useEffect, useState } from "react";
import { consent } from "@/content/site";
import {
  loadPixel,
  onOpenConsentSettings,
  openConsentSettings,
  pixelEnabled,
  readConsent,
  writeConsent,
} from "@/lib/tracking";

/**
 * Cookie banner for the Meta Pixel. Nothing from Meta loads until "Accept" is pressed.
 * Accept and Reject are equally easy, and the choice can be changed later from the footer.
 * Renders nothing at all while no Pixel ID is configured.
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!pixelEnabled) return;
    const state = readConsent();
    if (state === "granted") loadPixel();
    if (state === "unset") setOpen(true);
    return onOpenConsentSettings(() => setOpen(true));
  }, []);

  useEffect(() => {
    if (open) document.documentElement.setAttribute("data-consent-open", "");
    else document.documentElement.removeAttribute("data-consent-open");
  }, [open]);

  if (!pixelEnabled || !open) return null;

  function choose(next: "granted" | "denied") {
    setOpen(false);
    writeConsent(next);
  }

  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-text">
      <p id="consent-text" className="consent__text">
        {consent.text} <a href="/privacy">Privacy</a>
      </p>
      <div className="consent__actions">
        <button type="button" className="consent__btn" onClick={() => choose("denied")}>
          {consent.reject}
        </button>
        <button type="button" className="consent__btn" onClick={() => choose("granted")}>
          {consent.accept}
        </button>
      </div>
    </div>
  );
}

/** Footer link to reopen the banner. Hidden when no pixel is configured. */
export function ConsentSettingsButton() {
  if (!pixelEnabled) return null;
  return (
    <button type="button" className="linkbtn" onClick={openConsentSettings}>
      {consent.settings}
    </button>
  );
}
