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
- Shared tracking module: `src/analytics.js`, imported by all page entry points.
- Tracking runs only on the two live YogaRise hostnames, excluding localhost and Pages previews.
- Page URL/referrer query strings and fragments are excluded. Google advertising signals and
  ad personalisation are disabled. Enhanced form interactions and site search are disabled in GA4.
- No form values, survey answers or calculator figures are sent by the tracking module.
- Search Console domain property: `yogarise.com.au`, verified using a Cloudflare DNS TXT record.
  Keep the `google-site-verification` record in place to retain verification.
- Submitted sitemap: `https://www.yogarise.com.au/sitemap.xml`. It currently lists only the homepage;
  outreach, thank-you and calculator pages retain their existing `noindex` directives.

## Content status

The eight Docs-derived content pages are now released as informational pages, with unfinished
sections and disconnected actions excluded from production HTML. They are linked through the
full-homepage navigation and the content/blog footers. See the current
[published-pages and outstanding-work note](docs/published-pages-and-outstanding-items-2026-09-11.md)
for the exact omissions and completion requirements. This supersedes the earlier whole-page holds.

The homepage shows the latest published articles from `content/articles.js`. Revised team content,
the Marketing Health Check assessment, ticketing, contact/social/legal destinations and the
full-site footer newsletter still need final client inputs or providers. The temporary live
opt-in and survey thank-you opt-in each use the corresponding MailerLite embed supplied by the client.

## Publishing articles

Add articles to `content/articles.js` with a unique slug, title, excerpt, ISO publication date,
image metadata, HTML body and CTA. Images use `imageSrc` (1536px WebP), `imageSrcSmall`
(768px WebP), `imageWidth`, `imageHeight` and `imageAlt`. Cards and article feature images
share these assets; use versioned filenames because assets have immutable caching.
Set `status: 'draft'` to withhold a post or `published`
to include it. The build generates the blog index and full article pages, and inserts the four
most recent published articles into the staging homepage. Restart the dev server after content
changes. No browser API, CMS, or new runtime service is required.

The two initial articles use 2026-09-09 as a preview publication date; confirm dates before launch.
Blog pages are currently `noindex, nofollow`, and are not added to the live sitemap.
The marketing article's CTA is non-clickable until a destination is supplied.

## September homepage review

The approved September homepage/article changes have been merged and deployed through `main`.
The live hero/form code and outreach pages are unchanged.
The three new WebP assets derive from the supplied Drive images, with event scenes selected by
CSS background positioning. These are illustrative images, not photographs of a past YogaRise event.

The 11 September feedback implementation replaces both article images with Valerie's matching
supplied images and adds article feature images, aligns article headings/body, removes the intro
divider, corrects Resources spacing and crops the community banner to its upper row (speaker
panel only on mobile). The team revision and production launch remain pending; see
[the feedback report](docs/valerie-feedback-2026-09-11.md).
