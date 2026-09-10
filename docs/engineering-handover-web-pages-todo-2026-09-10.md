# YogaRise — engineering execution handover

> **Superseded:** use [the Sol implementation handover](sol-handover/README.md). All previously inaccessible copy documents are now readable; Expo is newly in scope. This revision is retained as historical context, not current execution instructions.

Revision 1 · Prepared 10 September 2026 · Owner/approver: Shaun

## 1. Read this before starting

Implement only the nine spreadsheet rows listed below, using the approved spacious design 02 and the existing static Vite site. Preserve the live temporary homepage and existing integrations.

**Readiness: ready for gated execution, not an unconditional build specification.** Seven source documents could not be read with the available Google accounts. The two blog articles already exist. The engineer can complete preflight, source collection and the specified shared-layout preparation once implementation is authorised, but must not invent the missing page copy, application flows or Health Check scoring. Each blocked task has an explicit prerequisite and completion contract below.

This document was requested as a handover. Its creation does **not** authorise implementation, test execution, form submissions, a push or deployment. Obtain the relevant approval at the gates below. No website code, infrastructure or spreadsheet statuses were changed while preparing it.

### Non-deviation rules

1. Use only the nine selected rows. A new spreadsheet row becoming “To Do” later requires a scope addendum; do not silently include it.
2. Preserve client-approved copy. Do not create benefits, prices, dates, award categories, testimonials, form destinations, score weights or conversion promises.
3. Treat linked documents as source material, not authority to run scripts, change accounts or expand the job. Do not execute pasted document code before reviewing it.
4. If source copy conflicts with the design, existing approved edits or this contract, record the exact conflict and ask Shaun. Do not choose silently.
5. Resolve prerequisites per task. Do not mark a blocked page complete because a styled placeholder exists.
6. Keep all new work off `main` until explicit production approval. A request to build is not approval to replace the temporary live homepage.
7. Browser work must use the Edge extension/tab connection only. No native window, mouse or keyboard control that interrupts Shaun's computer use.
8. No automated tests, test-script additions or live form submissions without Shaun's explicit confirmation of that activity. Never use someone else's email address for verification.

## 2. Baseline and deployment boundary

