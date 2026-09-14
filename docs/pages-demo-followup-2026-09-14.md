# YogaRise Pages-only follow-up, 14 September 2026

## Authority and boundaries

Shaun approved implementing Valerie's WhatsApp requests on `https://yoga-rise-website.pages.dev/` only. Her main-site launch request is NOT authorized for this release. Preserve both custom domains' existing appearance, content, links, forms, analytics, DNS and redirects. No tests, signups, enquiries or bookings without separate permission.

This is a partial ready-content release. Do not describe the whole WhatsApp list as complete.

## Sources re-read today

The [Web Pages YOGARISE register](https://docs.google.com/spreadsheets/d/1GqUkj16Hfud5Cy-me_ozZd8lz6uPCetbpwePr3sXqeI/edit?gid=0#gid=0), rows 6, 7, 9 and 14, now marks the following copy Done and development To Do. This supersedes the 10 September register snapshot for these four pages:

- [Courses](https://docs.google.com/document/d/1wZy4h3MYfK2qbP8qKs06fXPs60VfD1jm-kPekMUwsnc/edit)
- [Events](https://docs.google.com/document/d/1-QplwVK04-vEiBRVRQzQ8KGnOtsBwSHTkcX5tfmzpC4/edit)
- [Resources](https://docs.google.com/document/d/1vatm4pFirefoDqQE6DfRdonxGK2HKoYq4FWiK9B9L0o/edit)
- [Become a YogaRise Presenter](https://docs.google.com/document/d/1KC1a9CV4kkJ7TEyWLCF9gRiWzMiUFSheVJgJ8jJPbE0/edit)

The register calls the last item Speaker; the document calls it Presenter. The local draft uses `/become-a-speaker/` and preserves the document's Presenter heading. It does not create two competing pages.

## Ready-content implementation

| Request | Result |
| --- | --- |
| Retain the selected full homepage hero | Already present on Pages; unchanged. The temporary custom-domain homepage remains unchanged. |
| Both homepage Courses CTAs | Now target `/courses/` on the demo. |
| Homepage Events CTA | Now targets `/events/`, not Expo. |
| Homepage Resources CTA | Now targets `/resources/`. |
| Courses | Approved copy, featured Elevate Marketing description, future courses and educator invitation. The unprovided external Elevate destination and unconnected Presenter CTA are omitted. Updates link to the existing footer newsletter area; no new course-specific subscription/automation is claimed. |
| Events | Approved copy, three event formats, coming-soon calendar and educator invitation. No invented dates/tickets/listings. Presenter CTA withheld. Updates link to the existing footer newsletter area. The supplied copy says first events will be announced by the end of the month; review this time-sensitive copy before a later release. |
| Resources | Approved calculator and Marketing Health Check entries link to the existing tools. Career Pathway Planner remains excluded because its source is In Process and the tool does not exist. The resource-suggestion enquiry section is withheld with Contact. |
| Valerie crop | Home/About shared team photo increased from 1.16 to 1.38 scale, top-anchored to retain her hair. Original image and all other portraits preserved. Visual approval still required. |
| `/book-a-call/` | YogaRise-styled booking page, supplied Calendly URL and primary colour `7d0409`, 320px minimum/700px-high widget and direct Calendly fallback. No booking made. |

### Demo route isolation

Use the existing exact-host demo bootstrap and JS guard. `src/demo-pages.js` renders ready demo routes from the existing root document fallback after the original modules initialize. It moves the existing header node rather than cloning it, so mobile navigation listeners remain attached. Footer is the existing shared footer with its current newsletter destination unchanged.

No new static HTML routes, redirects, functions, `_worker.js`, `_routes.json`, `404.html` or hosting configuration are emitted. Cloudflare already serves the root document for unmatched routes when there is no top-level 404 file: [documented Pages behaviour](https://developers.cloudflare.com/pages/configuration/serving-pages/). On `.com.au` the demo guard is false, so those paths retain their previous root fallback. They do not expose the new page UI.

All new CSS selectors require the exact-host bootstrap's `data-demo-site` marker. No original production stylesheet, shared partial, integration, page-release flag or main-domain URL is edited. The normal 15 HTML outputs remain; the four new demo routes are browser-rendered views. This is staging-only rendering, not a main-site SEO launch implementation.

## Built locally but NOT published

`src/demo-form-drafts.js` and `*.draft.html` load only through `import.meta.env.DEV`. The production build must eliminate their content. They are unavailable on Pages, branch previews and the custom domains.

- Speaker/Presenter: complete supplied informational copy and five-part application UI. Arrays preserve all opportunity/audience/availability/format/collaboration options. First name, last name, email, topics and expertise have draft required flags; reconcile the document's ambiguous asterisks and provider validation before activation. Other fields remain optional pending confirmation. Source's fee questions are not payment processing. Disabled fieldsets and submit prevent real information collection in the draft.
- Contact: temporary-homepage photographic treatment with name/email/optional phone/message layout. Contact recipient and published contact details are missing. These form controls are design defaults, not a claim that Valerie supplied a final field contract.
- Contact header/footer links and Presenter footer link: development only while their destination forms are withheld.
- Membership: development-only replacement of the bottom CTA with first-name/email/phone form. No account, billing, member entitlements or promised membership status. Needs confirmed meaning and dedicated provider mapping.
- Income article: development-only modal with first-name/email form and native dialog close/Escape behaviour. No subscriber created, link emailed or calculator access restricted. The live demo retains the currently working direct calculator link until the dedicated embed/group and Valerie's automation are supplied. The Resources calculator link is likewise direct; coordinate both entry points when the gate is activated.
- Partner, Ambassador and Volunteer: existing full draft forms and anchor CTAs are already present under review-only source markers. They remain excluded by the normal build. Do not publish review mode to expose them.

## Required inputs to finish

1. Dedicated hosted form/embed contracts for Speaker, Partner, Ambassador, Volunteer, Membership and calculator access: actual public form links/IDs, exact field mapping including arrays, destination/group/recipient, approved privacy notice and confirmation behaviour. Existing newsletter and survey embeds are not interchangeable application destinations.
2. Volunteer accessibility text needs an approved recipient/access/privacy handling decision before transmission. It must not be placed in a marketing segmentation field or analytics.
3. Contact receiver and the email/phone to display. Do not assume Omnitide's contact details are YogaRise's.
4. Confirm Membership means free community opt-in, or supply a separate membership specification. Do not invent accounts/payments/access.
5. Elevate's actual course destination. Do not substitute Omnitide's homepage, a guessed URL or a placeholder.
6. Permission and a nominated scenario/address before form submissions; separate approval for laptop/mobile browser checks. Responsive CSS is implemented, not browser-verified.

## Release procedure and validation

Compile the normal production build and inspect the source/diff/build output. Confirm development-only form content is absent. No tests or forms are run. Publish only selected tracked files using Git-to-Cloudflare; never upload the local `dist` because the user's untracked asset-drop originals are copied there by Vite.

Keep `dns-backup-before-cloudflare-2026-09-01.md` and the untracked `public/assets/drive-download-20260903T002940Z-1-001/` folder untouched and out of the commit. Record deployment completion separately; a successful local build does not prove a deployment completed.

Production Vite build completed successfully. `git diff --check` reported no whitespace errors. Build-output source inspection found none of the draft notice, speaker fee-field or calculator signup-submit strings in the emitted JavaScript, and no new static route directories. Existing main-page/shared-partial/integration source files are unchanged. No automated tests, manual browser tests, form submissions or bookings were run.
