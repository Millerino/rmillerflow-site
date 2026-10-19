/**
 * Everything you might want to edit lives in this file: links, price, copy, FAQ, images and the
 * Meta Pixel ID. Components read from here, so a change in one place updates the whole site.
 */

export type Img = { src: string; alt: string; width: number; height: number };

export const brand = {
  name: "R. Miller",
  handle: "@rmillerflow",
  siteUrl: "https://rmillerflow-site.vercel.app",
  tiktokUrl: "https://www.tiktok.com/@rmillerflow",
  /** The Cal.com event. The calendar on the page and the fallback link both use it. */
  bookingUrl: "https://cal.com/rokas-miller-ovcrq8/30min",
  /** Same event, written the way the Cal.com embed wants it (no domain). */
  calLink: "rokas-miller-ovcrq8/30min",
  minimumAge: 18,
};

export const session = {
  /** Use this name everywhere: on the page, in ads and (ideally) as the Cal.com event title. */
  name: "1-on-1 Fitness & Nutrition Coaching",
  format: "1-on-1 video call",
  durationMinutes: 30,
  price: 30,
  currency: "USD",
  /**
   * Shown crossed out next to the price. Only set this if it was a real previous or regular price
   * (for example 100). Leave it as null otherwise.
   */
  previousPrice: null as number | null,
  rescheduleHours: 24,
  trustLine: "30 min · $30 · free rescheduling",
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
  /**
   * The large front-facing photo in the hero. Put the file in public/images/ (at least 900px wide,
   * portrait orientation works best) and fill in its size, for example:
   * { src: "/images/portrait.jpg", alt: "R. Miller", width: 1200, height: 1500 }
   * Until then the hero uses the small avatar above.
   */
  portrait: { src: "/images/me-portrait.jpg", alt: "R. Miller by the sea", width: 842, height: 1052 } as Img | null,
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Approach", href: "#approach" },
  { label: "How I help", href: "#coaching" },
  { label: "FAQs", href: "#faq" },
];

export const hero = {
  hello: "Hey, I'm",
  intro: "10+ years in nutrition, training and ancestral health.",
  titleLines: ["Real food.", "Strong body."],
  titleAccent: "A plan that fits your life.",
  sessionText: "A 30-minute video call where we build a simple plan around your life.",
  primaryCta: "Book a session",
  secondaryCta: { label: "See how I can help", href: "#approach" },
};

export const proof = {
  title: "As seen on my TikTok",
  intro: "Real food, simple swaps and everyday habits. This is the kind of thing I post.",
  /**
   * Real numbers only, copied from TikTok. Leave the list empty to hide the stats row.
   * Example: { value: "449K", label: "views on my most-watched video" }
   */
  stats: [] as { value: string; label: string }[],
  /** Shown under the stats, for example "Numbers from October 2026". */
  statsNote: "",
  images: [
    {
      src: "/images/board-steak.jpg",
      alt: "Wooden board with steak, berries, pineapple, eggs, raw honey, butter, watermelon and chicken",
      width: 1080,
      height: 810,
      caption: "Animal-based, with fruit",
    },
    {
      src: "/images/board-fish.jpg",
      alt: "Wooden board with wild-caught fish, bone marrow, ghee, tallow, whole milk and avocado",
      width: 1080,
      height: 810,
      caption: "Fats and fish I cook with",
    },
    {
      src: "/images/board-organs.jpg",
      alt: "Wooden board with raw heart and liver, Parmigiano Reggiano and homemade ice cream",
      width: 1080,
      height: 810,
      caption: "Organ meats and real treats",
    },
  ] as (Img & { caption: string })[],
  cta: "Follow @rmillerflow on TikTok",
  /**
   * Testimonials stay hidden until this list has at least one entry. Only add real quotes from
   * real clients, with their permission. Example:
   * { quote: "...", name: "Anna", detail: "Oslo" }
   */
  testimonialsTitle: "What people say",
  testimonials: [] as { quote: string; name: string; detail?: string }[],
};

