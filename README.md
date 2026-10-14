# rmillerflow-site

Landing page for R. Miller's 1-1 fitness & nutrition coaching, linked from TikTok (@rmillerflow).

Static site, no build step: `index.html` (all styles and script inline) plus `avatar.jpg`. Fonts load from Google Fonts.

## Edit common things

- **Booking link**: search `index.html` for `cal.com/rokas-miller-ovcrq8/30min` (appears 3 times).
- **Price**: search for `$30` and `$100`.
- **Photo**: replace `avatar.jpg` with a square image (360×360 or larger).

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
