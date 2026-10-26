/**
 * Everything you might want to edit lives in this file: links, price, copy, FAQ, photos and the
 * Meta Pixel ID. Components read from here, so a change in one place updates the whole site.
 */

export type Img = { src: string; alt: string; width: number; height: number };

export const brand = {
  name: "R. Miller",
  coach: "Coach Miller",
  handle: "@rmillerflow",
  siteUrl: "https://rmillerflow-site.vercel.app",
  tiktokUrl: "https://www.tiktok.com/@rmillerflow",
  /** The Cal.com event. The calendar and every fallback link use it. */
  bookingUrl: "https://cal.com/rokas-miller-ovcrq8/30min",
  /** Same event, written the way the Cal.com embed wants it (no domain). */
  calLink: "rokas-miller-ovcrq8/30min",
  minimumAge: 18,
};

/** The offer. The amount people actually pay is set in Cal.com: keep the two in step. */
export const session = {
  name: "Private coaching call",
  durationMinutes: 30,
  priceLabel: "US$30",
  format: "Private video call",
  rescheduleHours: 24,
  reschedule: "Free rescheduling with at least 24 hours' notice.",
};

/**
 * Optional price promotion. Leave it null unless it is true.
 *
 * - "intro": an introductory price with a real end date. Shown as "US$30 intro price" with the
 *   note "US$60 from 1 January 2027". It switches itself off at `endsAt` (the page refreshes
 *   hourly), after which the site shows the plain price from `session`. On that date, raise the
 *   price in Cal.com and update `session.priceLabel` so the site and the payment match.
 * - "sale": a real reduction from a price you have actually charged. Norwegian rules
 *   (prisopplysningsforskriften § 9a and markedsføringsloven § 7) require the struck-through price
 *   to be the lowest price you charged in the 30 days before the sale started.
 */
export type PricePromo =
  | { kind: "intro"; regularLabel: string; from: string; endsAt: string }
  | { kind: "sale"; wasLabel: string; percentOff: number; untilLabel?: string; endsAt?: string };

export const pricePromo = {
  kind: "intro",
  regularLabel: "US$60",
  from: "1 January 2027",
  endsAt: "2027-01-01T00:00:00+01:00",
} as PricePromo | null;

/** The promotion if it is still running, otherwise null. */
export function activePromo(now: number = Date.now()): PricePromo | null {
  const promo = pricePromo;
  if (!promo) return null;
  if (promo.endsAt && now >= Date.parse(promo.endsAt)) return null;
  return promo;
}

/** "US$30 intro price" while the intro price runs, otherwise "US$30". */
export function priceText(promo: PricePromo | null): string {
  return promo?.kind === "intro" ? `${session.priceLabel} intro price` : session.priceLabel;
}

/** The small note under a price, or null when there is no promotion. */
export function promoNote(promo: PricePromo | null): string | null {
  if (!promo) return null;
  if (promo.kind === "intro") return `${promo.regularLabel} from ${promo.from}.`;
  return `${promo.percentOff}% off${promo.untilLabel ? ` until ${promo.untilLabel}` : ""}. Was ${promo.wasLabel}.`;
}

/**
 * Meta (Facebook/Instagram) Pixel. Paste the Pixel ID as a string, e.g. "123456789012345".
 * While this is null, no pixel, no cookie banner and no Meta wording appear anywhere on the site.
 */
export const meta = {
  pixelId: null as string | null,
};

export const images = {
  portrait: { src: "/images/me-portrait.jpg", alt: "Coach Miller by the sea", width: 842, height: 1052 } satisfies Img,
  coast: {
    src: "/images/me-coast.jpg",
    alt: "Coach Miller on a seaside path above the Mediterranean",
    width: 1160,
    height: 1450,
  } satisfies Img,
  cliff: {
    src: "/images/me-cliff.jpg",
    alt: "Coach Miller standing on a cliff edge, looking out over the sea",
    width: 1200,
    height: 1500,
  } satisfies Img,
};

export const header = {
  book: "Book a call",
};

export const hero = {
  eyebrow: "Personal coaching with Miller",
  title: "Get clear on",
  titleAccent: "food and training.",
  text: "One focused 30-minute call to find practical next steps for your food, training and everyday routine.",
  book: "Book my 30-minute call",
  guided: "Help me find my focus",
  photoTag: "Coach Miller",
  photoCaption: "10+ years exploring nutrition, training and ancestral health.",
};

export const leaveWith = {
  title: "Leave with clarity.",
  items: [
    { title: "Clearer priorities", text: "Identify what matters most for your current routine." },
    { title: "Practical next steps", text: "Find realistic changes you can start making." },
    { title: "A more personal approach", text: "Talk through what works for your circumstances and goals." },
  ],
};

export const howItWorks = {
  title: "How it works",
  steps: [
    { title: "Choose your time", text: `Pick a slot and pay ${session.priceLabel} when you book.` },
    { title: "Join your private video call", text: "30 minutes, one-on-one with Coach Miller." },
    { title: "Leave with practical next steps", text: "For your food, training and everyday routine." },
  ],
};

