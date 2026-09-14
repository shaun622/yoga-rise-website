# YogaRise website audit — 14 September 2026

## Outcome and scope

The main site is navigable and its standard layouts hold up at the tested phone, tablet, laptop and wide-screen sizes. It is **not feature-complete**: several recruitment/contact journeys still stop before an enquiry can be made. A successful page load or an intact layout is not proof that a visitor can finish the task.

This review checks the public `www.yogarise.com.au` site after the main-site migration, the matching production build, and both domains' HTTP responses. It uses the product-review approach: actual visitor journeys, consistency, missing functionality and practical next steps. It is not a penetration test, legal assessment, exhaustive accessibility certification or a performance benchmark.

Only the specifically requested Valerie portrait correction is implemented in this pass. The remaining findings below are recommendations, not silently implemented changes. Existing MailerLite/Jotform integrations, DNS, analytics, content release gates and client-supplied imagery remain unchanged.

## Photo correction

The earlier code deliberately wrapped only the shared team photo, leaving Expo and the About founder portrait out. That narrow selector was the reason the reported mismatch remained.

- One shared, top-anchored 1.38× CSS crop now covers **four rendered placements**: Home team, About team, About founder and Expo speaker.
- Retain the existing 3:4 team/speaker frames and 4:5 founder frame. Keep her hair inside the crop. Do not zoom Nic or alter Emma, Peter, Derek or Tashi.
- The wrapper is in the HTML, rather than being added by a Home/About-only browser script. The original photograph is unchanged.
- Checked all placements at 375, 768, 1024, 1440 and 1920px: 15 page/viewport combinations, 20 portrait observations. Inspected the corrected Expo, mobile team and laptop founder appearance visually.
- Two regression tests cover every source use of `valerie.webp` and the shared crop. Together with the five existing MailerLite tests, **7 tests pass**. Production build and generated-link/asset checks pass.

Publishing and post-deployment verification are reported separately in the task completion; these checks alone are not proof that the change is live.

## Findings: genuine problems and inconsistencies

### G1. Health Check is promoted as usable, but is unavailable

