/**
 * Everything you might want to edit lives in this file: links, price, copy, FAQ, photos and the
 * Meta Pixel ID. Components read from here, so a change in one place updates the whole site.
 */

export type Img = { src: string; alt: string; width: number; height: number };

export const brand = {
  name: "R. Miller",
  coach: "coach Miller",
  handle: "@rmillerflow",
  siteUrl: "https://rmillerflow-site.vercel.app",
  tiktokUrl: "https://www.tiktok.com/@rmillerflow",
  /** The Cal.com event. Both calendars on the page and the fallback link use it. */
  bookingUrl: "https://cal.com/rokas-miller-ovcrq8/30min",
  /** Same event, written the way the Cal.com embed wants it (no domain). */
  calLink: "rokas-miller-ovcrq8/30min",
  minimumAge: 18,
};

export const session = {
  name: "1-on-1 Fitness & Nutrition Coaching",
  durationMinutes: 30,
  price: 30,
  priceLabel: "US$30",
  currency: "USD",
  format: "One-on-one video call",
  rescheduleHours: 24,
  details: "30 minutes · US$30 · One-on-one video call",
  reschedule: "Free rescheduling up to 24 hours before your session.",
};

/**
 * Meta (Facebook/Instagram) Pixel. Paste the Pixel ID as a string, e.g. "123456789012345".
 * While this is null, no pixel, no cookie banner and no Meta wording appear anywhere on the site.
 */
export const meta = {
  pixelId: null as string | null,
};

export const images = {
  avatar: { src: "/images/avatar.jpg", alt: "R. Miller", width: 368, height: 368 } satisfies Img,
  portrait: { src: "/images/me-portrait.jpg", alt: "Coach Miller by the sea", width: 842, height: 1052 } satisfies Img,
};

export const nav = [
  { label: "What we'll cover", href: "#cover" },
  { label: "How it works", href: "#how" },
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faq" },
];

/**
 * Optional price promotion, shown next to the price in the first screen, the booking drawer and
 * the booking section. Leave it null unless it is true. The price people pay is always the one set
 * in Cal.com, so change it there too.
 *
 * - "intro": an introductory price with a real end date. Shows "Intro price" and
 *   "US$60 from 1 January 2027". When the date comes, raise the price in Cal.com and set this back
 *   to null.
 * - "sale": a real reduction from a price you have actually charged. Norwegian rules
 *   (prisopplysningsforskriften § 9a and markedsføringsloven § 7) require the struck-through price
 *   to be the lowest price you charged in the 30 days before the sale started. A price you never
 *   charged must not be shown as a "before" price.
 */
export type PricePromo =
  | { kind: "intro"; regularLabel: string; from: string }
  | { kind: "sale"; wasLabel: string; percentOff: number; until?: string };

export const pricePromo = {
  kind: "intro",
  regularLabel: "US$60",
  from: "1 January 2027",
} as PricePromo | null;

/** One short line describing the promotion, or null when there is none. */
export function promoLine(promo: PricePromo | null = pricePromo): string | null {
  if (!promo) return null;
  if (promo.kind === "intro") return `Intro price. ${promo.regularLabel} from ${promo.from}.`;
  return `${promo.percentOff}% off${promo.until ? ` until ${promo.until}` : ""}. Was ${promo.wasLabel}.`;
}

/** Labels for the booking buttons. Every one of them opens the same Cal.com calendar. */
export const cta = {
  primary: "Choose a time",
  /** The big button on the first screen. */
  start: "Book your coaching call",
  startSub: "Choose a time",
  short: "Book",
  sticky: "Choose a time · US$30",
};

export const hero = {
  kicker: "Meet coach Miller",
  intro: "10+ years exploring nutrition, training and ancestral health.",
  title: "Clearer food choices.",
  titleAccent: "A plan that fits your life.",
  text: "A focused 30-minute video call to discuss your routine and choose practical next steps for food, training and everyday habits.",
  /** The few options under the main button, for visitors who want to know more first. */
  optionsTitle: "Want to know more first?",
  options: [
    { label: "What we'll cover", href: "#cover" },
    { label: "How it works", href: "#how" },
    { label: "Meet coach Miller", href: "#about" },
    { label: "FAQs", href: "#faq" },
  ],
};

