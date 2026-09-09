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

## Analytics and Search Console

- Google account: `ops@omnitide.com.au`
- GA4 account/property: YogaRise; web stream: YogaRise Website
- Measurement ID: `G-8L51BW487V`
- Reporting: Australia/Sydney, Australian dollars
- Shared tracking module: `src/analytics.js`, imported by all four page entry points.
- Tracking runs only on the two live YogaRise hostnames, excluding localhost and Pages previews.
- Page URL/referrer query strings and fragments are excluded. Google advertising signals and
  ad personalisation are disabled. Enhanced form interactions and site search are disabled in GA4.
- No form values, survey answers or calculator figures are sent by the tracking module.
- Search Console domain property: `yogarise.com.au`, verified using a Cloudflare DNS TXT record.
  Keep the `google-site-verification` record in place to retain verification.
- Submitted sitemap: `https://www.yogarise.com.au/sitemap.xml`. It currently lists only the homepage;
  outreach, thank-you and calculator pages retain their existing `noindex` directives.

## Content status

The article thumbnails and two team profiles intentionally retain the placeholders present in the
source design. Ticketing, contact, social, article, and the full-site footer newsletter still need
final client URLs or service providers. The temporary live opt-in and survey thank-you opt-in each
use the corresponding MailerLite embed form supplied by the client.
