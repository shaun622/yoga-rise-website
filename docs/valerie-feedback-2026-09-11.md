# Valerie feedback implementation — 11 September 2026

Scope: the approved WhatsApp feedback plan, implemented locally on `codex/web-pages-todo`.
This supplements the existing Sol handover; it does not release draft pages or change its integration requirements.

## Implemented

| Plan task | Result |
| --- | --- |
| Revised team | Held. Latest replacement names/order/bios are not specified in the messages. Homepage and About team copy remain unchanged; do not infer membership from uploaded portraits. |
| Distorted collage face | Community banner is a fixed upper-row crop; narrow screens show only the upper-left speaker panel. Absolute image positioning and overflow clipping keep the rejected lower panels out of the visible area. Original file is preserved. |
| Resources alignment | Replaced large fixed vertical gaps/minimum height with responsive column spacing. Heading/button remain together, body aligns toward the image bottom on desktop, and content stacks without artificial gaps on tablet/mobile. Current copy, image and link remain. |
| Article alignment | One 49rem maximum reading frame now contains heading, feature image and body, with shared responsive outer gutters. |
| Article divider | Removed the border beneath the article introduction; retained unrelated quote and CTA borders. |
| Blog/hero images | Two supplied article-specific images now feed homepage cards, blog-index cards and article feature images through one renderer. Added 768px and 1536px WebP versions, intrinsic dimensions, responsive selection and descriptive alt text. Card images lazy-load; feature images load eagerly. Existing copy, dates, slugs and CTAs remain. |

Sources: Valerie's Photos for website folder, previously reviewed through the Edge extension.

- `What Does Your Yoga Career Actually Earn You?.png` → `income-article-v1-{768,1536}.webp`.
- `Does Your Marketing Support the Business You’re Building?.png` → `marketing-article-v1-{768,1536}.webp`.
- Source imagery downloaded from Drive's image viewer into temporary storage. Neither source file nor the original community collage was overwritten. No new AI imagery was generated.

## Design/release status

The existing eight draft pages already use the shared design-02 content-page foundation and supplied page copy. Expo does not need a new designer handoff before local development continues. This pass makes no additional unreviewed redesign to those pages; their rendered visual acceptance remains outstanding.

Proposed release sequence, not approval or a ready-to-publish declaration:

1. Review the full homepage and both existing articles after these edits.
2. Resolve the team revision and homepage placeholder navigation/contact/privacy/social links and unconnected footer newsletter before switching the custom-domain homepage to the full site.
3. Consider About only after revised team content and its required Partner destination are ready.
4. Keep all eight new routes draft until their individual handover dependencies are resolved. Awards/Partner/Ambassador/Volunteer need form receivers and privacy/response contracts; Membership needs a valid joining offer/URL; Health Check needs the assessment; Expo needs checkout and remaining event facts.
5. Explicitly select the release set, review actual output and then deploy only after approval. The Pages hostname is another view of the same production deployment, not an isolated staging environment.

## Validation and exclusions

Performed source/diff inspection, viewed supplied source images and the existing collage, and converted the two article assets to WebP. Reviewed current shared content-page styling and unchanged release manifest/build configuration. No application code, automated tests, Vite builds, browser responsive checks or live form submissions were run for validation. No test scripts were added. Responsive and generated-output behaviour remain unverified.

Future review, only when authorised: 375px mobile, 768px tablet, 1024px short laptop, 1366px laptop and 1440px desktop, plus either side of 640px/980px breakpoints. Check all three article image placements, common heading/body alignment, face-safe crops, Resources spacing, keyboard links and no horizontal overflow. Review draft pages separately before any release.

No changes to MailerLite, Jotform, calculator logic, analytics, DNS, secrets, publication statuses, or the live/full-homepage hostname switch. No commit, push or deployment performed. Existing untracked DNS backup and original asset-drop folder remain untouched. Portfolio examples for Valerie's referral partner are a separate non-coding follow-up.

No material implementation deviation. Team content, visual validation and launch are intentionally pending rather than guessed or represented as complete.

## Deployment preparation — 11 September

Shaun subsequently requested deployment of Valerie's edits and only pages she identified as ready.
The latest WhatsApp exchange asks for launch with a few pages but does not enumerate new ready routes.
Therefore this release includes the confirmed homepage/article feedback and retains the existing
article, survey, thank-you and calculator routes; all eight new content routes remain draft.
The custom-domain homepage remains the working temporary hero/opt-in, while the full homepage
changes are visible on the Pages hostname. No launch-mode switch is implied by this release.

The production Vite build completed successfully. Its HTML output contains the existing seven
documents and none of the eight withheld routes. No automated tests, browser responsive checks
or form submissions were run. Deployment uses the tracked Git source, not a direct upload of the
local `dist` directory, so the user's untracked original asset-drop directory is not included.
