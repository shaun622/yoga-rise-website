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
The site uses the approved layout `02`; the earlier layout comparison routes redirect to the root.

## Cloudflare Pages

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

The repository is designed for Cloudflare Pages Git integration. The custom-styled signup forms
submit through the public endpoints supplied by the client's MailerLite embeds, so no API token or
Pages Function is required. Authentication, payments, and course gating are not included in this
first homepage phase.

## Content status

The article thumbnails and two team profiles intentionally retain the placeholders present in the
source design. Ticketing, contact, social, article, and the full-site footer newsletter still need
final client URLs or service providers. The temporary live opt-in and survey thank-you opt-in each
use the corresponding MailerLite embed form supplied by the client.
