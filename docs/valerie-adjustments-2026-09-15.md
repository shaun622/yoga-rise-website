# Valerie adjustments — 15 September 2026

Status: implemented and verified where the required destination/content was supplied. Shaun authorised pushing this batch on 15 September. Deployment completion is verified separately in the accompanying task response; the disconnected Contact preview remains excluded from production output.

## Source and decisions

Reviewed Valerie's 15 September WhatsApp batch (06:18–08:57), including its annotated screenshots: 26 readable message rows, with albums counted as rows; a deleted message could not be recovered. The list below consolidates repeated messages into 21 actionable items.

User decisions: no Home menu item; both logos link home. Defer Elevate until the other changes are done. Use hello@yogarise.com.au. The latest request supersedes the earlier email-only Contact approach: build a proper Contact page with a form.

Valerie said Contact was missing and requested Contact in the navigation/footer. This message batch did not supply a Contact form. No Contact embed/endpoint was found in the earlier local form handover either.

## Item-by-item implementation

| # | Requirement | Current result |
| --- | --- | --- |
| 1 | Same homepage footer on regular pages | Shared footer retained, including the two-column menu. |
| 2 | Actual newsletter form in every regular footer | One shared homepage signup form and handler on each regular page, including generated Courses, Events, Resources, Book a Call and Presenter pages. |
| 3 | Remove demo-newsletter anchor | Public newsletter links now use #newsletter; this does not change staging domains. |
| 4 | Contact in main navigation | Development preview only; production link awaits a connected Contact page. |
| 5 | Contact below Blog in footer | Development preview only, positioned below Blog. Production link awaits the connected page. |
| 6 | Resources in menu/footer | Added to both. |
| 7 | Optional Home item | Not added, following the user's decision. Header and footer logos link to /. |
| 8 | Join the Elevate program | Deferred as requested. Need the choice between hello@yogarise.com.au and the existing Omnitide programme page. |
| 9 | About closing community CTA | Join the community scrolls to the same-page footer signup. |
| 10 | Expo updates in four marked locations | Added in hero, after This is for you if, below FAQ, and closing section. All scroll to the same-page signup. |
| 11 | Expo horizontal alignment | Hero/body gutters aligned; unrelated vertical spacing retained. |
| 12 | Awards updates | Added in hero and closing section; same-page signup. |
| 13 | Membership updates | Hero, A place to keep growing, and existing closing CTA use Get Membership updates. |
| 14 | Membership horizontal alignment | Hero/body gutters aligned. |
| 15 | Membership growing-section image | Replaced with the existing homepage Membership card's group workshop image, /assets/events.webp. Hero unchanged. |
| 16 | Partner buttons | Six relevant existing buttons now scroll to #partnership-enquiry, including all four specifically requested locations. |
| 17 | Partner form | Supplied MailerLite form embedded and styled with visible labels and responsive fields. No country field. |
| 18 | Ambassador buttons/form | Supplied Jotform 262560523891864 embedded with four same-page buttons, responsive container and direct-form fallback. Includes previously prepared uncommitted work. |
| 19 | Volunteer buttons/form | Supplied MailerLite form embedded and styled; four relevant buttons scroll to #volunteer-application. |
| 20 | Proper Contact page | Designed at /contact/ in development only, with Name, Email, optional Phone and Message. Explicitly disabled and labelled as a local design preview. A Contact form connection is still required. |
| 21 | Third blog | Pending Valerie's content. No fabricated article or placeholder published. |

Existing unreleased tickets, award categories, provisional membership benefits and unconfirmed ambassador/volunteer benefits remain excluded from the production build.

## Form integration and field differences

Partner: https://preview.mailerlite.io/forms/2606050/198554764562138627/share

Volunteer: https://preview.mailerlite.io/forms/2606050/198557478572525399/share

The embeds preserve the supplied forms' actual submission endpoints, provider scripts, hidden integration fields, success callbacks and required rules. Changes are presentation/accessibility only: visible associated labels, responsive layout and native required attributes matching provider-required fields.

The later supplied forms differ from the earlier Word-field brief:

- Partner has First Name, Last Name, Email, Mobile, Company, Website, brand/exploration text and partnership objective. Website and objective are provider-required. The supplied form does not contain the earlier Role or partnership-interest choices.
- Volunteer has First Name, Last Name, Email, Mobile, Location and three long answers: motivation, relevant experience and where they would like to help. The supplied form does not contain the earlier separate availability/accessibility fields or role checkboxes.

These differences were not silently changed in Valerie's account. The supplied working form definitions take precedence for this integration; reconciling extra fields needs her confirmation.

These existing MailerLite/Jotform embeds do not require a new Resend integration. Receiving their submission notifications at hello@yogarise.com.au still depends on each provider's notification settings and must be verified separately. Creating a mailbox alone does not connect a Contact form.

## Validation performed

- 16 automated tests passed, including new CTA, shared signup, form destination/field, unpublished-content and Contact draft safeguards.
- Production build passed with `npm run build -- --configLoader runner`. The runner option avoids the local sandbox's esbuild configuration-loader permission issue.
- Checked root-relative links across all 21 generated HTML files: no missing local destinations. Whitespace validation also passed.
- Browser geometry checks on 14 routes at 320, 375, 768, 1024, 1366 and 1920px widths. Final checks showed no page-level horizontal overflow and a visible newsletter form at every tested size.
- Routes: Home, About, Expo, Awards, Membership, Courses, Events, Resources, Partner, Volunteer, Ambassador, Presenter, Blog index and Income Calculator.
- Expo/Membership hero and body left edges matched at wide desktop size. Laptop navigation stayed on one line and the footer stayed in two columns.
- Corrected the full-site body minimum width exposed by 320px testing with a classic desktop scrollbar; protected standalone outreach pages retain their existing behaviour.
- Visually inspected application layouts on desktop/tablet/phone and the loaded Ambassador Jotform at 375px; its frame automatically expanded to fit its content.
- Partner and Volunteer empty submissions were blocked, focused the first required input and did not show a success message.
- Shared newsletter empty submission on Courses showed its existing first-name validation. Mobile navigation opened with Resources and closed using Escape.
- Contact development preview inspected at tablet and phone sizes; phone layout did not overflow and fields remained disabled.

No accepted test submission was sent during this batch. Subscriber/application storage, provider automations and receipt at hello@yogarise.com.au are **not yet verified**. Responsive checks are not an exhaustive audit of every third-party form state or every website route.

## Remaining before claiming full completion

1. Supply/confirm the Contact form connection. Use hello@yogarise.com.au for notifications; then enable the Contact route and navigation/footer links together and test successful receipt.
2. Run authorised accepted-submission tests and verify provider records plus notification delivery for the integrated forms.
3. Resolve the deferred Elevate destination.
4. Add the third blog only when its content arrives.
5. Push the approved finished batch through the existing Git-backed production build and verify deployment. Never upload the local dist directory, which also contains the unrelated original asset-drop folder.

The implement-plan workflow kept this within the agreed list. No new email backend, account-level field changes or unrelated refactor was introduced. No additional unrelated findings were acted on.