export const problem = {
  title: "You probably don't need more information.",
  answer: "You need a simpler way forward.",
  body: "Between conflicting advice, busy schedules, and a hundred different health trends, it's easy to overcomplicate things. Most people don't need another list of rules. They need to know what matters for them, and how to make it stick.",
  points: [
    { title: "Too much advice.", text: "You don't know what to follow anymore." },
    { title: "Not enough consistency.", text: "You start strong, then real life gets in the way." },
    { title: "No clear direction.", text: "You want results but aren't sure where to focus." },
    { title: "Everything feels complicated.", text: "Eating and training well shouldn't consume your whole day." },
  ],
};

export const approach = {
  title: "Keep the basics. Lose the noise.",
  intro: "My approach is built around real food, practical movement, and habits that work in real life.",
  principles: [
    {
      title: "Eat real food",
      text: "Build meals around satisfying, minimally processed foods, in a way of eating that fits your preferences, needs, and goals.",
      note: "I lean animal-based and ancestral myself. Your plan is built around you, not around my plate.",
    },
    {
      title: "Get stronger",
      text: "Find a training direction that fits your schedule, experience, and goals. Consistency matters more than the perfect routine.",
    },
    {
      title: "Make it stick",
      text: "Build a few meaningful habits you can repeat, even when life gets busy.",
    },
  ],
  statement: ["Simple doesn't mean easy.", "It means you can actually do it."],
};

export const checkIn = {
  title: "What's getting in your way?",
  intro: "Pick the one that sounds most like you.",
  placeholder: "Pick one and a quick, practical tip shows up here.",
  disclaimer: "A general tip to get you started, not a personal assessment.",
  followUpLead: "Want this tailored to you?",
  followUpCta: "Book a session",
  options: [
    {
      id: "consistency",
      label: "I eat pretty well, but can't stay consistent.",
      title: "Start smaller than you think",
      tip: "Don't try to overhaul everything on Monday. Start with one meal or routine you can repeat on your busiest day. Build from there.",
    },
    {
      id: "confused",
      label: "I'm always confused about what to eat.",
      title: "Begin with a few good meals",
      tip: "Start with a few balanced meals made from foods you enjoy. You don't need a perfect diet before you can make progress.",
    },
    {
      id: "time",
      label: "I want to train, but I'm short on time.",
      title: "Repeatable beats perfect",
      tip: "You don't need a complicated six-day split. A manageable routine you can repeat consistently is a better starting point.",
    },
    {
      id: "energy",
      label: "I just want to feel better and have more energy.",
      title: "Check the basics first",
      tip: "Look at the basics first: enough food, regular sleep, hydration, and movement. If fatigue persists, it's worth getting medical advice rather than guessing.",
    },
  ],
};

/** "How I help": coaching, what you leave with, price and the booking calendar, in one section. */
export const coaching = {
  title: "Sometimes you just need a clear plan.",
  intro: "That's where I come in. In one focused 30-minute session, we'll look at where you are, what's been holding you back, and what makes sense for you moving forward.",
  topicsTitle: "What we can work on",
  topics: ["Nutrition", "Training", "Sleep", "Energy", "Digestion"],
  stages: [
    {
      title: "Where you're at",
      text: "We talk about your current routine, eating habits, training, sleep, energy, digestion, and the things you've been struggling with.",
    },
    {
      title: "Where you want to go",
      text: "We get clear on your goals, priorities, schedule, and what a realistic improvement would look like.",
    },
    {
      title: "Your next steps",
      text: "We identify practical nutrition, training, and habit changes you can begin working on right away.",
    },
  ],
  leaveTitle: "What you can expect to leave with",
  leaveWith: [
    { from: "Guessing what to eat", to: "Clear nutrition priorities based on real food" },
    { from: "Random workouts", to: "A practical training direction" },
    { from: "Not sure what's in the way", to: "A better understanding of what's holding you back" },
    { from: "Starting over every Monday", to: "A few simple habits to start with" },
    { from: "Too much noise", to: "Less confusion about what to focus on next" },
  ],
  note: "It's a focused coaching conversation, not a written multi-week program. One call won't change everything, but it gives you a clear place to start.",
};

