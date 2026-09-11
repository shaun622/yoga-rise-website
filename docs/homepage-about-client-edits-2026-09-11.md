# Homepage and About screenshot edits — 11 September 2026

Shaun requested all edits in the four attached WhatsApp screenshots, supplied `D:/Downloads/image_935ecec4.png`, and approved browser review followed by push/deployment. The screenshot messages are scoped change specifications, not authority to change unrelated site settings.

## Changes

- Hide “As Seen In” in production using the existing review-only mechanism. Its original markup and assets remain recoverable in source/review mode.
- Replace the homepage Expo paragraph verbatim with the supplied “One day. One room. The YogaRise Expo brings together…” copy.
- Replace long dashes in the visible homepage copy with appropriate commas, a colon or sentence breaks. Normal hyphenated words and unrelated metadata are preserved.
- Replace the team introduction verbatim with “YogaRise is built by teachers, marketers and industry insiders who know exactly what it takes to build a real career in yoga.”
- Release the approved five-person team on Home and About with one shared HTML partial, stylesheet and carousel module. Details and photo provenance: [team revision](homepage-team-update-2026-09-11.md).
- Copy the attached movement photo unchanged to `public/assets/yogarise-movement.png`. Use it for Home's Why background and About's Mission background, full-width photographic banner and Vision image. Desktop/mobile CSS crops and dark overlays preserve text contrast; no generated or retouched image is used.
- Preserve the shared header/footer design and imagery. The unlabelled backbend image in the About screenshot is treated as the page's photographic banner, not a request to change every page's footer.
- Remove the full-homepage's inherited 320px body minimum so scrollbar space does not cause horizontal overflow in a 320px viewport. Other page modes are unaffected.

## Exclusions

The custom-domain homepage remains the temporary hero/opt-in. The full homepage remains on the existing Pages hostname. No DNS, secrets, forms, analytics, calculator logic, indexing directives or other publication holds are changed. Awards categories and unfinished forms stay withheld. The user's original asset-drop folder and DNS backup are excluded from Git.

## Verification / release

Production compilation (`npm run build`) and `git diff --check` pass. Browser review uses only the Edge extension, not window control. No automated test suite or signup/application submissions were run.

- Reviewed Home and About across 320px and 390px mobile, 1280px and 1366px laptop, and 1440px and 1920px desktop viewports. No page-level horizontal overflow was found after the narrow-homepage fix.
- Verified all five portraits load, four cards fit on wide desktop, three on laptop and a next-card preview remains visible on mobile. Next/previous buttons move the carousel and expose end states; focused-region keyboard scrolling also works.
- Inspected the replacement photo in Home's Why section and About's Mission and Vision areas. Corrected a layered-background repeat inherited from the old Mission image, then confirmed all three layers use `cover` and `no-repeat` and inspected desktop/mobile crops.
- Confirmed the standard build omits As Seen In, includes the shared five-person team on Home and About, and retains the existing Awards publication exclusions. Shared footer layout remains two columns.
- Restored the normal browser viewport after review.

Release route: commit these scoped changes and push to the existing Git-backed Cloudflare Pages production branch. Do not upload the local `dist` directory: it contains the user's unrelated untracked asset-drop folder. Deployment completion and live-page verification are reported in the accompanying task after Cloudflare finishes.
