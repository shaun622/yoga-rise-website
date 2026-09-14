# YogaRise main site migration

## Authority and retained scope

On 14 September Shaun approved migrating the full Pages design to the main domain now, while Valerie prepares the remaining forms. This supersedes the earlier Pages-only restriction for this cutover. It does not approve publishing unfinished forms, paid membership, ticketing, award nominations or an unbuilt assessment.

The main domain and Pages share the existing Cloudflare Pages project and Git deployment. No DNS, mailbox, credentials, provider account settings, analytics ID or Search Console verification changes are needed for this release.

## Implementation

- Enable the approved full-homepage layout and September client edits on both custom-domain hostnames, Pages and branch previews. Keep the existing scoped design selectors rather than redesigning the site.
- Preserve the existing homepage MailerLite form markup and submission handler; move that same form into the homepage footer at `/#newsletter`. Other newsletter/community links point there. No new group or API-key integration is introduced.
- Preserve the Jotform survey and separate MailerLite thank-you signup at their existing paths. Keep their original custom-domain presentation. Preserve calculator calculations and its direct URL.
- Emit Courses, Events, Resources and Book a Call as static HTML from the existing approved fragments and shared compiled homepage shell, using the same build-time generation approach as the blog. The browser renderer remains for local development; it does not replace static ready-page content or duplicate menu handlers.
- Keep the approved December 2026 Expo date in the emitted HTML, as well as the existing client-side rendering.
- Add a genuine 404 page for unavailable routes, including withheld Contact and Presenter destinations.
- Set main-domain canonical URLs. Include the 15 released indexable pages in the generated sitemap. Preserve noindex on outreach, thank-you, calculator and the unavailable Health Check assessment. Keep all Pages/branch URLs noindex with host-specific response headers and the existing client-side safeguard.

## Still withheld

Contact and Speaker/Presenter pages; Partner, Ambassador and Volunteer applications; Membership interest signup; calculator signup and email-delivery workflow. These need the actual new MailerLite connections Valerie is preparing and end-to-end submission checks. Existing local fields/drafts are retained and are not emitted by the production build.

Awards categories/nominations, unconfirmed programme benefits, ticketing, paid membership and the Health Check assessment remain excluded as previously agreed. Membership is interest collection now, payment later. The existing calculator remains directly accessible while its signup is unfinished.

## Verification before release

- Production Vite build passed. Twenty HTML documents emitted: the existing fifteen, four ready routes and a 404 page.
- Existing MailerLite helper tests: five passed. No real subscription, survey response, application, booking or payment was submitted during this cutover.
- All emitted HTML checked for internal link/asset targets, fragment targets, duplicate IDs, one canonical per page, absence of draft controls and correct protected noindex settings. Fifteen sitemap URLs verified.
- Ninety-four browser geometry checks across 375, 390, 768, 1024, 1440, 1920 and 2560 pixel widths: no horizontal overflow, duplicate header/footer or leaked draft form on checked routes.
- Laptop homepage and retained footer signup visually inspected. Browser control paused when an Edge extension UI opened during a subsequent mobile form-validation check; that validation result was not claimed as verified.
- Protected MailerLite, survey, calculator logic and analytics source files unchanged.

## Release and recovery

Publish only the selected tracked migration files through Git to the existing main branch. Do not upload the local dist directory: it also contains the user's ignored original asset drop. Private notes, exports, DNS backup and original asset folder stay out of Git.

Pre-cutover production commit: `a19e90d5c6f9228a5872782c00c48ca98881fd5c`.
Pre-cutover successful Cloudflare deployment: `cd98ce7a-8cb9-4c5c-bfd1-59a2081617f8`.
These are recovery references, not an instruction to perform an unrequested rollback.

Final public-response and deployment verification is recorded in the task completion message; a local build is not proof of deployment.
