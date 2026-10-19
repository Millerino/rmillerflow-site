/**
 * Keeps the ad's UTM parameters for the whole visit (also if someone opens the privacy page and
 * comes back) so they can be handed to Cal.com, which stores them with the booking.
 */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = "rm-utm";

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value.slice(0, 200);
  }
  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        const out: Utm = {};
        for (const key of UTM_KEYS) {
          const v = (parsed as Record<string, unknown>)[key];
          if (typeof v === "string" && v) out[key] = v;
        }
        return out;
      }
    }
  } catch {
    // Storage can be blocked (private mode, in-app browsers). The URL values still work.
  }
  return fromUrl;
}

export function withUtm(url: string, utm: Utm = getUtm()): string {
  const u = new URL(url);
  for (const [key, value] of Object.entries(utm)) {
    if (value) u.searchParams.set(key, value);
  }
  return u.toString();
}
