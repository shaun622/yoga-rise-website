# YogaRise

Responsive homepage implementation based on the supplied Adobe XD specification.

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The static output is written to `dist/`.

## Live and staging views

- `https://www.yogarise.com.au/` — temporary hero-only launch view with an opt-in form
- `https://yoga-rise-website.pages.dev/` — complete staging site, hidden from search indexing

The view is selected from the hostname, so one deployment keeps production and staging in sync.
The root route uses layout `02` by default.

## Layout comparison

- `/01/` — original Adobe XD spacing
- `/02/` — increased site-wide margins for a calmer layout

Use the fixed `01 / 02` control in the bottom-right corner to switch between them.

## Cloudflare Pages

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

The repository is designed for Cloudflare Pages Git integration. No server-side functions,
authentication, payment system, or course gating are included in this first homepage phase.

## Content status

The article thumbnails and two team profiles intentionally retain the placeholders present in the
source design. Ticketing, contact, social, article, and newsletter destinations—including the
temporary live opt-in—need final client URLs or service providers before they can be connected.