- **Where/task:** [Resources](https://www.yogarise.com.au/resources/) → “Take the marketing health check”; [marketing article](https://www.yogarise.com.au/blog/does-your-marketing-support-the-business-youre-building/).
- **Observed:** Resources describes an available assessment and links to a page saying it is in development and cannot be taken. The article says it has been created and promises an overall score and seven-area breakdown, then ends with “Link coming soon.”
- **Impact:** High. Visitors are promised a tool/result the site cannot deliver. This is a copy/CTA inconsistency, independently of the legitimate decision to hold back the unfinished assessment.
- **Recommendation:** Until the actual approved assessment exists, consistently label it “Coming soon” and offer a clearly described update action. Do not invent questions or scoring.
- **Effort:** Low for honest copy/CTA treatment; high for an actual assessment, depending on supplied specification.

### G2. Book a Call works, but visitors cannot find it

- **Where/task:** `/book-a-call/`; visitor wants a conversation with YogaRise.
- **Observed:** No inbound link to this route from any of the 19 public pages' rendered anchors. The embedded Calendly calendar loads, presents available dates and displays times when a date is selected. The direct Calendly fallback exists.
- **Impact:** High. A working conversion route is effectively orphaned.
- **Recommendation:** Link it from Contact when released and an appropriate Partner/“talk to us” action. Preserve the supplied Calendly destination.
- **Effort:** Low. No new booking system is needed.

### G3. Very narrow layouts overflow when a classic scrollbar reduces the available width

- **Where/task:** 320px-wide Edge test with a 15px scrollbar, leaving 305px for page content. Twelve routes report 15px document overflow: Expo, Membership, Partner, Ambassador, Volunteer, Blog, both articles, Calculator, Health Check and survey thank-you. Calendly's 320px minimum also exceeds that available width.
- **Observed:** Base body styling has `min-width: 320px`; some page styles override it and some do not. The 375px-and-up matrix does not reproduce the problem. Hidden honeypot input bounds were excluded as false positives, not treated as visible overflow.
- **Impact:** Medium for narrow/zoomed desktop windows; lower for phones using overlay scrollbars. This is not evidence that all ordinary phone layouts are broken.
- **Recommendation:** Remove unnecessary page-level minimum width in favor of flexible content sizing. Preserve a usable Calendly fallback where the provider's minimum cannot fit. Recheck 320px with classic and overlay scrollbars.
- **Effort:** Low to medium. Not changed during this audit-only part of the request.

### G4. Valerie's portrait crop differed between sections — corrected

- **Where/task:** Home/About team versus About founder/Expo speakers.
- **Observed:** Only the team selector received the previously requested zoom.
- **Impact:** Medium; a repeated, visible client request remained inconsistent.
- **Resolution:** Shared crop and regression coverage described above.
- **Effort:** Low; implemented.

## Findings: obvious missing functionality

### M1. Partner, Ambassador and Volunteer applications are still absent

- **Where/task:** `/become-a-partner/`, `/become-a-brand-ambassador/`, `/become-a-volunteer/`.
- **Observed:** All three describe opportunities but have no public application form. Partner says enquiry details are coming soon; the other two say application details are coming soon. The form sections and their anchor CTAs remain inside release-excluded source blocks.
- **Impact:** High. Prospective contributors cannot apply or send their details.
- **Recommendation:** Connect the supplied/remaining provider forms, restore their associated anchor CTAs, reconcile fields with the Word specifications, and test success, errors, stored fields and notification delivery to `hello@yogarise.com.au`.
- **Current input:** Partner public form `198554764562138627` has now been supplied and is accessible. It is **not integrated yet**; the current provider version omits Role and the partnership-interest question and uses free text for objectives instead of the original choices. It is not accurate to say no Partner link has been supplied. The public link does not establish its notification-recipient settings.
- **Effort:** Medium, dependent on final provider field contracts. Do not use the general newsletter group as the application destination.

### M2. Contact page and visible contact route are absent

- **Where/task:** `/contact/`; visitors with an enquiry outside a specific programme.
- **Observed:** Contact returns 404 and is absent from header/footer. None of the reviewed public page anchors exposes an email or telephone contact. The now-created `hello@yogarise.com.au` mailbox is not surfaced on the site.
- **Impact:** High. There is no general contact path, including for visitors blocked by unfinished forms.
- **Recommendation:** Release the retained Contact design with the agreed hello address, booking link and a connected enquiry form. A clearly labelled email link can be a useful interim route; do not pretend a mailto link is a submitted website form.
- **Effort:** Low for visible email/booking links; medium for the connected form and delivery checks.

### M3. Presenter page and the educator invitation actions are missing

- **Where/task:** `/become-a-speaker/`, the final educator sections on Courses and Events, and the “Become a” footer group.
- **Observed:** Presenter/Speaker is excluded from the production build. Courses invites educators to get in touch and Events invites presenters, but neither section supplies an application/contact action. The Presenter footer item is also excluded.
- **Impact:** High. Visitors are invited to contribute without being given a way to respond.
- **Recommendation:** Connect and release the existing approved Presenter draft, then restore all associated links. Use one canonical route; Speaker and Presenter are names for this same planned page, not separate products.
- **Effort:** Medium, dependent on the provider form.

### M4. Membership-specific interest signup is not implemented

- **Where/task:** `/membership/` → “Keep me updated.”
- **Observed:** The action goes to the homepage's generic newsletter. There is no dedicated membership form collecting first name/email/phone or proving membership-interest segmentation.
- **Impact:** High for lead routing. A general subscriber is not necessarily recorded as interested in membership.
- **Recommendation:** Connect the dedicated interest form and use language that describes interest registration. Valerie clarified that membership is paid eventually, but this phase is signup only. Do not add Stripe, billing, accounts or membership entitlements here.
- **Effort:** Medium with the correct form/group.

### M5. Calculator signup and email-delivery journey is not implemented

- **Where/task:** Income article and Resources → calculator.
- **Observed:** Both entry points open the working calculator directly. No signup modal or emailed-access workflow is published; its local draft is development-only.
- **Impact:** Medium for lead collection; the calculator itself is not broken or unavailable.
- **Recommendation:** Once its dedicated form and email automation are ready, connect both entry points consistently and verify the email/link. Keep direct access working until the replacement journey is tested.
- **Effort:** Medium. Do not accidentally gate only one entry point.

### M6. Elevate course has no next step

- **Where/task:** `/courses/#featured-course`.
- **Observed:** Elevate Marketing has a substantial description, but no “learn more,” enrolment or enquiry destination. The hero's “Explore courses” only scrolls to that description.
- **Impact:** Medium. Interested readers reach a dead end.
- **Recommendation:** Add the actual approved course destination when supplied. Do not guess an Omnitide URL or send people to an unrelated homepage.
- **Effort:** Low once the destination is known.

### M7. No public privacy information is linked from the signup journey

- **Where/task:** Homepage newsletter, survey thank-you, shared footer, and forthcoming application forms.
- **Observed:** The retained signup includes a short update/unsubscribe notice, but the reviewed site exposes no privacy-policy link or contact route explaining the handling of submitted information.
- **Impact:** Medium for confidence and informed data entry; greater for longer applications. This is a product/trust finding, not a legal-compliance conclusion.
- **Recommendation:** Obtain approved privacy wording and publish/link it where information is collected. Keep optional marketing permission separate from an enquiry; be particularly careful with any volunteer accessibility information.
- **Effort:** Low for the page/links after copy approval; provider consent configuration needs verification.

## Findings: quality-of-life improvements

### Q1. Course/event update buttons add an unnecessary intermediate step

- **Where/task:** Courses and Events update CTAs.
- **Observed:** They scroll to the current page footer, which contains another button linking to the homepage signup. The user has to take two actions to reach the actual form. The final form is generic and does not retain course/event context.
- **Impact:** Medium.
- **Recommendation:** Go directly to the relevant connected form, or directly to the retained homepage signup while clearly labelling it general updates. Only promise topic-specific updates once that preference is actually captured.
- **Effort:** Low for the direct link; medium for dedicated preferences.

### Q2. Event announcement timing is ambiguous

- **Where/task:** `/events/` hero and coming-soon section.
- **Observed:** Both say the first events will be announced “by the end of the month” without naming the month. This is not proven overdue on the audit date, but will silently become unclear/stale.
- **Impact:** Medium.
- **Recommendation:** Confirm the intended month, use an explicit date/month if appropriate, and assign a content review date; otherwise use approved non-dated wording.
- **Effort:** Low.

### Q3. Expo's closing invitation has no direct action

- **Where/task:** Expo → “Join us / Invest in the person behind the practice.”
- **Observed:** The invitation ends in text; the ticket buttons are intentionally withheld and only the generic footer signup remains.
- **Impact:** Medium. A visitor who is interested has no obvious event-specific next step at the point of decision.
- **Recommendation:** Add a clearly labelled event-update action once its intended receiver is established. Keep ticket purchase unavailable until date, venue and ticketing are approved.
- **Effort:** Low for a correctly labelled existing signup link; medium for event-specific capture.

## Optional nice-to-haves — not brief defects

### N1. Improve access to Courses, Events and Resources from interior pages

They are reachable from the homepage, but not the standard header/footer. A compact approved “Learn/Resources” navigation treatment could improve discovery. This would change the agreed navigation, so it is a proposal, not an automatic addition. **Impact:** Low to medium. **Effort:** Low to medium.

### N2. Give slow third-party embeds a loading state

Calendly and Jotform initially showed an empty embed area before loading successfully. A small loading message and a clear fallback would make that delay less confusing. Calendly already has a direct fallback; do not classify its initial blank area as a failed integration. **Impact:** Low. **Effort:** Low to medium.

## Deliberate exclusions, not accidentally lost sections

- Awards clearly states **2027** and that categories, nomination criteria, judging and event details are to be announced. Their omission remains intentional; do not release draft award categories/nominations merely to fill space.
- Expo correctly displays **Sydney / December 2026 / Full Day Event**. A specific day, venue, tickets, unconfirmed CPD/programme details and the incomplete Nic speaker profile remain withheld.
- Unconfirmed ambassador benefits/referrals and volunteer programme commitments remain withheld even after the eventual forms are connected.
- Career Pathway Planner is not built and is not advertised as an available resource card.
- The standalone survey and its thank-you page intentionally retain their original outreach presentation and noindex status. Lack of ordinary site navigation into the survey is not an orphan-page defect in this context.
- The calculator's removed visible H1 was explicitly requested previously. Its absence is not a reason to reintroduce the rejected heading during this pass.

## Page-by-page coverage

| Public route | Functional/content outcome |
| --- | --- |
| `/` | Home navigation, retained signup validation and team carousel checked; shared portrait corrected. |
| `/about/` | Full content/team present; founder and team portrait corrected; contribution journey depends on missing forms. |
| `/awards/` | Intentionally a 2027 announcement; updates action reaches existing signup. |
| `/expo/` | December date, three speakers, partners and five expandable FAQs present; portrait corrected; tickets intentionally withheld. |
| `/membership/` | Informational page present; dedicated interest capture missing. |
| `/become-a-partner/` | Informational page present; supplied new form not yet integrated. |
| `/become-a-brand-ambassador/` | Informational page present; application absent. |
| `/become-a-volunteer/` | Informational page present; application absent. |
| `/courses/` | Featured course and future-course content present; course destination and educator action missing. |
| `/events/` | Event formats and coming-soon copy present; presenter action missing and relative date needs review. |
| `/resources/` | Calculator link works; Health Check availability language is misleading. |
| `/book-a-call/` | Calendly loads and shows available times; no inbound site link. No booking made. |
| `/blog/` | Both article cards link to their actual articles. |
| `/blog/what-does-your-yoga-career-actually-earn-you/` | Both calculator links exist and resolve; planned signup/email gate absent. |
| `/blog/does-your-marketing-support-the-business-youre-building/` | Article present; promises an unbuilt scorecard and ends with a non-actionable coming-soon CTA. |
| `/yoga-teacher-income-calculator/` | Arithmetic, invalid-input response and desktop sticky summary checked; mobile hides floating summary as requested. |
| `/yogarise-marketing-health-check/` | Honestly states assessment unavailable; no actual assessment. |
| `/yoga-teacher-industry-survey/` | Jotform intro loads on mobile; retained outreach page. Survey was not completed. |
| `/yoga-teacher-industry-survey/thank-you/` | Retained signup shows correct empty-name validation; no subscriber submitted. |

## Responsive and interaction evidence

- **247 live page/viewport checks:** 19 routes at each of **320, 375, 390, 640, 641, 768, 980, 981, 1024, 1366, 1440, 1920 and 2560px**. Heights ranged from 740–1440px, including 1366×768 laptop. Covers both sides of the principal 640px and 980px transitions.
- At 375px and above: no horizontal document overflow, no detected text/control overflow outside the document (excluding intentional carousel clipping), no reported broken loaded inline image, and one standard header/footer on each standard page. The two outreach pages intentionally have no standard header/footer.
- Footer navigation remains two columns at every tested width. No old stretched full-width menu was found.
- At 320px with classic scrollbar: the exception in G3 remains. Browser tests use Edge viewport overrides, not a physical iPhone/Android device or Safari. This is **not** a claim of perfect responsiveness on every device or at every zoom level.
- **17 standard-page mobile menu tests:** open, close with Escape, hidden state and returned toggle focus all pass.
- All five Expo FAQ disclosures expand and reveal their supplied answers. Both Home/About team carousels move to the next member and update arrow state; About return-to-start also checked. Smooth scrolling was allowed to finish before judging the resulting state.
- Local production-build validation checks: homepage empty name and malformed email show the correct messages and focus; survey thank-you empty name also shows the correct message. A four-character `Test` name proceeds to email validation rather than being rejected by the old name-length rule.
- Calculator scenario: 10 studio classes/week × $70 × 46 weeks; $500 annual overhead; $10/class costs; 120 minutes/class; $40,000 goal; 20% reserve. Results: gross $32,200; expenses $5,100; net $27,100; reserve $5,420; available $21,680; gap -$18,320; studio hourly rate $30; weekly hours 20. Mirrored summary agrees. Entering 53 weeks shows an error and clears results; correcting it restores results. At 1366×768 the summary sticks at 24px while scrolling; on mobile it is hidden.
- **40 public HTTP checks:** 19 known pages on each main/Pages hostname return 200 with correct canonical, preserved staging noindex headers and no leaked draft markers; Contact returns 404 on each. Apex redirects to www successfully.
- Production HTML link, fragment, asset and duplicate-ID checks: 20 HTML documents, 15 sitemap entries, no errors.
- No real newsletter subscription, application, completed survey, booking or payment was submitted. Inbox delivery, provider group mapping, success automations and future form contracts are not certified by this audit. Earlier mailbox delivery checks remain a separate result.
- The full viewport matrix checks the page shell, not every internal state of a cross-origin provider iframe. Calendly date/time selection and the Jotform introduction were inspected separately. Physical-device behavior, every survey step, text-only zoom, screen-reader announcements and slow-network behavior beyond observed loading remain unverified.

## The five changes to tackle first

1. **Make contact possible:** expose hello and Book a Call through Contact/an approved relevant CTA. The receiver and calendar already exist, so this restores a useful visitor path quickly.
2. **Finish Partner, Ambassador and Volunteer form journeys:** these pages currently cannot convert enquiries; Partner's supplied link is the first concrete connection to finish.
3. **Release Presenter and restore educator invitation links:** eliminate the current dead ends on Courses, Events and the footer together.
4. **Correct Health Check promises immediately:** honest availability wording is a small change with an outsized trust benefit, even before the assessment is built.
5. **Connect Membership and calculator capture with explicit consent/privacy and tested delivery:** use the actual dedicated forms, retain working calculator access until the replacement is verified, and leave payments out of this phase.

Then address the narrow-width exception, course destination, update-link friction and time-sensitive Events wording. The portrait correction is already implemented and is not an item the client needs to request again.
