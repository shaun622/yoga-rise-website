# Homepage team revision — 11 September 2026

Scope: the homepage team row highlighted by Shaun, row 7 marked “Shaun to action” in [Web edits - YogaRise](https://docs.google.com/document/d/1zm_izFBcAaSMskBSocAPJnY1bwe7iA7D9nxZutJu_sI/edit). Shaun's subsequent screenshot request explicitly approves adding this same team to About and deploying the changes. This supersedes the earlier About team hold, not other unfinished sections.

## Implemented

1. Valerie Saindon — Founder & CEO. Existing bio already matches the requested “With over 20 years teaching movement…” revision and is retained verbatim.
2. Nic Dorsch — Community & Event Coordinator. Replaced the old role/bio with the supplied 22-years teaching experience copy and replaced the placeholder with her supplied portrait.
3. Emma Scott — Brand Growth Strategist. Moved to third. Existing bio already uses a comma after “YogaRise”, not a long dash; retained that punctuation and the existing copy.
4. Peter Solway — Partnership Director. Added with the supplied sponsor/partner relationships bio and portrait.
5. Derek Abel — Storyteller & Media Producer. Moved to fifth and corrected the job title. Existing bio matches the requested copy and is retained.

The team is now one horizontal scroll row at every viewport width. Four cards fit on wide screens, three on laptops, two on tablets and one plus a preview on phones. Arrows move one card at a time, reflect the start/end bounds and respect reduced-motion preferences. Native touch/trackpad scrolling and a keyboard-focusable scroll region remain available. No automatic rotation.

Home and About now use `build/site-team.html`, `src/team.js` and `src/team.css`. The current introduction is: “YogaRise is built by teachers, marketers and industry insiders who know exactly what it takes to build a real career in yoga.” Keep future revisions in this shared source.

## Photos

Source: [Photos for website](https://drive.google.com/drive/folders/1LVSvwyId2E0Fh9kQxZP1UiqDZBUQXRZA).

- `Nic D.JPG` → `public/assets/nic-dorsch.jpg` (623 × 1107).
- `Peter Solway.jpg` → `public/assets/peter-solway.jpg` (737 × 1107).
- These are the image assets served by Drive's large-image viewer, saved locally after the original download failed. They are not screenshots or generated portraits. Existing card styling supplies the displayed crop.
- Existing Valerie, Emma and Derek assets are unchanged.

## Release boundaries

About's team is now included in the normal build, as explicitly requested. Awards publication markers, hostname-selected homepage mode, forms, analytics, DNS, shared header/footer and indexing settings are unchanged. No automated tests or form submissions are included. Shaun approved desktop/mobile browser review and push/deployment with the follow-up screenshot edits.

The initial local revision compiled successfully. The final screenshot-edit release, browser checks and deployment status are recorded in [the release note](homepage-about-client-edits-2026-09-11.md).
