# Brand Ambassador form integration — 15 September 2026

Status: implementation and subsequent responsive checks completed as part of the approved 15 September adjustment batch. See [the consolidated checklist](valerie-adjustments-2026-09-15.md) for current scope, validation and remaining delivery checks. Deployment completion is reported separately in the task response.

## Implemented

- Confirmed the supplied URL opens “BECOME A BRAND AMBASSADOR”: `https://form.jotform.com/262560523891864`.
- Replace the obsolete custom draft application with its official Jotform script embed on `/become-a-brand-ambassador/#ambassador-application`.
- Restore four application anchor buttons in the already-published sections and remove the obsolete application-coming-soon notice.
- Keep the existing page, shared header/footer and approved copy. Unconfirmed perks, ambassador kits and referral-programme sections remain review-only.
- Reuse the Presenter form-container styles through additional Ambassador selectors. Include a direct-link fallback and a no-JavaScript fallback. Do not clip or fix the height of the provider iframe.
- Scope a narrow-screen body-minimum/CTA-width correction to the Ambassador page only.

## Verified

- Eleven Node tests pass, including two Ambassador regression tests.
- Production build passes: 21 HTML documents, 16 sitemap URLs, no broken internal links/assets/fragments or leaked draft forms.
- The local embedded form loads once with an accessible title and automatic height. Laptop screenshot at 1366px looks correct.
- Initial page geometry passed at 375, 390, 768, 1024, 1200, 1366, 1440 and 1920px.
- At 320px with a classic scrollbar, the inherited 320px body minimum caused 15px overflow. A scoped CSS fix is implemented and builds, but needs visual rechecking after the browser is available.
- No application data entered, no application submitted, no Save action and no provider-account settings changed.

## Follow-up QA

Browser automation subsequently resumed. The final 320px geometry check passed, the loaded mobile Jotform was visually inspected, all application anchors resolved, and the viewport was reset. No accepted application or inbox-delivery test was performed. The user approved pushing the combined adjustment batch; use the established Git/Cloudflare workflow and verify both domains.

## Provider-owned follow-up

- Her Jotform has two visible fields labelled “Location” (input_106 and input_110). They are preserved as supplied; the duplication should be corrected in Jotform.
- Phone displays `0000-000-000`. No input settings were changed.
- Submission storage and notification delivery to `hello@yogarise.com.au` are unverified.
- This initial Ambassador integration did not alter other forms. The later combined adjustment batch includes the separately approved Partner, Volunteer, Membership and newsletter changes documented in the consolidated checklist. No material deviation from the approved Jotform embed approach.
