# rmillerflow-site

Personal brand site for R. Miller (TikTok @rmillerflow): a paid 30-minute private coaching call with Coach Miller, booked and paid through an embedded Cal.com calendar.

Built with Next.js (App Router) and TypeScript. Plain CSS, one small dependency for analytics. Deployed on Vercel; every push to `main` goes live.

## How the page works

- **First screen:** who (portrait, "Personal coaching with Miller"), what ("Get clear on food and training."), price ("US$30 intro price · 30 min · Private video call") and two actions of different weight:
  - **Book my 30-minute call** (direct path): opens the booking dialog straight at the calendar.
  - **Help me find my focus** (guided path): two optional questions, then the same calendar.
- **Booking dialog** (`BookingFlow.tsx`): full screen on phones, a centred panel on larger screens. Questions show "1 of 2 / 2 of 2", Back keeps answers, "Skip to calendar" and Close are always there. The calendar step shows a short offer summary and the real Cal.com calendar. Guided answers are prefilled into Cal.com's "Additional notes" field, which the visitor can still edit.
- **Every other booking button** (header, sticky phone button, How it works, final section) opens the dialog at the calendar.
- **Without JavaScript** every booking button is a plain link to the Cal.com booking page, so booking always works.
- **Page order:** hero, Leave with clarity, How it works, Meet Coach Miller, Common questions, final invitation (`#book`), footer.
- **Nothing from Cal.com loads with the page.** The calendar loads when the calendar step first opens; the guided path warms up the connection while the visitor answers.

### Links you can share

| Link | What happens |
| --- | --- |
| `/` | The page |
| `/?start=book` (or `/book`) | Page opens with the calendar already showing |
| `/?start=guided` | Page opens on the first question |

Add your UTM parameters to any of them, e.g. `/?start=book&utm_source=tiktok&utm_medium=bio`.

## Editing

Almost everything lives in **`src/content/site.ts`**:

| What | Where in `site.ts` |
| --- | --- |
| Offer name, price label, duration, rescheduling line | `session` |
| Intro price or a real sale | `pricePromo` (null = no promotion; read the comment first) |
| Cal.com event (calendar + fallback links) | `brand.bookingUrl`, `brand.calLink` |
| First-screen copy | `hero` |
| The two questions and calendar headings | `flow` |
| Section copy and FAQ | `leaveWith`, `howItWorks`, `about`, `faq`, `finalCta` |
| Meta Pixel ID | `meta.pixelId` (null = no pixel, no cookie banner) |
| Photos | `images` (files in `public/images/`) |
| Privacy contact email | `privacyPage.contactEmail` |

The price people actually pay is set in Cal.com. When you change `session` or `pricePromo`, change Cal.com to match.

### Intro price

`pricePromo` is an intro price: US$30, going up to US$60 on 1 January 2027. The page rebuilds hourly, so the "intro price" wording and the US$60 note switch themselves off at `pricePromo.endsAt`. After that the site shows the plain `session.priceLabel`. On that date:

1. Set the Cal.com event price to US$60.
2. In `site.ts`, change `session.priceLabel` to "US$60" and set `pricePromo` to `null`. Update the US$30 in the page description in `src/app/layout.tsx`.

A struck-through "before" price is only allowed for a price you actually charged: under Norwegian rules it must be the lowest price used in the 30 days before the sale started.

## Measurement

- **Vercel Web Analytics** (no cookies, always on). The free plan has no custom events, so each step is counted as a page under `/event/...` (once per visit, never with answer text):

  | Page | Meaning |
  | --- | --- |
  | `/event/book-click` | Direct booking button tapped |
  | `/event/guided-start` | "Help me find my focus" tapped |
  | `/event/guided-answer-1`, `/event/guided-answer-2` | Question answered |
  | `/event/guided-skip` | "Skip to calendar" used |
  | `/event/guided-close` | Dialog closed during the questions |
  | `/event/calendar-open` | Calendar step shown |
  | `/event/calendar-view` | Cal.com calendar loaded and visible |
  | `/event/calendar-error` | Cal.com failed to load |
  | `/event/booking-complete` | Cal.com reported a completed booking |

  Main metric: `booking-complete` divided by visitors. Slot selection and payment start happen inside Cal.com's frame, which doesn't report them; check those in Cal.com and Stripe.
- **Meta Pixel** (only after the visitor accepts cookies, only when `meta.pixelId` is set):
  `PageView` on load, `Lead` once per visit (booking tap or calendar step), `Schedule` when a booking is made.
- **UTM parameters** are kept for the visit and passed to the Cal.com calendar, which stores them with the booking.

### A/B test idea

Compare `/?utm_campaign=direct` (normal page, direct booking first) with `/?start=guided&utm_campaign=guided` (opens on the questions, with "Skip to calendar" one tap away) in your TikTok bio over a few weeks. Judge by completed paid bookings per visitor, not by how many people answer the questions.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```
