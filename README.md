# rmillerflow-site

Personal brand site for R. Miller (TikTok @rmillerflow): 1-on-1 Fitness & Nutrition Coaching, booked through an embedded Cal.com calendar.

Built with Next.js (App Router) and TypeScript. Plain CSS, one small dependency for analytics. Deployed on Vercel; every push to `main` goes live.

## How the page works

- **First screen:** a short intro, then one big "Book your coaching call" button with the price on it, plus four small options (What we'll cover, How it works, Meet coach Miller, FAQs) for visitors who want to know more first.
- **Every booking button** (first screen, header, floating phone button, sections, footer) opens the same booking drawer: a short offer summary on top and the Cal.com calendar below. Esc, the close button or a tap outside closes it, and focus goes back to the button that opened it. Without JavaScript the buttons jump to the booking section instead.
- **Page order:** intro, What you'll leave with, How the session works, About, Booking section (offer details and calendar), FAQs.
- **Calendars load only when needed:** the drawer's calendar loads on first open, the booking section's calendar when you scroll near it. Nothing from Cal.com loads with the page.

## Editing

Almost everything lives in **`src/content/site.ts`**:

| What | Where in `site.ts` |
| --- | --- |
| Session name, price, duration, details line | `session` |
| Intro price or a real sale | `pricePromo` (null = no promotion; read the comment first) |
| Cal.com event (calendars + fallback link) | `brand.bookingUrl`, `brand.calLink` |
| Button labels | `cta` |
| First-screen copy and options | `hero` |
| Meta Pixel ID | `meta.pixelId` (null = no pixel, no cookie banner) |
| Photos | `images.portrait`, `about.photos` (files in `public/images/`) |
| Privacy contact email | `privacyPage.contactEmail` |
| All other copy and the FAQ | the matching sections |

The price people actually pay is set in Cal.com. When you change `session` or `pricePromo`, change Cal.com to match.

### Intro price

`pricePromo` is currently an intro price: US$30, going up to US$60 on 1 January 2027. On that date:

1. Set the Cal.com event price to US$60.
2. In `site.ts`, set `pricePromo` to `null` and update `session.price`, `session.priceLabel`, `session.details`, `cta.sticky` and the US$30 in `howItWorks` and `booking.intro`, plus the page description in `src/app/layout.tsx`.

A struck-through "before" price is only allowed for a price you actually charged: under Norwegian rules it must be the lowest price used in the 30 days before the sale started.

## Measurement

- **Vercel Web Analytics** (no cookies, always on). Booking steps show up as pages:
  - `/event/book-click`: someone tapped a booking button
  - `/event/calendar-view`: the Cal.com calendar became visible
  - `/event/booking-complete`: Cal.com reported a booking
- **Meta Pixel** (only after the visitor accepts cookies, only when `meta.pixelId` is set):
  `PageView` on load, `Lead` once per visit (booking tap or calendar seen), `Schedule` when a booking is made.
- **UTM parameters** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are kept for the visit and passed to the Cal.com calendar, which stores them with the booking.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```
