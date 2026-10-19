# rmillerflow-site

Personal brand site for R. Miller (TikTok @rmillerflow): 1-on-1 Fitness & Nutrition Coaching, booked through an embedded Cal.com calendar.

Built with Next.js (App Router) and TypeScript. Plain CSS, one small dependency for analytics. Deployed on Vercel; every push to `main` goes live.

## Editing

Almost everything lives in **`src/content/site.ts`**:

| What | Where in `site.ts` |
| --- | --- |
| Session name, price, duration, trust line | `session` |
| Cal.com event (calendar + fallback link) | `brand.bookingUrl`, `brand.calLink` |
| Meta Pixel ID | `meta.pixelId` (null = no pixel, no cookie banner) |
| Large hero photo | `images.portrait` (file in `public/images/`) |
| TikTok stats | `proof.stats` and `proof.statsNote` (empty = hidden) |
| TikTok images | `proof.images` (files in `public/images/`) |
| Testimonials | `proof.testimonials` (empty = hidden; real quotes only) |
| Privacy contact email | `privacyPage.contactEmail` |
| All other copy and the FAQ | the matching sections |

## Measurement

- **Vercel Web Analytics** (no cookies, always on). Booking steps show up as pages:
  - `/event/book-click`: someone tapped a Book button
  - `/event/calendar-view`: the Cal.com calendar became visible
  - `/event/booking-complete`: Cal.com reported a booking
- **Meta Pixel** (only after the visitor accepts cookies, only when `meta.pixelId` is set):
  `PageView` on load, `Lead` once per visit (Book tap or calendar seen), `Schedule` when a booking is made.
- **UTM parameters** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are kept for the visit and passed to the Cal.com calendar, which stores them with the booking.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```