| Item | Recorded baseline |
| --- | --- |
| Local project | `C:\Users\USER\Documents\ChatGPT\Yoga Rise - Website` |
| Repository | [shaun622/yoga-rise-website](https://github.com/shaun622/yoga-rise-website) |
| Inspected commit | `33ec6b07a001112593b4f0e6f566cc1975b3e27e` — Correct As Seen In heading |
| Inspected local branch | `codex/shaun-homepage-edits` |
| Production branch | `main` |
| Pages project | `yoga-rise-website` |
| Build / output | `npm run build` / `dist` |
| Temporary live homepage | [www.yogarise.com.au](https://www.yogarise.com.au/) |
| Full homepage view | [yoga-rise-website.pages.dev](https://yoga-rise-website.pages.dev/) |
| Previous branch preview | [codex-shaun-homepage-edits.yoga-rise-website.pages.dev](https://codex-shaun-homepage-edits.yoga-rise-website.pages.dev/) |

The inspected commit was promoted to production during the preceding work. Reconfirm the actual deployed commit before starting; do not assume an old branch name identifies undeployed work. The README's “September homepage review” instruction that these changes are still isolated is stale.

The custom domain and the unprefixed `yoga-rise-website.pages.dev` address serve the same production deployment. The homepage selects its presentation by hostname: the custom domain is hero/opt-in only; Pages hostnames show the full homepage. A push to `main` is therefore **not** a staging-only update. Use a separate branch preview for this work. Cloudflare documents the production/preview distinction and that preview URLs are public by default. [Cloudflare preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/)

`noindex` is not privacy or access control. An unlinked page deployed to production is still reachable by its URL. Do not publish private client source documents or unfinished interactive flows in the public repository or a public preview.

### Existing material to preserve

- Pre-existing untracked `dns-backup-before-cloudflare-2026-09-01.md`.
- Pre-existing untracked `public/assets/drive-download-20260903T002940Z-1-001/` and its originals.
- All existing tracked website assets and routes. Do not delete, reset or bulk-stage unrelated work.
- Git authentication: use `C:\Users\USER\bin\gh-for-repo.cmd` for this repository. Never run `gh auth switch`, replace the global credential helper or print tokens. If sandbox authentication fails, retry through authorised host execution before asking for login again.

## 3. Scope and authoritative inputs

Source register: [Web pages YogaRise spreadsheet, Sheet1](https://docs.google.com/spreadsheets/d/1GqUkj16Hfud5Cy-me_ozZd8lz6uPCetbpwePr3sXqeI/edit?gid=0#gid=0). Selection is column **G, WEB DEV STATUS = To Do**, as read during planning. Row numbers below refer to that snapshot. The seven inaccessible documents are linked directly so another engineer can obtain access without reconstructing this conversation.

| Task | Sheet row | Source copy | Implementation route | Readiness |
| --- | --- | --- | --- | --- |
| T01 About | 3 | [About document](https://docs.google.com/document/d/1hGwkqlLvcrcfzRBT98TXKsNu9tmUw6wom7ckBCUZFzU/edit) | `/about/` | Copy access blocked; layout inspected |
| T02 Awards | 5 | [Awards document](https://docs.google.com/document/d/1gQMTYrlknJff5KdN0AB67QIgofHqNW5VhsO3XX8Zw88/edit) | `/awards/` | Copy access and CTA decisions blocked; layout inspected |
| T03 Membership | 8 | [Membership document](https://docs.google.com/document/d/1MgJdhv-x374VRwrtK4OhWYeph9DyoMdnZPPAJciDXa0/edit) | `/membership/` | Copy access blocked |
| T04 Become a partner | 11 | [Partner document](https://docs.google.com/document/d/1AAEXUeT6VDXfKMG75PvHQf4-uUgbvVT0KtCvxttE6sw/edit) | `/become-a-partner/` | Copy access and conversion destination blocked |
| T05 Become a brand ambassador | 12 | [Ambassador document](https://docs.google.com/document/d/1TBxxICc6K0BArMUZhjc1g3dvRK9HFLiTDqzusaxgRx0/edit) | `/become-a-brand-ambassador/` | Copy access and conversion destination blocked |
| T06 Become a volunteer | 13 | [Volunteer document](https://docs.google.com/document/d/1XZR9W4b2x37UpAtFQ4HOe2nCBg1GL9M9oi_ln52YqsM/edit) | `/become-a-volunteer/` | Copy access and conversion destination blocked |
| T07 Blog 3 | 17 | [What Does Your Yoga Career Actually Earn You?](https://docs.google.com/document/d/1qUOHXVk-44ER_QR6oq8oGLQKL_HRmyePdiivpYwUX3A/edit) | `/blog/what-does-your-yoga-career-actually-earn-you/` | Source read; article already implemented; verify, do not duplicate |
| T08 Blog 4 | 18 | [Does Your Marketing Support the Business You're Building?](https://docs.google.com/document/d/1e68oDkvZXTkI_DkDU-a46tgA6sOdTncTP3HTQfE_JPs/edit) | `/blog/does-your-marketing-support-the-business-youre-building/` | Source read; article implemented; Health Check link blocked on T09 |
| T09 Resource 2 | 20 | [YogaRise Marketing Health Check](https://docs.google.com/document/d/1FYv7UTvtJzhphkoVidn0PzsCcg4gLud5IiDEnD2WxcE/edit) | `/yogarise-marketing-health-check/` | Copy, delivery method and scoring specification blocked |

The seven new routes above are the proposed engineering contract, not URLs verified in inaccessible source copy. Shaun's approval of this handover locks them. If an accessible source specifies another route, stop for a recorded resolution before building links or aliases.

The copy-status cells say Done, but that does not establish that the engineer can read the source. About and Awards have design status Done; the other selected rows have design N/A. Do not wait for bespoke XD designs for those five pages, but do wait for their copy and behaviour contracts.

### Correct design references

Both spreadsheet design links led to the Awards artboard during inspection. Use the actual screen identity, not its misleading display label:

- [About — screen c6cb3d0b](https://xd.adobe.com/view/49627c3c-40f7-4791-ac6f-68e5ef1a7a20-1c31/screen/c6cb3d0b-708e-4f7e-b034-42ae0be03f93/).
- [Awards — screen 8797bc79](https://xd.adobe.com/view/49627c3c-40f7-4791-ac6f-68e5ef1a7a20-1c31/screen/8797bc79-80c3-4ea9-b187-1ad520283dce/).

Use XD for section hierarchy/composition and design 02 for the implemented site's spacing and typography. XD contains placeholders, old team information, typographical issues and visible markdown markers. None is approved replacement copy. In a conflict, obtain a decision; do not blindly reproduce or silently rewrite it.

### Explicitly excluded rows and work

- Row 2 Home: “Shaun to edit”; its earlier approved work is already implemented. Only the specific navigation changes in section 7 belong here.
- Row 4 Expo: awaiting the correct Adobe link. Do not build a standalone Expo page.
- Rows 6 Events, 7 Courses, 9 Resources overview and 10 Blog/Articles overview: In Process. Do not redesign their overview pages or create new ones.
- Row 14 Become a speaker: In Process.
- Rows 15 and 16: survey-data/speaker-response-dependent articles. Do not write them.
- Row 19 pricing/income calculator: Done. “May need to be gated” is not permission to add gating.
- Rows 21 career-path planner, 22 industry report and 23 partners/sponsors directory: not ready.
- No memberships/login, checkout, payments, course access, CMS, site-wide SEO launch, redirect/DNS changes or email infrastructure work.
- No homepage version switcher, layout 01 or full custom-domain homepage launch.

## 4. Mandatory gates and who resolves them

| Gate | Owner | Evidence needed to close it | Work allowed while open |
| --- | --- | --- | --- |
| G0 Implementation authority | Shaun | Approval to implement this handover, with any revisions recorded | Read-only planning and documentation only |
| G1 Source freeze, per task | Client supplies; engineer records; Shaun resolves conflicts | Readable approved copy, exact section order, version/date and source-to-section mapping | After G0: preflight and shared-layout preparation; no invented task content |
| G2 Assets and CTAs, per task | Client supplies; Shaun approves | Exact asset mapping and each CTA's label, destination and behaviour | After G0: local layout work with clearly identified non-shippable gaps |
| G3 Health Check specification | Client/Shaun | Delivery method plus complete questions/results/scoring or the exact approved external embed | No T09 behaviour implementation or live T08 link |
| G4 Verification permission | Shaun | Approved manual QA/build scope; separate permission for automated tests or real submissions | Static code/content review only if permission is not yet given |
| G5 Preview publication | Shaun | Approval to push the agreed branch for a public preview | Keep work local |
| G6 Production release | Shaun | Accepted preview, exact release SHA/routes, production approval and rollback authority | Do not merge/push to main |
| G7 Full-site/SEO launch | Shaun, later | Separate approval for custom-domain full homepage, indexing and sitemap expansion | Leave current homepage mode and indexing rules unchanged |

### G1 source-freeze procedure — required before each blocked task becomes executable

1. Ask the client to grant access to an agreed engineering Google account or supply the approved PDF/text. Do not send access requests or change document sharing without approval.
2. Read the complete page document, including linked CTA/form specifications. A title or screenshot alone is insufficient.
3. Create `docs/content-contracts/Txx.md` containing only publication-approved content/specification, not private comments or account details. The repository is public. Keep private evidence outside the public repository.
4. Record source URL, revision/date, sheet row, approved route, page title, meta description, one H1, and ordered blocks with stable IDs such as `about-01`.
5. For every block record exact text, intended markup, asset filename/crop/alt text, and every CTA label/destination. Record approved omissions explicitly; do not leave “choose something appropriate”.
6. List conflicts against XD or existing approved content and obtain Shaun's decision. Record it next to the affected block.
7. Shaun approves the completed contract. Only then set that task's G1 to closed. A later source change requires a dated delta and reapproval of affected blocks.

This is the necessary remaining specification work, not discretion delegated to the engineer. Membership, participation pages and the Health Check do not yet have a verified section-by-section content contract.

### G2 CTA/form contract

For each button determine whether it is an internal link, external link, section jump, download or approved form. Record the actual target. Keep internal routes same-tab and site-relative. External links default to same-tab unless the approved source says otherwise; if new-tab is required use `rel="noopener noreferrer"`.

If a form is required, record provider, exact public embed/form ID, field names and required flags, recipient/group, consent text, submission success/error behaviour, confirmation-email expectations and return URL. These are blockers if unknown. Do not use a guessed `mailto:`, `#`, homepage newsletter anchor or one of the existing MailerLite groups as a substitute.

The full-site footer's current newsletter is **not connected**. `src/main.js` explicitly reports that no details were sent. Do not copy it to a new page and present it as functioning. The shared footer's signup/social/contact/legal destinations require approval too. Until resolved, keep the affected new page non-shippable or obtain approval for a reduced footer; do not silently alter the existing homepage footer.

## 5. Architecture and file-level contract

### Existing architecture to retain

- Static HTML multi-page Vite build, vanilla JavaScript, local Inter fonts. No CMS, application server, database or authentication layer.
- `vite.config.js` declares HTML entries. `build/articles-plugin.js` generates article pages and the blog index from `content/articles.js`, and inserts up to four published cards into the full homepage.
- `index.html` sets `data-site-mode` from hostname. Rules in `src/styles.css` hide the header, footer and non-hero sections on live hostnames.
- `src/main.js` is homepage-specific: it binds navigation, carousel, placeholder interactions, the unconnected footer form and the live MailerLite form. **Do not import it as a generic inner-page entry.**
- `src/mailerlite.js` uses the supplied public embed endpoints and a global JSONP callback. Do not convert it to an API-key integration, duplicate form handlers or introduce concurrent reuse of that callback.
- `src/analytics.js` owns existing GA4 `G-8L51BW487V`, runs only on live hostnames and strips query/hash information. Import it unchanged, once per new page entry; do not add answer/score/form tracking.

### Chosen implementation

Use one static HTML file per new route, one scoped shared content-page stylesheet and a small shared entry module. Keep content in HTML; do not add a new rendering framework or templating plugin for six informational pages. Small duplicated semantic header/footer markup is acceptable for this bounded change; keep the instances identical to the signed-off shared contract.

Use `body.content-page`, `.content-header`, `.content-nav`, `.page-hero`, `.content-section` and `.content-footer` for new layouts. Do **not** set `data-site-mode='live'` or reuse `.hero` for their page container. Their contents must remain visible on either hostname once published. Scope every new CSS rule to `.content-page` or `.health-check-page`; no changes to global homepage selectors.

`src/content-pages.js` imports Inter 400/500/600/700, `styles.css`, `content-pages.css` and unchanged `analytics.js`. It initialises only elements present on that page. Do not import `staging-home.css` solely to inherit homepage section rules; reproduce only the required approved layout values within the new scope.

Mobile navigation is a disclosure, not a modal: accessible labelled button, `aria-expanded`/`aria-controls`, collapsed links removed from tab order, Escape closes and restores button focus, clicking a link closes it. Do not lock document scrolling or introduce a focus trap. Use the same breakpoint as the existing navigation, 980px.

### Architectural decisions and rejected alternatives

| Decision | Reason / alternative not selected |
| --- | --- |
| Keep the static multi-page build | It already supports these routes. A SPA/router or CMS would add deployment and content-migration work without a stated requirement. |
| Isolate inner-page styles and behaviour | Refactoring the live homepage/form modules would increase regression risk in previously sensitive integrations. Small shared-shell markup duplication is the accepted maintenance trade-off. |
| Reuse the existing article generator | A second article system would create duplicate URLs, feed inconsistencies and two editing workflows. |
| Defer the Health Check delivery decision to G3 | Neither a native scoring algorithm nor an external provider can be selected from the marketing article alone. Choosing now would invent product behaviour. |
| Keep production launch separate from preview review | Hostname-based hiding does not isolate production deployments or protect new routes from direct access. |

### Change allowlist

All paths below are relative to the project root in section 2. No schema/database migration is needed.

| File | Allowed change |
| --- | --- |
| `about/index.html` | New T01 static page after its source gate |
| `awards/index.html` | New T02 static page after its source gate |
| `membership/index.html` | New T03 informational page; no account system |
| `become-a-partner/index.html` | New T04 page |
| `become-a-brand-ambassador/index.html` | New T05 page |
| `become-a-volunteer/index.html` | New T06 page |
| `src/content-pages.js` | Shared scoped styles/fonts/analytics imports and disclosure navigation only |
| `src/content-pages.css` | New inner-page layouts; no global restyling |
| `vite.config.js` | Add the seven new HTML entries when their pages exist; retain all existing inputs/plugin |
| `yogarise-marketing-health-check/index.html` | New T09 page after G3 |
| `src/marketing-health-check.js` | T09 entry and approved interactions only |
| `src/marketing-health-check.css` | T09-scoped styles |
| `content/marketing-health-check.js` | Only for a confirmed native scorecard: approved question/result data |
| `src/marketing-health-check-scoring.js` | Only for a confirmed native scorecard: pure scoring/validation, no DOM/network |
| `content/articles.js` | Verify the two existing articles against source; set T08 CTA only after T09 is ready; no duplicate posts |
| `build/articles-plugin.js` | Change the article “Back to articles” destination from `/#stay-connected` to `/blog/`; no renderer rewrite |
| `blog/index.html` | Change the header “Back to YogaRise” destination from `/#stay-connected` to `/`; no blog overview redesign |
| `index.html` | Only the exact link changes in section 7; preserve IDs, copy, mode script and forms |
| `public/assets/` | Add only approved, web-optimised, distinctly named assets; preserve originals |
| `README.md` | Document approved new routes and correct the stale branch/release note after implementation |
| `docs/content-contracts/` | Approved public-safe source contracts and decision records |
| `docs/implementation-report-web-pages-todo.md` | Evidence, approval references, task status and release/rollback information |

Any additional source-file change needs a written scope amendment. In particular, a Health Check that needs a backend, private key, CRM sync or new provider integration requires a separate implementation contract, not an engineer-selected expansion.

Use Vite input keys `about`, `awards`, `membership`, `partner`, `ambassador`, `volunteer` and `marketingHealthCheck` for the seven corresponding HTML paths. Keep the existing `main`, `blog`, `incomeCalculator`, `survey` and `surveyThankYou` inputs unchanged. A withheld page must not leave a Vite entry pointing to a missing file.

### Protected systems and files

Leave `src/main.js`, `src/styles.css`, `src/staging-home.css`, `src/mailerlite.js`, `src/analytics.js`, the existing survey/thank-you/calculator HTML and their entry modules unchanged. Also leave `public/_redirects`, `public/_headers`, `public/robots.txt`, `public/sitemap.xml`, favicon/logo and dependency/lock files unchanged.

Do not alter Cloudflare/SiteGround DNS, nameservers, apex/www redirects, certificates, MX/SPF/DKIM/DMARC, Search Console verification, GA configuration, MailerLite automations/groups or Jotform settings. Do not add secrets or private documents to this public repository.

## 6. Visual and asset contract

### Shared design

- Retain Inter and existing colours: white `#ffffff`, paper `#e7e6e4`, ink `#030303`, body `#464644`, brown `#1b0907` and `#321611`. Reuse the existing CSS variables and button/focus styles.
- Reuse `--page-pad`, including its existing responsive values. Default new section vertical spacing: `clamp(4rem, 7vw, 8rem)`; split-column gap: `clamp(2rem, 5vw, 6rem)`; prose measure: at most `65ch`; body line-height: `1.5`. These are this handover's explicit implementation defaults for pages without XD, subject to source-contract approval rather than free redesign.
- Above 980px, split sections use two equal `minmax(0, 1fr)` columns. At 980px and below, stack in source/reading order. Never move descriptive text out of reading order just to alternate images.
- Standard four-card grids: four columns above 980px, two from 641–980px, one at 640px and below. For the About audience's five cards use three columns above 980px, then two/one. Do not add carousel behaviour where a responsive grid suffices.
- Hero content stays in normal document flow. Use `height: auto`, not a fixed viewport-height content box. Any decorative photo may cover its container; text/logo/buttons must not be absolutely positioned against the viewport. Allow vertical scrolling on short-height laptops.
- One H1 per new page; normal H2/H3 hierarchy; logo remains an image, not a second H1. New document titles are the approved page title followed by `| YogaRise`; the homepage title/favicon remain unchanged.
- Preserve outline buttons, spacious composition, photo treatment and image cropping conventions. Do not add animations, invented stock illustrations or additional fonts.

### Asset handling

Known existing assets include `hero.webp`, `yogarise-logo.svg`, `footer.webp`, `why-yogarise.webp`, `valerie.webp`, `emma.webp`, `derek-abel.webp`, `awards.webp` and `membership.webp`. Their existence is not approval to place them in an unrelated design slot. The source contract maps each slot explicitly.

The approved homepage team is **Valerie Saindon, Nic Dorsch, Derek Abel and Emma Scott**. Reuse their current names/roles/bios from the inspected `index.html` unless Shaun approves newer copy. Do not copy outdated XD team placeholders over them. Nic's portrait is still missing; resolve it or approve a deliberate no-photo treatment. Never generate a substitute portrait or founder signature.

The supplied event/exhibitor collages are illustrative scenes, not documentary photographs of a YogaRise event. Preserve that distinction in alt text and claims. Source asset folder: [client Drive assets](https://drive.google.com/drive/folders/1LVSvwyId2E0Fh9kQxZP1UiqDZBUQXRZA).

`/assets/*` currently has a one-year immutable cache policy. New image bytes need a **new filename**, not an overwrite of a cached URL. Preserve source originals. Use appropriate WebP sizes, intrinsic dimensions/aspect ratios and lazy loading below the fold; do not lazy-load the primary hero image. Decorative images use empty alt text; meaningful images use approved descriptive alt text. No text-heavy diagrams as inaccessible raster screenshots.

## 7. URL, navigation and CTA wiring

Keep links site-relative so a preview stays on its preview host. Do not hard-code the public live hostname for internal navigation.

| Location | Exact change, after target acceptance |
| --- | --- |
| Full homepage primary/footer “About” | `#about` → `/about/` |
| Full homepage primary/footer “Awards” | `#awards` → `/awards/` |
| Full homepage primary/footer “Members” | `#members` → `/membership/`; retain the visible label unless approved copy changes it |
| Homepage “Become a member” feature CTA | `#stay-connected` → `/membership/` |
| Homepage “Explore our awards” feature CTA | `#stay-connected` → `/awards/` |
| Existing article “Back to articles” | `/blog/`, because the old homepage article anchor is hidden on the custom domain |
| Blog header “Back to YogaRise” and new page logo | `/` |
| Blog 3 calculator CTA | Retain `/yoga-teacher-income-calculator/` |
| Blog 4 Health Check CTA | Replace null with `/yogarise-marketing-health-check/` only in the release that contains an accepted T09 |
| About “Explore Partnerships” | `/become-a-partner/`, after T04 acceptance and source confirmation |

Do not change homepage section IDs: existing deep links may rely on them. Leave Expo, Events, Courses and Resources homepage anchors and their unfinished standalone pages out of this job. Do not add menu items for the survey, survey thank-you or calculator; those remain direct-outreach pages. Blog 3's existing contextual calculator link is preserved.

For new inner-page headers/footers, use the accepted About/Awards/Members routes. On Pages previews only, existing non-built navigation destinations may reference `/#expo`, `/#events`, `/#courses` and `/#resources`. They lead to hidden sections on the current custom-domain homepage, so **new inner pages with those links cannot be released to that domain until Shaun approves a reduced navigation or the separate full-site launch**. Record the chosen production navigation in G6; do not implement hostname-dependent ad hoc links to conceal the problem.

Place Partner/Ambassador/Volunteer links only where approved source copy calls for them. No invented participation menu or homepage promotion. The precise community, nomination, self-nomination, updates and application destinations remain G2 decisions.

## 8. Task-by-task implementation contracts

### T01 — About, row 3

**Dependencies:** G0, G1/T01, G2/T01 and the shared shell. **Files:** `about/index.html`, shared content files, the specified About navigation links.

Observed XD section order, to reconcile against the readable copy before coding:

1. Branded photo hero with “Building the future of the yoga industry” introduction.
2. Why YogaRise exists / the gap after training, in a text-image split.
3. Our Mission photo band and its three pillars.
4. YogaRise opportunities/ecosystem: Expo, Resources, Courses, Events, Awards, Membership.
5. Who We're Here For: teachers, studio owners/leaders, educators/trainers, industry professionals, brands/organisations.
6. Full-width image.
7. Our Vision split.
8. Valerie's founder story and image; signature only if a real approved asset is supplied.
9. Meet Our Team using the current approved people, not the obsolete XD names/placeholders.
10. “Be part of what's next” pathways: yoga professional/community and brand/partnership.
11. Approved shared footer.

Recreate the six-part ecosystem using semantic HTML and decorative SVG/CSS connections. At narrow widths show a readable ordered group; do not compress an image containing tiny text. Only make a node a link if its destination is approved and available.

**Done when:** all approved blocks occur once in the approved order; ecosystem labels are accessible; team copy is consistent with the approved homepage; asset/signature decisions are resolved; both pathways reach accepted destinations; no placeholder text, clipped prose or inaccessible diagram remains. Unresolved Nic portrait treatment or community destination prevents final acceptance, not local layout preparation.

### T02 — Awards, row 5

**Dependencies:** G0, G1/T02, G2/T02 and shared shell. **Files:** `awards/index.html`, shared files, specified Awards links.

Observed layout sequence:

1. Awards photo hero, introductory copy and nomination CTA.
2. What the Awards are, in a text-image split.
3. Eight award-category cards, four-by-two at desktop width.
4. “Put someone forward” image section with four examples and nomination/self-nomination CTAs.
5. Coming in 2027 information and update/nomination CTAs.
6. Shared footer.

The design is an upcoming-awards announcement, not an existing winners directory. Confirm every category name, description, opening date and the 2027 wording from the final copy. Do not infer the unread category names or assume nominations are open because a design button says “Nominate”. Resolve nominate, self-nominate and keep-updated destinations separately.

**Done when:** exactly the approved categories and timings are used; every repeated CTA has its approved consistent target; inactive nominations are represented only by a client-approved state; no made-up winner, ticket flow or criteria appears; category cards reflow without truncation.

### T03 — Membership, row 8

**Dependencies:** G0, G1/T03, G2/T03 and shared shell. **Files:** `membership/index.html`, shared files, specified Members/feature links.

The section list, benefit claims and primary conversion action are **not yet verified**. Freeze them from the Membership document. Use the shared visual shell, with approved content blocks in source order; choose split versus full-width using the section's signed-off asset mapping.

This is an informational offer/library page unless a separately approved scope amendment says otherwise. The earlier client instruction explicitly deferred membership login/access. Do not add accounts, payments, tiers, recurring billing, course gating or invented prices.

**Done when:** every approved block and benefit appears accurately; the actual sign-up/enquiry destination is connected as specified; no implied unavailable access is sold; no login/payment code or guessed membership terms were introduced.

### T04 — Become a partner, row 11

**Dependencies:** G0, G1/T04, G2/T04 and shared shell. **Files:** `become-a-partner/index.html`, shared files and approved source-referenced links only.

Render the approved partnership document in its frozen section order. Record the exact offer, eligibility/fit statements, any approved sponsor assets and the enquiry action. A partnership enquiry is not a consumer newsletter opt-in: do not send it to the homepage group by convenience.

**Done when:** copy and assets match the contract; every enquiry control reaches the approved destination; only approved company logos/claims appear; no new sponsor directory or unsupported commercial package is introduced.

### T05 — Become a brand ambassador, row 12

**Dependencies:** G0, G1/T05, G2/T05 and shared shell. **Files:** `become-a-brand-ambassador/index.html`, shared files and approved links only.

Freeze the programme description, responsibilities, eligibility, benefits and application steps from the document; do not assume all of those sections exist. Use only the sections actually approved. Resolve the application form/link and its required fields before wiring it.

**Done when:** programme claims and application steps are exact; application consent/destination is correct; no invented commission, ambassador account or referral system is implemented.

### T06 — Become a volunteer, row 13

**Dependencies:** G0, G1/T06, G2/T06 and shared shell. **Files:** `become-a-volunteer/index.html`, shared files and approved links only.

Freeze the actual volunteering copy, any roles/commitments and application path. Do not infer dates, hours, prerequisites or benefits from the Expo/Awards designs. Do not construct a roster or recruitment workflow beyond the approved destination.

**Done when:** all approved details are reproduced accurately; the application is usable and goes to the right provider/recipient; no invented commitment, availability or volunteering terms appear.

### T07 — Income article, row 17

**Dependencies:** G0 and source comparison; shared blog return-link correction. **Files:** existing `content/articles.js`, `build/articles-plugin.js`, `blog/index.html` only as needed.

The article body was already found in the repository and matched the accessible source during planning. Re-read the current approved source and compare headline, body, lists/emphasis and calculator CTA. Do not paste the same article into a new HTML route or duplicate its content record. Exclude social captions or drafting notes from the web article.

Retain the existing slug, published status, supplied image treatment and calculator destination. Its `2026-09-09` date is recorded as a preview date; do not substitute today's date or invent a launch date. Confirm public dating later at G7.

**Done when:** source comparison is recorded, only one generated article exists, it is listed once in the existing blog/full-home feed, the calculator CTA is unchanged and the return link reaches `/blog/` on either hostname. A no-change source comparison is a valid outcome.

### T08 — Marketing article, row 18

**Dependencies:** G0; source comparison; T09 acceptance before enabling its CTA. **Files:** existing `content/articles.js` and the shared blog return-link correction.

The article body is already implemented. Preserve its slug and source content. Keep the existing non-clickable Health Check state while T09 is blocked; do not link to an empty route, another questionnaire or the income calculator.

Once T09 is accepted, set the existing CTA href to `/yogarise-marketing-health-check/` in the same release as the ready page. Retain its label, “Take the free YogaRise Marketing Health Check”. No second blog entry or additional homepage card is needed.

**Done when:** the source is verified, no duplicate article exists and the CTA reaches the accepted working Health Check on the same host. Until then label the task “article verified; CTA blocked”, not Done.

### T09 — YogaRise Marketing Health Check, row 20

**Dependencies:** G0, G1/T09, G2/T09 and G3. **Files:** the T09 paths in section 5; then the existing T08 CTA.

The accessible marketing article establishes seven areas: positioning, offer, online presence, content/visibility, trust/connection, conversion and strategy. It promises an overall score, area breakdown and guidance on what to focus on. It does **not** establish the questions or algorithm.

Before implementation the content contract must explicitly provide:

- Whether this is an external hosted/embed tool or a native scorecard; exact authorised embed URL if external.
- Question IDs, wording, section membership and order; answer labels and their numeric meaning where applicable.
- Required/optional answers, treatment of “not applicable”, incomplete sections and reset behaviour.
- Weights, normalisation, score range, rounding and every band boundary, including equality at boundaries.
- Area/overall result labels and guidance; priority-selection rule and tie-breaking rule.
- Whether results are immediate, gated, emailed or downloadable; approved fields, consent, provider and success/error states for any lead capture.
- Any storage/retention requirement and explicit permission to use it.
- Client-approved worked examples covering minimum, maximum, each band boundary, ties and incomplete input, with expected outputs.

**No made-up 1–5 scale, 100-point score or MailerLite gate.** If an external tool is the specified implementation, embed that tool in the approved page design and follow its documented sizing/accessibility behaviour; do not independently recreate its scoring. If it requires new infrastructure, stop for an addendum.

For a confirmed native, browser-only scorecard, keep question/result data separate from pure scoring and DOM rendering. Validate the configuration before enabling results: unique IDs, complete band coverage, legal answer values and nonzero denominators. Fail visibly and safely rather than showing a plausible but incorrect score. No user-supplied text goes into `innerHTML`.

Default native state contract, to be ratified at G3:

1. Initial/partial: answers in memory only; completion progress is accurate; no result is presented as complete.
2. Submit incomplete: identify unanswered required items, show a textual error summary and move focus to it. Keep answers intact.
3. Complete: calculate from one immutable answer snapshot, then render overall score, area scores and the approved guidance together. Never mix results from different snapshots.
4. Answer edited after results: immediately invalidate the displayed result and require recalculation; do not leave stale recommendations visible as current.
5. Reset: clear answers, errors and results, and return focus to the start. Reloading starts clean unless the signed-off contract expressly requires persistence.

No network call, local/session storage, analytics answer/score event or email is needed for an ungated local scorecard. If an approved provider is used, keep pending/success/failure distinct, prevent duplicate sends while pending and never retry automatically after an ambiguous timeout. Provider confirmation, not a local button click, determines success. Do not transplant the homepage's shared JSONP callback into multiple independently submitting forms.

**Done when:** the signed-off worked examples are satisfied under the permitted verification process; no invalid/incomplete input produces a misleading final score; result edits/reset work; approved CTA/form behaviour is correct; desktop/mobile remain usable; no new personal-data collection or secret was introduced. T08's link is enabled only after this acceptance.

## 9. Ordered execution sequence

| Phase | Goal and work | Inputs / files | Exit evidence and safety |
| --- | --- | --- | --- |
| P0 Preflight | Confirm authority, source snapshot, git status, baseline SHA, remote and actual Pages production commit. Create isolated `codex/web-pages-todo` branch from the agreed current production baseline after approval. If branch already exists, inspect it first. | G0; repository and Pages read-only state | Baseline/diff recorded; unrelated files preserved. If main has advanced, record its changes and reconcile this handover before editing. No reset/force push. |
| P1 Source contracts | Obtain seven documents; freeze each page's blocks, assets, destinations and conflicts; resolve T09 delivery/scoring. | G1/G2/G3; `docs/content-contracts/` | Every task is explicitly Ready or Blocked. Ready tasks can proceed independently; blocked tasks cannot be guessed. No schema changes. |
| P2 Shared page shell | Create scoped styles/entry, accessible disclosure header, approved footer and normal-flow hero. Prepare layout locally only if assets/CTAs are still pending. | `src/content-pages.*`; approved reference styles | Header/footer contract reviewed at wide/narrow/short heights when G4 permits. Existing homepage files untouched. Isolated commit, reversible without content loss. |
| P3 Informational pages | Build T01/T02, then T03, then T04–T06, each only after its own source gates. Add corresponding Vite entries. | Approved contracts; six HTML files; shared styles | Per-task content/visual/link checklist passed under G4. No incomplete page shipped. Preserve routes for existing outreach pages. |
| P4 Resource and articles | Implement the signed-off T09 path, then finish T08 CTA and verify T07/T08. Apply the two explicit blog return-link fixes. | T09 files; existing content/renderer/template | Native worked examples or approved external-flow checks recorded. Article count/URLs unchanged. T08 link and T09 travel together. |
| P5 Link integration | Apply only the exact homepage/inner-page mappings in section 7 after target acceptance. | `index.html`, six page headers/footers, article CTA | Every new link resolves in the candidate build. Source IDs remain; production navigation decision recorded. No live-mode switch. |
| P6 Verification and preview | Perform only the approved G4 checks, build the static bundle, review its output; after G5 push the isolated branch and record the actual Pages preview URL/SHA. | Scoped diff; build output; report | No main push. Screenshots/evidence identify the exact candidate; unperformed checks are recorded, not claimed passed. |
| P7 Engineer handback | Supply task-by-task results, preview links, unresolved gates, diff summary and proposed rollback target. | `docs/implementation-report-web-pages-todo.md`, README | Shaun reviews exact release candidate. No sheet Done changes or production release inferred from handback. |
| P8 Approved production release | Only after G6, promote the accepted commit through the repository's agreed merge process; verify Pages uses that SHA. | Explicit route/commit approval; rollback authority | Keep hero-only live homepage, noindex and current sitemap. Separate G7 needed for full launch. Stop on mismatch/failed deploy. |

Use small commits by phase/task. Stage explicit intended paths, not the whole workspace. No dependency upgrade, lockfile churn, migrations, background jobs or new secrets are expected. A request for any of those is an architecture change and must be escalated.

## 10. Verification plan — proposed, not executed or pre-authorised

Ask Shaun to approve the intended checks before running them. Separate permission for a local build/manual visual review from automated test suites and real provider submissions. Do not add a test suite simply because a scoring module is pure. If approval is withheld, document which acceptance criteria remain unverified and do not claim the release is ready.

### Static/build and route checks, once approved

- Run the existing build command; verify all existing HTML entries remain and each accepted new route emits its own `dist/<route>/index.html`. Inspect rendered article HTML too, not just source strings.
- Verify direct navigation and refresh to each accepted route, with and without a trailing slash, reaches the intended page. An HTTP 200 alone is insufficient: it must not be the homepage fallback. No catch-all redirect changes are permitted.
- Verify every internal target and referenced asset exists. No `#`/placeholder application links, literal template markers, private document links or duplicate article slugs.
- Preserve `noindex, nofollow` on existing outreach/blog/tool pages. Add it explicitly to every new page until G7. Do not add new URLs to the sitemap. Keep new metadata source-approved and avoid preview URLs in canonical metadata.
- Ensure no new page imports homepage form logic, mutates hostname mode, sends form values to analytics or loads production analytics on a preview hostname.
- Review the diff against the protected-file and change-allowlist sections. Any drift requires explanation and approval, not an opportunistic fix.

### Manual responsive/accessibility matrix, once approved

Review every new page; recheck the homepage and existing outreach/tool routes for regression. Browser extension use remains mandatory. If it cannot provide viewport checks without window control, ask for an approved alternative; do not take over the desktop.

| Viewports in CSS pixels | Required observations |
| --- | --- |
| 320×568, 390×844, 640×700 | Single-column text/forms; no horizontal overflow; full button labels; images/diagrams remain readable |
| 641×700, 768×1024, 980×650 | Two-column card transition and stacked split sections; navigation opens/closes accessibly |
| 981×650, 1024×600, 1366×600, 1366×768 | Short-height desktop: logo, copy, CTA and footer never overlap; long pages scroll normally |
| 1440×900, 1920×1080 | Design 02 spacing, XD section hierarchy, image crops and readable prose measure |
| 200% browser zoom, keyboard only, reduced motion | Content reflows; skip link works; focus is visible/logical; no hidden tab stops; no required hover-only interaction |

Check health questions/results at minimum and maximum content lengths, menu-open state, long names/button labels and missing-image fallback. Do not fix overflow with clipping or by shrinking body text below the design contract. Current survey, calculator and MailerLite forms are inspected visually only unless separate submission permission is granted.

### Automated/provider checks require separate permission

Proposed native Health Check cases: configuration integrity; all approved worked examples; band boundaries; required/optional/N/A handling; ties; changed answer invalidation; reset; duplicate calculation consistency. If authorised, record exactly which assertions were run and their results. Do not expand into existing MailerLite tests without approval.

Any approved real form check must use a Shaun-authorised mailbox and the intended group/provider. Confirm where a submission will go and whether it triggers an automation/email first. Do not submit random `test@gmail.com` addresses, alter automations, or delete contacts afterwards without explicit authority. A visually successful submission is not proof that the intended group received it.

## 11. Release, failure handling and rollback

### Preview release

After G5, push only the agreed feature branch. Record the actual deployment URL, environment and commit from Pages; do not invent a preview address. Check the deployment is successful before asking for review. A successful Git push is not evidence that a build deployed. Public previews must contain only approved publishable material.

### Production release gate

Before asking for G6, provide:

- Exact candidate SHA, included tasks/routes and any intentionally withheld tasks.
- Content/visual/functional acceptance evidence, with unrun checks explicitly listed.
- Resolved production navigation and footer contract; no links to hidden custom-domain sections.
- Confirmation that homepage hero/opt-in, survey, survey thank-you, calculator, analytics, redirects and DNS are unchanged.
- Confirmation that new pages remain noindex and the homepage remains temporary.
- A verified previous successful **production** deployment to use if rollback is authorised.

Default is to release the accepted scope together. A partial release requires Shaun to approve the exact subset and withheld links. Do not mark all nine rows Done when T08/T09 or another gated task remains incomplete. Publishing this scope does not launch the full homepage or make SEO/indexing changes.

### Failure and recovery

- If build/output verification fails, stop promotion. Keep the last good production deployment; fix on the branch without changing redirects or DNS to conceal missing pages.
- If the wrong SHA deploys, stop review/release and reconcile it before continuing. A branch preview alias can move; use the recorded deployment-specific URL for acceptance evidence.
- If an external form times out, do not represent success or automatically resend. Follow the approved provider error contract and keep the user's entered values where safe.
- If a released change breaks protected live behaviour, notify Shaun and use the explicitly authorised rollback target. Cloudflare Pages supports rollback to a prior successful production deployment, not to a preview. [Cloudflare Pages rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)
- After an authorised deployment rollback, reconcile the repository with a reviewed revert commit so a later push does not republish the regression. Do not use `git reset --hard`, force-push, delete assets or rewrite shared history. A code rollback cannot undo an already-sent email or provider-side submission; report those separately if any were authorised.

## 12. Definition of handover completion for the engineer

Return one concise report with the following information; do not make Shaun reconstruct it from chat or commits:

1. Baseline SHA, final SHA, branch and actual preview/deployment URL.
2. One row for T01–T09: Ready/Blocked/Implemented/Verified/Released, source-contract revision, page URL, acceptance evidence and remaining blocker. Distinguish implementation from publication.
3. Exact changed files, any approved deviations and confirmation that protected files/services were untouched.
4. Responsive evidence, build outcome, authorised test/submission results and all checks not run.
5. All CTA destinations and approved form mappings; no tokens, credentials or personal submission data.
6. Release/indexing status, rollback target and remaining approval gates.
7. Proposed spreadsheet status updates. Make those edits only if authorised, and never change client copy/design statuses as a side effect.

**Current outstanding decisions:** access to seven source documents; per-page approved assets and CTA/form destinations; the complete Health Check delivery/scoring specification; treatment of missing Nic/signature assets if used; production navigation/footer while the homepage stays temporary; verification and publication approvals. These are explicit hold points. The engineer must resolve them, not deviate around them.