export const about = {
  title: "Meet Coach Miller",
  paragraphs: [
    "I'm Miller. I've spent over a decade exploring nutrition, training and ancestral health. My approach is about making better choices feel practical, sustainable and personal.",
    "Health should give you more freedom, not less. I look at food through an ancestral, animal-based lens, but it's a perspective I bring, not a diet you have to follow.",
  ],
  tiktok: "Follow @rmillerflow on TikTok",
};

export const faq = {
  title: "Common questions",
  items: [
    {
      q: "What will we talk about?",
      a: "Whatever matters most to you right now. Topics can include eating, training, sleep, energy, digestion, your goals, your schedule and your constraints.",
    },
    {
      q: "Is this call right for me?",
      a: "It's for adults aged 18 and over who want practical, personal next steps for food, training and everyday habits, whether you're just starting or have tried a lot already. Coaching is general fitness and nutrition education, not medical advice or treatment. If you have a medical condition or take medication, check with your doctor first.",
    },
    {
      q: "How does scheduling and payment work?",
      a: `Pick a time in the calendar, add your details and pay ${session.priceLabel} to confirm your call. Cal.com handles the booking and sends you a confirmation.`,
    },
    {
      q: "Can I reschedule?",
      a: "Yes, free of charge with at least 24 hours' notice.",
    },
    {
      q: "Do I have to follow an animal-based diet?",
      a: "No. It's a lens Coach Miller brings, not a diet you have to follow. We work from your preferences and your goals.",
    },
  ],
  /** Shown only while the intro price runs. */
  introPrice: (promo: Extract<PricePromo, { kind: "intro" }>) => ({
    q: "Will the price change?",
    a: `Yes. ${session.priceLabel} is an introductory price. From ${promo.from} a call will cost ${promo.regularLabel}. You pay the price shown when you book.`,
  }),
};

export const finalCta = {
  title: "Ready for some clarity?",
  text: "30 minutes, one-on-one, on video. Pick a time that suits you.",
  button: `Choose a time · ${session.priceLabel}`,
};

export const sticky = {
  label: `Book your call · ${session.priceLabel}`,
};

/** The booking dialog: the two optional questions and the calendar step. */
export const flow = {
  close: "Close",
  back: "Back",
  skip: "Skip to calendar",
  progress: (n: number) => `${n} of 2`,
  intro: "Two quick questions to help focus our call.",
  q1: {
    title: "What would you most like help with?",
    options: [
      { id: "food", label: "Food & nutrition", icon: "food" },
      { id: "training", label: "Training & fitness", icon: "training" },
      { id: "habits", label: "Everyday habits", icon: "habits" },
      { id: "everything", label: "A bit of everything", icon: "everything" },
    ],
  },
  q2: {
    title: "What's your biggest challenge right now?",
    options: [
      { id: "start", label: "Knowing where to start" },
      { id: "consistent", label: "Staying consistent" },
      { id: "advice", label: "Too much conflicting advice" },
      { id: "fit", label: "Finding what works for me" },
    ],
  },
  /** Calendar heading, personalised by the first answer. */
  calendarTitle: {
    direct: "Choose a time that works for you.",
    food: "Let's find a time to talk about your food choices.",
    training: "Let's find a time to talk about your training.",
    habits: "Let's find a time to talk about your everyday habits.",
    everything: "Let's find a time to talk it all through.",
  } as Record<string, string>,
  summaryWith: "With Coach Miller",
  payNote: `You pay when you book. ${session.reschedule}`,
  notesLabel: "Added to your booking notes:",
  calendarLoading: "Loading available times",
  calendarFallback: "Calendar not loading? Open it on Cal.com",
  fine: [
    "Calls are for adults aged 18 and over.",
    "Coaching is general fitness and nutrition education, not medical advice or treatment.",
  ],
};

export const footer = {
  statement: "Eat real food. Get stronger. Keep going.",
  disclaimer:
    "Coaching is general fitness and nutrition education for adults aged 18 and over. It is not medical advice, diagnosis, or treatment.",
  privacyNoPixel:
    "This site doesn't use cookies or ad trackers. It counts visits anonymously with Vercel Web Analytics, which works without cookies. Bookings are handled by Cal.com.",
  privacyWithPixel:
    "This site counts visits anonymously with Vercel Web Analytics, without cookies. If you accept, it also uses the Meta Pixel to measure my ads, which sets cookies. Bookings are handled by Cal.com.",
};

export const consent = {
  text: "Can I use the Meta Pixel? It sets cookies so I can see which of my Instagram and Facebook ads bring people here. The site works the same either way.",
  accept: "Accept",
  reject: "Reject",
  settings: "Cookie settings",
};

export const privacyPage = {
  /**
   * Add an email people can use for privacy questions, for example "hello@yourdomain.com".
   * While this is null, the page points to TikTok messages instead.
   */
  contactEmail: null as string | null,
  updated: "26 October 2026",
};
