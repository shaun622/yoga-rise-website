# YogaRise — published pages and outstanding work

11 September 2026. Shaun approved publishing the eight draft pages with unfinished content excluded. This supersedes the earlier whole-page publication holds in the Sol handover and Valerie feedback report. It does not authorise inventing missing forms, payment links, programme details or event facts.

## What this release includes

All eight pages below are included in the normal Cloudflare Pages build. Finished content uses the existing design 02 layout. Unfinished sections and their action buttons are removed from the published HTML, not merely hidden with CSS. Their draft layouts remain in source/review mode for later completion; historical versions remain in Git.

The full-site header links About, Expo, Awards, Membership and Blog. Its footer links all eight pages plus the calculator. The content-page and blog footers also link all eight pages. Existing full-homepage Expo, Membership and Awards buttons now open the corresponding pages.

The custom-domain homepage remains the temporary hero and working opt-in at [www.yogarise.com.au](https://www.yogarise.com.au/). Its header remains hidden. The full homepage and its navigation remain available at [yoga-rise-website.pages.dev](https://yoga-rise-website.pages.dev/). These are two hostname-selected views of the same deployment, not separate staging infrastructure.

## Shared header/footer correction

Shaun subsequently selected the full homepage header and footer design for all standard pages. The full homepage, eight content pages, blog index, both articles and income calculator now use the same build-time header/footer partials and shared styling/menu behaviour. Page-specific hero photos and body content remain separate. The survey and thank-you pages remain header-free, and the custom-domain homepage remains hero/opt-in only.

- Shared header retains the homepage logo proportions, transparent photographic placement, type, navigation spacing and large mobile menu. The common primary menu links About, Expo, Awards, Membership and Blog. The homepage-only Resources anchor is no longer in the common header because it has no standalone destination accessible from the temporary live homepage; the homepage Resources section and calculator footer link remain available.
- Shared footer retains the homepage photograph, logo/tagline, navigation, lower signup area, divider, copyright and acknowledgement. Unfinished contact/social/legal links and disconnected input fields are omitted everywhere. The signup area links to the existing working signup page rather than adding another form integration.
- About's restrained heading is widened to avoid the narrow three-line wrap; spacing between the header and introduction is reduced. Ripple diagrams align with the section text and have a proper gap before their supporting paragraphs. The earlier mission image/card spacing correction remains.
- Shared sources: `build/site-header.html`, `build/site-footer.html`, `src/site-chrome.js` and `src/site-chrome.css`. The existing content-page plugin inserts them before rendering release-aware navigation. Do not copy a separate header or footer into each page.
- Unused alternate content/blog/calculator header/footer styles and duplicate menu handlers have been removed. Calculator calculations, newsletter integration, survey handling, analytics, DNS, release statuses and indexing directives are unchanged.

This supersedes the earlier simplified inner-page footer and separate menu specification in the Sol handover. Production compilation and source/output inspection are performed for this release; no automated tests or form submissions are run. Browser visual review remains subject to Shaun's separate approval.

## Page-by-page completion list

About and Awards subsequently received an Adobe-specific layout rebuild. See [the design/source record](about-awards-adobe-rebuild-2026-09-11.md). The earlier About hero/mission spacing patches are superseded by this rebuild. Shared header/footer and all exclusions below remain unchanged; image-led slots use existing site imagery where XD contains placeholders.

| Page | Published content | Excluded for now | What is needed to finish |
| --- | --- | --- | --- |
| [About](https://www.yogarise.com.au/about/) | Mission, ecosystem, audience, vision, founder story, shared five-person team and community/partnership links. | None of the revised team content is withheld. | Team revision is now supplied and approved; maintain the shared homepage/About team source. Other site-wide launch items below remain. |
| [Awards](https://www.yogarise.com.au/awards/) | Awards introduction, purpose and 2027 announcement; working link to the existing signup homepage. | Provisional category cards, nomination invitation section, nomination form and nomination buttons. | Confirm categories, criteria, judging/timing details; supply nomination form integration and the shared form requirements below. |
| [Membership](https://www.yogarise.com.au/membership/) | Community introduction, intended audience and link to signup updates. Clearly states membership is coming soon. | Enrolment buttons and unconfirmed detailed benefits such as monthly sessions, library access, discounts and perks. | Confirm the offer, benefits, launch timing, pricing/terms and actual joining destination. |
| [Become a Partner](https://www.yogarise.com.au/become-a-partner/) | Partnership overview, objectives, partnership types, current partners and Ambassador information link. | Enquiry form and all buttons pointing to it. | Supply the partnership enquiry integration, recipient and shared form requirements. |
| [Brand Ambassador](https://www.yogarise.com.au/become-a-brand-ambassador/) | Mission, intended participants, authentic promotion and community impact. | Application form/buttons, promised perks/referral rewards and application-to-reward workflow. | Supply application integration; confirm programme terms, benefits, referral system, fulfilment and approval process. |
| [Volunteer](https://www.yogarise.com.au/become-a-volunteer/) | Volunteer introduction, possible roles and qualities sought. | Application form/buttons, application workflow and unconfirmed access/refreshment/volunteer-pack benefits. | Supply application integration, role/shift/benefit details and privacy arrangements for optional accessibility information. |
| [Marketing Health Check](https://www.yogarise.com.au/yogarise-marketing-health-check/) | Marketing foundations and intended audience. Clearly states the assessment is in development and unavailable. | Start buttons, score/results promises and completion prompts. | Supply the working hosted assessment/embed, or approved questions, scoring rules, result bands and delivery specification. The existing marketing article's assessment CTA remains inactive. |
| [Expo](https://www.yogarise.com.au/expo/) | Event overview, Sydney / 29 November 2026, audience, experiences, three complete speaker profiles, partners and five informational FAQs. | Ticket prices/table/checkout/buttons; six ticket/CPD/replay/refund FAQs; CPD section; incomplete venue section; programme placeholder; Nic's incomplete speaker card; self-referencing “View all speakers” button. | Supply purchase URLs and approved prices/early-bird dates; resolve CPD recognition, replay/gift-bag conditions and refund/transfer policy; confirm venue/address, transport, parking, accessibility and accommodation details; supply agenda and Nic's role/session title. |

## Shared requirements for the four forms

Awards, Partner, Ambassador and Volunteer need separate, confirmed destinations. For each supply:

1. Provider/embed or endpoint and form ID.
2. Field mapping, including multiple checkbox selections and provider validation.
3. Recipient/storage owner, access arrangements and approved privacy notice.
4. Spam protection and confirmed success/error behaviour.
5. Any confirmation email or follow-up behaviour that should be enabled.

The existing newsletter/survey MailerLite groups must not be reused for applications without approval. No new form collects or sends personal information in this release. Do not send test submissions until Shaun authorises the exact scenario/address.

The existing field specifications and local form layouts are in [the form handover](sol-handover/forms.md). Its older whole-page hold is superseded by this release, but its integration/privacy requirements still apply before restoring a form.

## Other unfinished work — unchanged in this release

- Full-homepage launch: the custom-domain homepage has not switched to the complete design. Team revision is complete; course/event destination work remains. Contact/social/legal destinations and an inline footer newsletter need approved inputs before adding them back to the shared footer; the current footer has a working signup-page link. The unavailable “Buy tickets” placeholder and “As Seen In” section are withheld.
- Search launch: existing `noindex, nofollow` directives on content/blog pages remain, and the sitemap still lists only the homepage. Public access is not the same as search-indexing readiness. Review canonical URLs, indexing directives, sitemap and article dates as a separate full-site launch step.
- Design QA: browser/responsive/keyboard review of all new pages is outstanding. No tests or live form submissions are authorised by this note.

## Release method and verification

The deployment uses the normal `npm run build` through the existing Git-to-Cloudflare workflow; not review mode and not a direct upload of local output. Only intentional tracked files are published. The untracked DNS backup, original client asset-drop folder, secrets and private source exports are excluded.

The production build completed successfully with all eight new pages and the existing seven HTML documents. Inspection of the emitted content pages found no disconnected form controls, disabled action buttons, review notes or links to the withheld form/ticket sections. Shared navigation and the retained Expo FAQs were inspected in the generated HTML. No automated tests, browser/responsive checks or form submissions were run.

Cloudflare deployment completion and read-only checks of the actual public URLs are reported in the accompanying task response; a successful local build alone is not a deployment confirmation.

## Restoring a section later

Complete the page-specific requirements above, obtain approval for any required integration checks, and remove only that section's `review-only` markers together with restoring its matching buttons. Compile and inspect the resulting page before publishing. Do not change Cloudflare's production build to review mode: that would expose every unfinished section at once.
