# rmillerflow-site

Landing page for R. Miller's 1-1 fitness & nutrition coaching, linked from TikTok (@rmillerflow).

Static site, no build step: `index.html` (all styles and script inline), images in `img/`, self-hosted fonts in `fonts/` (SIL Open Font License, see the `OFL-*.txt` files).

## Edit common things

- **Booking link**: search `index.html` for `cal.com/rokas-miller-ovcrq8/30min` (appears 3 times).
- **Price**: search for `$30` and `$100`.
- **Photo**: replace `avatar.jpg` with a square image (400×400 or larger).
- **Guide images**: square JPEGs in `img/` (420×420), cropped from TikTok posts.
- **Link preview image**: `og.jpg` (1200×630), used when the link is shared in DMs.
- **Age notice**: "Adults 18+" appears in the price card, the FAQ and the footer.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
