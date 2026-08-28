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
source design. Ticketing, contact, social, article, and newsletter destinations need final client
URLs or service providers before they can be connected.