export const leaveWith = {
  title: "What you'll leave with",
  intro: "Practical next steps you can start on. Not a promise of specific results.",
  items: [
    {
      title: "Clearer priorities for your food choices",
      text: "Built around real food and what you actually like to eat.",
    },
    {
      title: "A realistic direction for strength training",
      text: "Matched to your schedule, your experience and the equipment you have.",
    },
    {
      title: "A small set of repeatable habits",
      text: "Chosen to fit the schedule you already have.",
    },
  ],
  topicsTitle: "Topics can include",
  topics: ["Eating", "Training", "Sleep", "Energy", "Digestion", "Goals", "Schedule", "Constraints"],
};

export const howItWorks = {
  title: "How the session works",
  steps: [
    {
      title: "Choose a time",
      text: "Pick a slot that suits you and pay US$30 when you book. Free rescheduling up to 24 hours before.",
    },
    {
      title: "Talk it through",
      text: "On a 30-minute video call, we go through your current routine, your goals and your constraints, like time and equipment.",
    },
    {
      title: "Leave with next steps",
      text: "Practical next steps for food, training and everyday habits that fit your life.",
    },
  ],
};

export const about = {
  title: "Health should give you more freedom, not less.",
  paragraphs: [
    "Hey, I'm coach Miller. I've spent over a decade exploring nutrition, training and ancestral health, and I share what I learn on TikTok.",
    "What I care about is freedom, health and vitality: food and training that fit around your life instead of taking it over.",
    "I look at food through an ancestral, animal-based-informed lens. It's a perspective I bring, not a diet you have to follow.",
  ],
  tiktokCta: "Follow @rmillerflow on TikTok",
  photos: [
    {
      src: "/images/me-coast.jpg",
      alt: "Coach Miller on a seaside path above the Mediterranean",
      width: 1160,
      height: 1450,
    },
    {
      src: "/images/me-cliff.jpg",
      alt: "Coach Miller standing on a cliff edge, looking out over the sea",
      width: 1200,
      height: 1500,
    },
  ] as Img[],
};

export const booking = {
  title: "Choose a time",
  intro: "Pick a time that suits you, add your details and pay US$30 to confirm your session.",
  drawerTitle: "Choose a time",
  close: "Close booking",
  calendarLoading: "Loading available times",
  calendarFallback: "Calendar not loading? Open it on Cal.com",
  fine: [
    "Sessions are for adults aged 18 and over.",
    "Coaching is general fitness and nutrition education, not medical advice or treatment.",
  ],
};

export const faq = {
  title: "Questions",
  items: [
    {
      q: "Is this for beginners?",
      a: "Yes. You don't need to have anything figured out before booking. We start with where you are.",
    },
    {
      q: "Do I have to follow an animal-based diet?",
      a: "No. Ancestral and animal-based nutrition is a lens coach Miller brings, not a diet you have to follow. We work from what suits you, your preferences and your goals.",
    },
    {
      q: "Do I need a gym membership?",
      a: "Not necessarily. We'll talk about training options that fit your schedule and the equipment you have.",
    },
    {
      q: "What happens after the call?",
      a: "You leave with the next steps we agreed on. This is a single paid session, and there's no obligation to book anything else.",
    },
    ...(pricePromo?.kind === "intro"
      ? [
          {
            q: "Will the price change?",
            a: `Yes. ${session.priceLabel} is an introductory price. From ${pricePromo.from} a session will cost ${pricePromo.regularLabel}. You pay the price shown when you book.`,
          },
        ]
      : []),
    {
      q: "Can I reschedule?",
      a: "Yes, free of charge up to 24 hours before your session.",
    },
    {
      q: "Who can book?",
      a: "Anyone aged 18 or over.",
    },
    {
      q: "Is this medical advice?",
      a: "No. Coaching is general fitness and nutrition education, not medical advice or treatment. If you have a medical condition or take medication, check with your doctor first.",
    },
  ],
  closing: "Ready when you are.",
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