export const booking = {
  summary: ["30 minutes.", "A clearer direction.", "Practical next steps."],
  intro: "If you want a bit of guidance and a plan that actually makes sense for your life, let's figure it out together.",
  reassurance: "One focused session. No complicated commitment.",
  calendarTitle: "Pick a time",
  calendarLoading: "Loading available times",
  calendarFallback: "Calendar not loading? Open it on Cal.com",
  afterCta: "Free rescheduling up to 24 hours before your session.",
  age: "Sessions are for adults aged 18 and over.",
};

/** "Who I am": sits right after the hero, with the two lifestyle photos. */
export const about = {
  title: "Health should give you more freedom, not less.",
  intro:
    "Hey, I'm R. Miller. I've spent over a decade exploring nutrition, training, and ancestral health. What I care about is pretty simple:",
  values: [
    {
      title: "Freedom",
      text: "Food and training that fit around your life, not the other way around. Room to travel, move and say yes to things.",
    },
    {
      title: "Health",
      text: "Real food, good sleep and regular movement. The basics, done well and done often.",
    },
    {
      title: "Vitality",
      text: "Having energy for your whole day, with some left over for the things you enjoy.",
    },
  ],
  closing:
    "Getting healthier doesn't have to mean following a hundred rules. That's what I share on TikTok, and it's what I help people work through one-on-one.",
  signoff: "No unnecessary complications. Just a better direction.",
  photos: [
    {
      src: "/images/me-coast.jpg",
      alt: "R. Miller on a seaside path above the Mediterranean",
      width: 1160,
      height: 1450,
    },
    {
      src: "/images/me-cliff.jpg",
      alt: "R. Miller standing on a cliff edge, looking out over the sea",
      width: 1200,
      height: 1500,
    },
  ] as Img[],
};

export const faq = {
  title: "Questions",
  items: [
    {
      q: "Is this for beginners?",
      a: "Absolutely. You don't need to have everything figured out before booking. We start with where you are.",
    },
    {
      q: "Do I need to follow a strict animal-based diet?",
      a: "No. I'm interested in real-food and animal-based nutrition, but the session is about finding a practical approach for your situation, preferences, and goals.",
    },
    {
      q: "Do I need a gym membership?",
      a: "Not necessarily. We'll talk about training options that make sense for your schedule and available equipment.",
    },
    {
      q: "What if I've tried different diets before?",
      a: "That's useful context. We can discuss what's worked, what hasn't, and what might make your next approach more sustainable.",
    },
    {
      q: "Is this a sales call?",
      a: "No. This is a paid working session focused on your questions and next steps. There is no obligation to purchase additional coaching.",
    },
    {
      q: "How does booking work?",
      a: "Choose an available time in the calendar on this page (it runs on Cal.com), complete the booking, and follow the confirmation instructions.",
    },
    {
      q: "Can I reschedule?",
      a: "Yes, you can reschedule free up to 24 hours before the session.",
    },
    {
      q: "Who can book a session?",
      a: "Anyone aged 18 or over.",
    },
  ],
  disclaimer:
    "Coaching sessions offer general fitness and nutrition education. They are not medical advice, diagnosis, or treatment. If you have a medical condition or take medication, check with your doctor first.",
};

export const finalCta = {
  title: "You don't have to figure everything out alone.",
  text: "A clearer direction might be one conversation away.",
  cta: "Let's figure it out",
  soft: "Not ready for a call?",
  softLink: "Come hang out on TikTok.",
};

export const stickyCta = "Book a session · $30";

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
  updated: "19 October 2026",
};
