# Contact form release, 8 October 2026

## Execution contract

Shaun explicitly requested connecting the Contact form using the supplied Resend key, publishing it with navigation/footer links and submitting a delivery test to hello@yogarise.com.au. This supersedes the earlier Contact publication hold. Main domain and pages.dev share one production deployment.

Baseline: codex/web-pages-todo at 8416289. Preserve the untracked DNS backup and original asset-drop directory. No DNS changes, unrelated provider forms or marketing subscription changes are in scope.

## Ledger

- T1: Activate the existing Name, Email, optional Phone and Message design; add server-side Resend delivery with fixed recipient, visitor Reply-To and honest pending/success/failure states. Verified through automated tests and a successful live submission. Empty required fields block submission; the live pending and success states displayed correctly.
- T2: Configure encrypted Cloudflare production secrets and YogaRise-only Turnstile protection. Verified in the production settings. Existing MAILER_API_TOKEN and SUBSCRIBERS_DB remain untouched. New managed Turnstile widget is restricted to yogarise.com.au and yoga-rise-website.pages.dev (their subdomains are included by Turnstile).
- T3: Add Contact to shared navigation and footer, static page metadata and sitemap; preserve existing page holds. Verified in generated output and on both live domains. Contact follows Blog in the footer. The mobile menu also includes Contact.
- T4: 30 automated tests passed (25 baseline plus 5 endpoint tests). Production build and Wrangler Functions compilation passed. Live geometry checked at 320, 375, 768, 981, 1024, 1280, 1366 and 1920px without page-level horizontal overflow. Desktop navigation remains one row. Fields become one column on phones; compact Turnstile fits the 205px form interior at 320px. Phone and desktop screenshots inspected. The live challenge passed and the submit button enabled correctly.
- T5: Completed. Code release 30fa21a2cdac74f06a0527aa162eaed9f94706bd was pushed to main and codex/web-pages-todo. Cloudflare production deployment b745e161-4f57-4b46-872d-2fcac04e1098 succeeded at 2026-10-08T02:23:17Z. Contact is live at https://www.yogarise.com.au/contact/ and https://yoga-rise-website.pages.dev/contact/. One clearly labelled test (CONTACT-QA-20261008) was submitted on the main domain. Resend email 01a11953-214a-7660-98e6-04b39b29cb51 reports delivered. The matching email was opened and its content verified in the hello@yogarise.com.au SiteGround Inbox. Submission reference: c52e6574-04b5-4556-964e-03d4459a77d7. No other provider forms were submitted or changed.

Local browser proof: .wrangler/contact-qa/contact-success.jpg (ignored by Git). No DNS changes were made for this release.

## Integration

Cloudflare Pages Functions: POST /api/contact and GET /api/contact-config. Only the non-secret Turnstile site key is exposed by configuration. RESEND_API_KEY and CONTACT_TURNSTILE_SECRET are encrypted server-side bindings; CONTACT_TURNSTILE_SITE_KEY is public configuration. Never place secret values in this repository or browser assets. Client-supplied recipients/senders are ignored. No database or mailing list writes. Plain-text email avoids interpreting submitted HTML.

Spam protection: server-validated Turnstile action and hostname, same-origin checks, honeypot, bounded request/field sizes. No development bypass in production. Resend idempotency key is retained for retries of an unchanged submission. Failure preserves visitor input; success requires the provider's accepted email ID, not just an HTTP response.
