# rmillerflow-site

Personal brand site for R. Miller (TikTok @rmillerflow): real food, strength, habits, and 1-on-1 coaching sessions booked through Cal.com.

Built with Next.js (App Router) and TypeScript. Plain CSS, no UI or animation libraries. Deployed on Vercel; every push to `main` goes live automatically.

## Editing

Almost everything lives in **`src/content/site.ts`**:

| What | Where in `site.ts` |
| --- | --- |
| Booking link, TikTok link, handle | `brand` |
| Price, duration, reschedule window | `session` |
| Crossed-out previous price | `session.previousPrice` (leave `null` unless it was a real earlier price) |
| Hero headline and text | `hero` |
| Section copy | `problem`, `approach`, `checkIn`, `coaching`, `booking`, `about`, `content`, `finalCta`, `footer` |
| FAQ questions and answers | `faq.items` |
| Photos | `images` (files live in `public/images/`) |

**Adding a proper portrait:** put the photo in `public/images/` (for example `portrait.jpg`, at least 1000px wide) and set `images.portrait` to `{ src: "/images/portrait.jpg", alt: "R. Miller", width: ..., height: ... }`. It replaces the small avatar in the About section.

**Swapping the food photos:** replace the files in `public/images/board-*.jpg` (4:3 landscape works best) and update their `alt` text in `images.boards`.

Other files:

- `src/app/globals.css`: colours, type and layout (tokens at the top).
- `src/app/opengraph-image.jpg`: the preview shown when the link is shared (1200 x 630).
- `src/app/icon.png`, `src/app/apple-icon.png`: browser and home-screen icons.
- `src/app/fonts/`: self-hosted Big Shoulders Display and Instrument Sans (SIL Open Font License).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```
