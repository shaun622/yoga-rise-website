# About and Awards — Adobe design rebuild

Shaun requested implementation against the Adobe designs on 11 September 2026. This supersedes the generic About/Awards layout directions in the earlier Sol handover, not the content publication holds.

## Design references inspected directly

- About: https://xd.adobe.com/view/49627c3c-40f7-4791-ac6f-68e5ef1a7a20-1c31/screen/c6cb3d0b-708e-4f7e-b034-42ae0be03f93/
- Awards: https://xd.adobe.com/view/49627c3c-40f7-4791-ac6f-68e5ef1a7a20-1c31/screen/8797bc79-80c3-4ea9-b187-1ad520283dce/

The Awards screen is misleadingly titled “Yogarise – About Page – 1” in XD. Its visible content is Awards. About is the preceding screen, titled “Yogarise – About Page”. Specs show 1920px-wide designs, updated 10 September. Use the visual contents and these IDs, not the display name alone.

## Implementation

- `about/index.html` and `awards/index.html` use their own Adobe-derived body layouts through `src/adobe-pages.js` and scoped `src/adobe-pages.css`.
- Both retain the existing homepage header/footer partials, navigation and menu behaviour. No duplicate header/footer implementation.
- Heroes use the original `hero.webp`, top-aligned, with restrained 25px-at-1920px copy hierarchy. About starts “Building the future of the yoga industry.” as in the design; the previous extra About/Raising the standard stack is removed.
- Body hierarchy follows the Adobe 45px bold section titles, 25px lead text, 18px body text and fine divider lines, scaling down without fixed content heights on small screens.
- About: paper Why section; full-width mission photograph with three original icons; light geometric five-part ecosystem; five image-led audience columns; photographic banner; white vision section; paper founder section with text left/photo right; white team layout in review mode; white two-row closing CTA.
- Awards: shared photograph hero, paper introduction, white 4-by-2 image-led category grid in review mode, full-width photographic nomination invitation with four icons in review mode, retained draft form in review mode, white 2027 closing section with arrow links.
- Original Adobe exports: `public/assets/adobe/educate.svg` (Group 11), `connect.svg` (Group 13), `elevate.svg` (Group 15) and `ecosystem.svg` (Group 17). The decorative outer ecosystem lines are native SVG with selectable HTML labels. The fourth Awards lotus was recreated as SVG from the reference because it was not included among the artboard's exportable assets.

## Deliberate constraints / outstanding items

- The common homepage header/footer and approved roomier site gutters take precedence over XD's old menu destinations and unfinished footer controls.
- XD includes placeholder images. Existing site photos fill those slots; they are illustrative, not claimed to depict award winners or a past YogaRise event. Final audience/category imagery can replace these without redesigning their layout.
- About team remains excluded from production, awaiting Valerie's final revision.
- Awards categories, nomination invitation, form and nomination buttons remain excluded from production. Their Adobe-style designs exist in review mode; no new form destination or data collection is introduced.
- Existing approved body copy is retained except for the redundant About hero headings, Adobe ecosystem title/lead hierarchy and promotion of section labels into the designed headings. The Awards heading's XD typo is corrected using the existing “Why the YogaRise Awards” wording. Previously removed duplicate copy is not restored.
- Existing noindex directives, DNS, analytics, MailerLite, temporary homepage, calculator and all other content-page layouts are unchanged.
- Visual/responsive checks require Shaun's separate approval. No automated tests or form submissions are authorised by this document. Build/inspection and any approved visual checks must be reported separately from deployment status.

## Verification status

- Production compilation (`npm run build`): passed.
- Local review compilation (`npm run build -- --mode review`): passed; needed host execution because the Windows sandbox blocked Vite's parent-directory lookup.
- Read the generated About/Awards HTML: shared header/footer retained, scoped Adobe stylesheet included, existing working CTA destinations preserved, unfinished sections stripped from production.
- Shaun approved desktop, laptop and mobile visual checks in the follow-up, along with fixing the laptop footer menu.
- Extension-only visual review completed against local review and production builds. No Windows/Edge window control, automated tests or form submissions were used.
- Shaun authorised production deployment after these checks. Publication status is recorded by the Cloudflare Pages deployment for the corresponding Git commit.

## Responsive follow-up — 11 September 2026

- Shared footer: replaced uneven flex wrapping with a deliberate grid. Shaun subsequently requested the compact two-column menu on wide screens too. All ten links now use two aligned columns at every width, capped at 30rem beside the logo; mobile retains two columns below the logo. Link destinations and shared markup are unchanged.
- Image grids: allowed for two/three lines of heading text plus divider padding, preventing photos from starting at different heights. Confirmed all five About audience photos have the same top coordinate at 1280px after the change.
- Short section dividers are left-aligned with their headings and body copy.
- About/Awards no longer inherit the global 320px body minimum, avoiding clipping when a 320px browser viewport also reserves space for a scrollbar.

### Visual coverage

- About: 1920×1080 desktop diagram/footer; 1366×768 laptop hero, full-page layout and footer; 1280×600 short-laptop hero, section flow and final image-grid alignment; 1024×600 small-laptop diagram; 768×1024 tablet image grid; 390×844 mobile hero, mission, ecosystem, closing actions and footer; 320×568 narrow layout and open/close menu.
- Awards: 1366×768 laptop hero, categories and invitation; 1440×900 full production page; 768×1024 tablet categories; 390×844 mobile production hero/closing and review form; 320×568 narrow hero/categories/form.
- Full homepage: shared footer visually checked at 1280×720; layout/overflow inspected at the 1601px transition to the wide grid. The wide grid was also visually checked on About at 1920px.
- Production preview confirms About's team remains absent and Awards contains only its approved hero, purpose and 2027 closing sections, with no nomination form. Review-only content remains available in the local review build.
- Production and review compilation passed after the CSS adjustments. These were visual/DOM layout checks, not automated tests, form tests or a guarantee covering every browser/device. Temporary viewport override was reset afterward.
- Wide-screen footer follow-up: production compilation passed and the compact two-column menu was visually checked through the Edge extension at 1920×1080. All ten links occupy a 480px-wide grid; the temporary viewport override was reset. Existing laptop/mobile rules and content publication holds were preserved.
