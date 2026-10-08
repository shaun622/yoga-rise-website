# Contact form release, 8 October 2026

## Execution contract

Shaun explicitly requested connecting the Contact form using the supplied Resend key, publishing it with navigation/footer links and submitting a delivery test to hello@yogarise.com.au. This supersedes the earlier Contact publication hold. Main domain and pages.dev share one production deployment.

Baseline: codex/web-pages-todo at 8416289. Preserve the untracked DNS backup and original asset-drop directory. No DNS changes, unrelated provider forms or marketing subscription changes are in scope.

## Ledger

- T1: Activate the existing Name, Email, optional Phone and Message design; add server-side Resend delivery with fixed recipient, visitor Reply-To and honest pending/success/failure states. Implemented; local tests passed, live test pending.
- T2: Configure encrypted Cloudflare production secrets and YogaRise-only Turnstile protection. Verified in the production settings. Existing MAILER_API_TOKEN and SUBSCRIBERS_DB remain untouched. New managed Turnstile widget is restricted to yogarise.com.au and yoga-rise-website.pages.dev (their subdomains are included by Turnstile).
- T3: Add Contact to shared navigation and footer, static page metadata and sitemap; preserve existing page holds. Verified in generated output and local browser. Contact follows Blog in the footer.
- T4: 30 automated tests passed (25 baseline plus 5 endpoint tests). Production build and Wrangler Functions compilation passed. No page-level horizontal overflow at 320, 375, 768, 1024, 1366 or 1920px. Fields become one column on phones. Use compact Turnstile so the widget fits the 205px form interior at 320px. Live widget and final visual check pending.
- T5: Push through the established Git-backed Pages deployment and submit an explicitly labelled test; verify Resend delivery and mailbox receipt. Pending.

## Integration

Cloudflare Pages Functions: POST /api/contact and GET /api/contact-config. Only the non-secret Turnstile site key is exposed by configuration. RESEND_API_KEY and CONTACT_TURNSTILE_SECRET are encrypted server-side bindings; CONTACT_TURNSTILE_SITE_KEY is public configuration. Never place secret values in this repository or browser assets. Client-supplied recipients/senders are ignored. No database or mailing list writes. Plain-text email avoids interpreting submitted HTML.

Spam protection: server-validated Turnstile action and hostname, same-origin checks, honeypot, bounded request/field sizes. No development bypass in production. Resend idempotency key is retained for retries of an unchanged submission. Failure preserves visitor input; success requires the provider's accepted email ID, not just an HTTP response.
