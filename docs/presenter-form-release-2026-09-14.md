# Presenter Jotform integration — 14 September 2026

## Scope

Use Valerie's supplied Jotform, not a replacement application form. Retain the approved Presenter page copy and the shared YogaRise header/footer.

## Implemented

- Promote `/become-a-speaker/` from a local-only draft to a static page, with its canonical URL and sitemap entry.
- Embed exactly `https://form.jotform.com/jsform/262559187564471` once. The provider manages its fields, validation, pagination, storage and automatic iframe height.
- Use a paper-coloured section, restrained introductory column and white form panel. Stack the section at 1200px and below; let the form use the available width on small phones.
- Preserve Jotform's existing YogaRise branding and provider footer. No cross-origin CSS injection, clipped iframe, fixed-height scrolling box or changes to her form account.
- Add a direct Jotform link and no-JavaScript fallback.
- Add Presenter first in the footer's “Become a” column and application links in the existing Courses/Events presenter invitations.
- Remove the obsolete disabled custom Presenter form and its development-only registration. Contact and other unconnected forms remain unpublished.

## Verification

- Nine Node tests pass, including two Presenter release/navigation regression tests.
- Production build passes: 21 HTML documents and 16 sitemap URLs. Internal links/assets/fragments, duplicate IDs, canonical tags and draft-exclusion checks pass.
- Production preview and development preview both initialize one Jotform with an accessible frame title.
- Page/iframe-container widths checked at 320, 375, 390, 768, 1024, 1200, 1366, 1440 and 1920px: no document horizontal overflow.
- Visual checks on mobile and laptop/desktop; name/email inputs, checkbox step and longer expertise step render. Blank required-field errors and forward pagination checked using fictional layout-test data.
- No application submitted, saved through the Save button, email sent or booking made. This is not proof of submission storage or notification delivery.
- Existing survey Jotform and both existing MailerLite connections are unchanged.

## Provider-owned follow-up

- The Phone Number field still displays `(000) 000-0000`; adjust its Australian/international presentation in Jotform if desired. The website embed does not control it.
- Website is currently required by her Jotform. No required/optional settings were changed.
- Notifications to `hello@yogarise.com.au` and final submission delivery are not verified by this styling/integration task.
- Remaining audit findings are recorded in `website-audit-2026-09-14.md`; this release addresses its M3 Presenter availability/navigation finding only. No material deviation from the approved embed approach.
