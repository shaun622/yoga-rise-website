# YogaRise — Sol implementation handover

Prepared 10 September 2026 · Revision 2 · Start here

**Release update, 11 September:** Shaun subsequently approved publishing all eight pages with unfinished sections excluded. Use the [current publication and outstanding-work note](../published-pages-and-outstanding-items-2026-09-11.md) for release status. The original full-page copy/design and form contracts below remain references for completing omitted sections, not instructions to expose them now.

**Header/footer correction, 11 September:** Shaun selected the full homepage header and footer for all standard pages. The separate inner-page header sizing, inline mobile menu and minimal footer specifications below are superseded. Use the shared `build/site-header.html`, `build/site-footer.html` and `src/site-chrome.*`; do not recreate page-specific variants. The temporary signup homepage and header-free survey/thank-you pages retain their previously approved presentation.

## Outcome and authority

Build the eight new page layouts below, finish the two existing article tasks, and preserve the approved spacious **design 02**. All ten selected spreadsheet documents are now readable and their copy is saved in this package. **The previous “seven documents inaccessible” gate is resolved.** Expo is now marked To Do and is explicitly added as T10.

This replaces the execution instructions in `docs/engineering-handover-web-pages-todo-2026-09-10.md`. The old implementation report records historical work only. Do not use its unresolved-access status to stop this build.

The user requested this handover, not website implementation during its preparation. When Shaun assigns this to Sol to implement, proceed through all buildable local work without asking for layout decisions already specified here. Missing external integrations block publication of the affected page, **not construction of its layout, copy and form controls**. Do not invent missing business facts or tool logic to achieve a green checklist.

No production deployment, push, live signup/application submission, automated tests or added test scripts is authorised by this document alone. Preserve Shaun's existing requirement for explicit confirmation before tests. Treat local compilation, visual review and live submissions as distinct activities in the completion report. Do not send dummy subscriber data. Use Edge's extension/tab connection only for browser work; never desktop/window control.

## 1. Baseline and scope

Workspace: `C:\Users\USER\Documents\ChatGPT\Yoga Rise - Website`.

- Repository: `shaun622/yoga-rise-website`; current local branch `codex/web-pages-todo`.
- Inspected local HEAD: `e0e942d6fe733a6002b3e06eb778161da37d25db`.
- Last recorded production baseline: `33ec6b07a001112593b4f0e6f566cc1975b3e27e`. Recheck before any eventual release; do not assume the remote has stayed unchanged.
- Existing local work already includes an unused content-page CSS/JS foundation and corrected blog return links. Reuse and improve it; do not duplicate it or assume it has been visually approved.
- Vite static multi-page site, generated blog articles, no React/CMS requirement. Keep this architecture and existing dependencies.
- Cloudflare Pages project `yoga-rise-website`, production branch `main`, build `npm run build`, output `dist`.
- `www.yogarise.com.au` and `yoga-rise-website.pages.dev` share the production deployment. Hostname logic makes the custom-domain homepage temporary and the Pages homepage full. **The Pages address is not an isolated staging environment.**

Source register: [Web Pages YOGARISE, Sheet1](https://docs.google.com/spreadsheets/d/1GqUkj16Hfud5Cy-me_ozZd8lz6uPCetbpwePr3sXqeI/edit?gid=0#gid=0), column G “WEB DEV STATUS = To Do”, read 10 September 2026. Each local copy file records the exact Google document URL. Task IDs T01–T09 are retained from the previous plan; Expo is appended, not renumbered.

| Task / row | Route | Exact local copy | Work now | Publication dependency |
| --- | --- | --- | --- | --- |
| T01 About / 3 | `/about/` | [About](copy/T01-about.md) | Full page, founder and four-person team | Partner CTA destination must be released; final visual/copy acceptance |
| T02 Awards / 5 | `/awards/` | [Awards](copy/T02-awards.md) | Full page and nomination-interest form UI | Form provider, routing, privacy and success/error contract |
| T03 Membership / 8 | `/membership/` | [Membership](copy/T03-membership.md) | Full informational page | Working joining URL; confirm advertised membership offer is available |
| T04 Partner / 11 | `/become-a-partner/` | [Partner](copy/T04-partner.md) | Full page and enquiry form UI | Form integration; linked Ambassador destination |
| T05 Ambassador / 12 | `/become-a-brand-ambassador/` | [Ambassador](copy/T05-ambassador.md) | Full page and application UI | Form integration; programme/referral-code fulfilment readiness |
| T06 Volunteer / 13 | `/become-a-volunteer/` | [Volunteer](copy/T06-volunteer.md) | Full page and application UI | Form integration and handling of optional accessibility information |
| T07 Income article / 17 | Existing income article slug | [Article](copy/T07-income-article.md) | Compare existing record, preserve correct content/return link | No new external dependency identified |
| T08 Marketing article / 18 | Existing marketing article slug | [Article](copy/T08-marketing-article.md) | Compare existing record; prepare Health Check cross-link | Do not activate tool CTA until T09 is released and functional |
| T09 Health Check / 20 | `/yogarise-marketing-health-check/` | [Landing-page copy](copy/T09-health-check.md) | Full landing page | Actual tool/embed/link or approved questions and scoring specification |
| T10 Expo / 4 | `/expo/` | [Expo](copy/T10-expo.md) | Full event page, tickets table, FAQ, four speakers | Checkout, venue information, CPD consistency and remaining speaker details |

These are **eight new pages plus two existing articles**, not ten new pages. Do not rebuild articles that already match.

Excluded: Events, Courses, Resources overview, Blog overview redesign, speaker application, unfinished research/speaker articles, career planner, industry report, partner directory and all other non-To-Do rows. The opened calculator document is reference only: calculator row 19 is Done. Do not add a lead gate, restore its removed H1 or “All amounts in AUD”, or alter its desktop floating totals. Do not replace the temporary live homepage with the full site.

## 2. Source hierarchy and copy decisions

1. This handover's scope, interactions and exclusions; then the local client-copy snapshots; then XD composition and existing design 02 styling.
2. Use every public-facing section and paragraph from the corresponding snapshot, not only this document's summaries. Convert source tables, bracketed CTAs and field lists into components. Do not print editorial notes, `[Photo]`, `[add partners as they confirm]`, markdown escapes or “Application form” drafting labels as stray body text.
3. Preserve client wording, prices, dates, qualified statements and benefit footnotes. Normalise escaped punctuation and real bold emphasis. Do not turn provisional statements into confirmed offers.
4. About: omit the shorter duplicate “YogaRise was created to help bridge that gap.” Keep the following longer “YogaRise exists to bridge that gap…” paragraph. Use the current copy's **five** ecosystem items, not the XD's older six. Courses is not a sixth About ecosystem item.
5. About founder: use a typed “Valerie Saindon / Founder, YogaRise” signature treatment. Do not invent a handwritten signature. Use existing approved team names/roles/bios from `index.html`; replace Nic's placeholder on the **new About page** with the supplied portrait, without expanding into an unrelated homepage edit.
6. Awards: the eight categories are explicitly exploratory ahead of 2027. “Put someone forward” is an expression of interest, not a claim that formal judged nominations are open.
7. Articles: only the website article portion belongs on the site. Social/Instagram carousel adaptations are excluded from the saved article snapshots. Preserve existing publication dates and slugs.
8. Volunteer: correct the broken source formatting `R*egistration` to “Registration”; retain the role/shift condition on benefits. Membership/ambassador promises are supplied copy, not authorisation to build accounts, billing, affiliate tracking or fulfilment systems.
9. Expo: keep unresolved business details visible as draft review notes **outside** public-facing markup. Do not silently reconcile the CPD conflict. Build its content components now; keep the page excluded from publication pending the resolutions in section 7.

### Design references

- [About artboard](https://xd.adobe.com/view/49627c3c-40f7-4791-ac6f-68e5ef1a7a20-1c31/screen/c6cb3d0b-708e-4f7e-b034-42ae0be03f93/)
- [Awards artboard](https://xd.adobe.com/view/49627c3c-40f7-4791-ac6f-68e5ef1a7a20-1c31/screen/8797bc79-80c3-4ea9-b187-1ad520283dce/)

The sheet's About/Awards links both led to the Awards screen; use the screen IDs above. About's header/logo sits **over the hero photograph**, not on a separate solid strip. Its H1 is a restrained uppercase label rather than the giant heading in the unused CSS foundation. Use the artboards for hierarchy and the approved 02 site for generous spacing. The other pages, including Expo, have no required bespoke XD design; the layout specifications below are the design direction. Do not wait for another artboard to start them.

## 3. Shared visual and interaction specification

### Foundation

- Scope everything to `.content-page`. Import through `src/content-pages.js`; do not attach the homepage's hostname-specific presentation classes or signup initialisation to these pages.
- Reuse Inter and existing colours: paper `#e7e6e4`, ink `#030303`, brown `#1b0907`, white. No new typeface, rounded SaaS cards, gradients unrelated to photograph readability, icon library or generic stock photography.
- Desktop outer gutter: existing `--page-pad` (`clamp(3.25rem, 7vw, 8.4rem)`). For new pages use 24px minimum mobile gutter; do not change the root token site-wide. Inner width max 1600px, centred. Prose max 65ch; paragraph line-height 1.5–1.6.
- Section vertical padding `clamp(4rem, 7vw, 8rem)`, mobile 48–64px. Split sections 1:1 with `clamp(2rem, 5vw, 6rem)` gap. Cards use 1px borders, square corners and 24–40px internal space. Use whitespace and alternating paper/brown areas, not a divider between every paragraph.
- New generic hero H1 `clamp(2.5rem, 4.5vw, 4.5rem)`, line-height 1.05, no forced desktop line breaks. About H1 is uppercase `clamp(1.2rem, 1.4vw, 1.65rem)` / 1.3 to match its XD hierarchy; its lead/subtitle and supporting text follow the source hierarchy. Section titles `clamp(1.8rem, 3vw, 3rem)` / 1.1. Body 16–20px; no shrinking text to fit a fixed hero.
- Hero logo: existing white YogaRise SVG, `clamp(12rem, 24vw, 28rem)` desktop, max 60vw mobile. Header and intro share one photo/background; logo once, not twice. Overlay strong enough for white text. Desktop text left, generous clear image area right. Mobile background cropping may change; never distort a photograph.
- Hero content remains in normal document flow with auto height and padding. No viewport-height cap, absolute-positioned form/tagline, negative spacing or clipped overflow. Lower-height laptops must scroll normally without overlap. New pages do not inherit “The science of yoga business” as an extra hero tagline.
- Outline CTAs with uppercase label and arrow; 48px minimum target, wrapping label allowed. Use anchors for navigation and buttons for actions. Visible focus outline. No `href="#"`, fake checkout, false submission success or unlabelled icon buttons.

### Components to implement once

1. Photo hero including transparent header, brand, nav and intro/CTAs.
2. Text/image split, plain prose block, bordered benefit/category grid, numbered four-step process.
3. Ecosystem/ripple graphic: semantic HTML text with decorative CSS connectors; no raster text. About: central YogaRise plus five labelled nodes. Partner: linear brand-to-community chain; mobile vertical. Screen-reader order must match meaning.
4. Portrait/team/speaker card: consistent 4:5 image window, face-safe crop, name, role, optional session title. No cropped names or fixed text heights.
5. Large form panel specified in [forms.md](forms.md).
6. Two-column ticket comparison and native `<details>/<summary>` FAQ.
7. Brown photographic footer with logo and available navigation. Do not copy the full homepage's unconnected footer signup/social/contact placeholders. The working homepage opt-in remains untouched.

### Responsive behaviour

At >980px: splits 2 columns, ordinary four-card grids 4 columns, five-card groups 3+2, speaker/team cards 4 columns. At 641–980px: split content stacks, grids 2 columns. At <=640px: all cards/forms/splits one column. Two-ticket comparison becomes two complete cards with repeated feature labels, preserving order and all footnotes; no page-wide sideways scroll.

Header nav can wrap on desktop. At <=980px use an **inline disclosure** below the header row, not an absolute full-window overlay: `aria-expanded`, `aria-controls`, Escape closes and returns focus, no hidden links in tab order. Opening it increases page height. Changing back to desktop restores all links. Use Inter/inherited font rather than the current foundation's Helvetica override. No viewport scroll lock necessary.

No sticky signup/CTA or floating summary is requested for these pages. Keep the existing calculator's desktop-only floating behaviour untouched. Respect reduced motion. Reserve image dimensions and lazy-load below-the-fold images; never lazy-load the primary hero/logo.

### Navigation and links

New page primary navigation: About, Expo, Awards, Membership, Blog, but include a route only when available in the active build's release set. Logo returns to `/`. In local review mode all built draft pages may link to one another. Normal production output must not link to excluded drafts. Footer can additionally include released Partner/Ambassador/Volunteer pages. Do not link navigation to homepage anchors hidden on the custom domain.

“Join the community” and “Keep me updated” on About/Awards go to `https://www.yogarise.com.au/`, the known existing opt-in page. This deliberate absolute URL also works when reviewing the full Pages homepage. Do not duplicate or rewire MailerLite. Other CTA mappings are listed per task below.

## 4. Assets supplied and placement

Use existing approved files under `public/assets/`. Source portraits copied into this handover are unmodified, not AI-generated. Their identity was verified by the Expo DOCX table columns and image relationships, not guessed from appearance.

| Asset | Placement |
| --- | --- |
| Existing white YogaRise SVG and favicon | Reuse actual current paths; no logo recreation or favicon change |
| `hero.webp` | Shared brand hero for About, Membership, applications and Health Check |
| `awards.webp` | Awards hero / recognition imagery, face-safe responsive crop |
| `expo.webp` | Expo hero, with strong readable overlay |
| `why-yogarise.webp` | About “Why” split |
| `membership.webp` | About mission / Membership body image; do not describe as an event photograph |
| `community.webp` | About vision and optional Volunteer body image |
| `footer.webp` | Full-width brand image band and footer |
| Existing `valerie.webp`, `emma.webp`, `derek-abel.webp` | About team; Valerie/Emma also Expo speakers |
| [Tashi source, 447×447](assets/tashi-dawa-source.jpg) | Expo Tashi card; keep display size modest, no aggressive upscaling |
| [Nic source, 1500×1200](assets/nic-dorsch-source.jpg) | Expo Nic card and new About team card |

During implementation produce optimised web copies `public/assets/tashi-dawa-v1.webp` and `nic-dorsch-v1.webp`, preserving originals and using consistent visual crops. Use the supplied partner names as typographic lockups when brand logos are unavailable; do not fabricate logos. No additional asset request blocks page construction.

The original Expo DOCX is retained in ignored `.reference/sol-handover-2026-09-10/expo-source.docx` for provenance. Do not commit that document, private notes, temporary exports or unrelated DNS backups to the public repository. Keep `public/assets/drive-download-20260903T002940Z-1-001/` and the user's untracked files unchanged.

## 5. Page-by-page build contract

### T01 — About

**Superseded layout:** Shaun approved rebuilding About and Awards directly against the Adobe artboards on 11 September. Use [the Adobe rebuild record](../about-awards-adobe-rebuild-2026-09-11.md) and `src/adobe-pages.css` for these two pages. The generic layout table below is historical, not a direction to override the artboards. Existing content publication holds remain in force.

Build `about/index.html`; use [all About copy](copy/T01-about.md), with the editorial decisions above.

| Order / ID | Content and layout |
| --- | --- |
| Hero | Large brand logo, compact ABOUT YOGARISE H1, source subtitle/lead and two introduction paragraphs over `hero.webp` |
| `why-yogarise` | “Why YogaRise Exists”, supporting question list and copy left; `why-yogarise.webp` right |
| `our-mission` | Mission image and intro, then Educate / Connect / Elevate three bordered columns |
| `ecosystem` | Five nodes: Expo, Events, Membership, Awards, Resources. Include supplied descriptive text, not labels alone. Nodes are informational unless their destination is actually released |
| `who-its-for` | Five audience cards: teachers, studio owners/leaders, educators/trainers, industry professionals, brands/organisations; 3+2 desktop |
| Image band | Full-width brand photograph, decorative alt empty |
| `our-vision` | Vision prose paired with `community.webp` |
| `founder` | Valerie portrait and complete first-person story, including industry and business/marketing experience; typed signature |
| `team` | Existing approved Valerie, Nic, Derek and Emma names/roles/bios; four cards; actual supplied Nic photo |
| `get-involved` | Two-column close: yoga professional/community CTA to working live opt-in; brand CTA to `/become-a-partner/` |

Done locally when all sections, full founder copy, five-node diagram and four team cards exist with correct responsive ordering. Public release waits for a working Partner CTA destination, not for a nonexistent new XD or missing Nic photograph.

### T02 — Awards

Build `awards/index.html`; follow Awards XD plus [current copy](copy/T02-awards.md).

Order: hero with “Celebrating the people moving yoga forward” and Put Someone Forward → `#nominate`; Why the Awards split; provisional category grid 4×2; recognition/examples image split; nomination-interest form `#nominate`; Coming in 2027 two-CTA close; footer.

Eight cards: Yoga Teacher of the Year; Emerging Yoga Teacher; Yoga Studio of the Year; Community Impact Award; Yoga Educator of the Year; Industry Partner of the Year; Industry Innovation Award; Lifetime Contribution Award. Use each supplied description and the qualifier above the grid. Do not add entry fees, judging criteria, confirmed nomination deadlines or a winners section.

Nominate Someone goes to `#nominate` and selects “Someone else”; Put Yourself Forward selects “Myself”. Hero/footer generic Put Someone Forward scrolls to the same form without guessing a selection. No automatic name copying into nominee fields. Keep Me Updated uses the existing live homepage. Form schema and blocked delivery are in forms.md.

### T03 — Membership

Build `membership/index.html`; [copy](copy/T03-membership.md).

Order: hero; “More than a membership” text/image split; five benefit sections/cards (Learn, Connect, Access, Have Your Say, Opportunity), including all sub-benefits; four-card Who It's For; “Ready to keep growing?” closing CTA; footer. Use paper benefit sections with a brown closing band; one `membership.webp` body image, not a separate photograph on every card.

Both Become a Member CTAs use one configured joining destination. Build them as disabled review-only controls until provided; no dummy anchor. Do not invent pricing, add a login, build a payment system or repurpose newsletter subscription as membership. The supplied monthly masterclasses, library, networking, perks and opportunities remain in local copy, but confirm availability before publishing them as an active offer.

### T04 — Partner

Build `become-a-partner/index.html`; [copy](copy/T04-partner.md).

Order: hero; Why Partner four columns (Connect, Contribute, Build Trust, Grow Together); multiplier diagram; five ways to partner (Build, Lead, Support, Experience, Amplify) in 3+2 cards; category exclusivity brown band; Beyond the Expo prose; three Current Partners text lockups; enquiry form `#partnership-enquiry`; Ambassador cross-promotion; footer.

Diagram: Your Brand → YogaRise → Yoga Professionals → Studios / Students / Clients / Communities. Represent the last four as separate connected recipients. Preserve all source explanatory copy. Current partner names/roles: Omnitide / Official Marketing Partner; Emmiko / Official Branding Partner; Abel Media / Official Video Partner. Omit the internal “add partners as they confirm” instruction.

All partnership CTAs, including category enquiries, target `#partnership-enquiry`. Ambassador CTA → `/become-a-brand-ambassador/`, subject to release availability. Do not add a partner directory or sponsorship checkout.

### T05 — Ambassador

Build `become-a-brand-ambassador/index.html`; [copy](copy/T05-ambassador.md).

Order: hero; What Is an Ambassador; Who We're Looking For (seven source types as a spacious list); five benefit cards (Have Your Say, Exclusive Perks, Share & Be Rewarded, Be Seen, Grow With Us); numbered Apply / Get Your Kit / Share / Unlock process; Important Bit authenticity statement; community ripple-effect diagram and source copy; application `#ambassador-application`; footer.

All application CTAs target the same form. Programme copy mentions referral codes/rewards; do not build a referral platform or promise fulfilment not set up by the client. The layout and application controls are buildable now; programme operations and integration are release dependencies.

### T06 — Volunteer

Build `become-a-volunteer/index.html`; [copy](copy/T06-volunteer.md).

Order: hero; four experience benefits (Connect, Experience, Contribute, Go Behind the Scenes); four role cards (Welcome & Registration, Sessions & Speakers, Expo & Partners, Event Operations); Who We're Looking For; What You'll Receive with role/shift footnote immediately below; four numbered steps (Apply, Get Matched, Get Briefed, Join Us); form `#volunteer-application`; footer.

All Apply to Volunteer CTAs target that form. Do not turn conditional access, food or pack benefits into guaranteed full-day passes. Accessibility information is optional and must not reach analytics, query strings or general marketing audiences.

### T07 and T08 — Existing articles

Compare `content/articles.js` and generated-article template against the two saved article copies. Existing routes:

- `/blog/what-does-your-yoga-career-actually-earn-you/`
- `/blog/does-your-marketing-support-the-business-youre-building/`

Keep these slugs, existing 9 September 2026 publication dates and the local correction making return links point to `/blog/`. Do not create static duplicate article HTML or a second content record. Correct genuine copy omissions only, not prose already matching the source. T07 calculator CTA stays `/yoga-teacher-income-calculator/`. T08 Health Check link is currently unconnected: activate `/yogarise-marketing-health-check/` only when that page and tool are released. Until then preserve the existing non-clickable treatment rather than inventing a working assessment. No blog overview redesign or unrelated article edits.

### T09 — Marketing Health Check

Build `yogarise-marketing-health-check/index.html`; [copy](copy/T09-health-check.md).

Order: branded hero with supplied H1/subtitle/introduction and Free Health Check CTA; “Marketing is more than social media” five-item section (Who You Are, What You Offer, Who It's For, Why Trust You, What To Do Next); four results/benefits cards (Overall Score, Area Breakdown, Biggest Opportunity, Practical Next Steps); reassurance prose (“This isn't a test”); Who It's For list; final CTA; footer.

**The document is only a landing page.** It contains no seven-area question list, weights, result bands, calculation rules, embed or tool URL. Build all supplied landing-page content now. Both assessment CTAs share one disabled draft control until a tool exists. Do not add a made-up seven-question quiz, generate scores, require email or build scoring files from marketing promises. Once supplied, connect either an external assessment URL or a properly reviewed embed; only build a native tool if its full specification is separately supplied/approved. Keep T09 out of release until the advertised action works.

### T10 — Expo

Build `expo/index.html`; [complete copy and FAQ](copy/T10-expo.md). Expo is now in scope; design N/A does not mean blocked.

Order: hero (Sydney / November 2026 / Full Day Event); What Is YogaRise Expo; Learn/Connect/Grow statement; Why Attend four cards; What You'll Experience four cards; Who It's For; Speakers `#speakers`; Program/Agenda; CPD; Partners/Exhibitors `#partners`; Tickets `#tickets`; Venue; all eleven FAQ entries; Join Us close; footer.

Every Get Tickets CTA scrolls to `#tickets`; the actual purchase controls there require the provider URLs. View All Speakers → `#speakers` (no new speaker directory). Explore Our Partners → `#partners`, which includes the three confirmed text partner lockups supplied in T04, alongside the Expo paragraph. FAQ Partner/Ambassador links point to their new routes only when those destinations are included in release.

Four speaker cards use the source's column mapping:

| Speaker | Role / session |
| --- | --- |
| Valerie Saindon | YogaRise Founder & multiple business owner · Making Yoga Sustainable: Building a Career That Supports You, Too |
| Emma Scott | Brand Strategist · The Business of Being You: Personal Branding for Yoga Teachers |
| Tashi Dawa | International Yoga Teacher and retreat host · The Retreat Blueprint: From Concept to Sold Out |
| Nic Dorsch | Portrait available; role empty and session TBC in source. Do not invent either |

Display “Program announcement coming soon” exactly as approved copy. Do not fill in a timetable. In local review Nic may have a marked pending session in a separate review note; before release the client must provide details or explicitly approve omitting that role/session text.

Ticket comparison must preserve these distinctions and the complete supplied descriptions:

| Feature | Expo Pass | Full Day Pass |
| --- | --- | --- |
| Expo/vendor area | Included | Included |
| Sessions/workshops | 1 session | All |
| Networking Event | Not included | Included |
| Lunch | Not included | Included |
| CPD points* | Not included | Source indicates included; confirmation pending |
| Replays* | Optional | Included |
| Gift bag* | Not included | Included |
| Full-day experience | Not included | Included |
| Price | $49 | $269 |
| Early Bird | $39 | $229 |

Render both price rows in draft; do not assume early bird is active or invent an expiry. Source footnote: “Subject to session capacity/availability”. Obtain clarification for CPD/replay/gift-bag asterisks rather than applying the session-capacity footnote as a substitute for all terms. FAQ distinguishes a **networking area** from the paid **Networking Event**; do not merge them. Use words/accessible labels rather than unexplained ticks/crosses alone.

Venue source gives Sydney, NSW and Sunday 29 November 2026, but no venue name/address, transport, parking, accessibility or accommodation information. Build a location/info component with review placeholders outside public copy, no fake map/address. Publication needs actual information or client-approved public “venue to be announced” wording.

The CPD hero section says “Earn CPD points” and eligible members may receive points; the FAQ says recognition is still being sought, while ticket rows imply inclusion. This is an unresolved source conflict, not an engineering error. Keep the page draft and request a single approved CPD statement for the section, tickets and FAQ before release. Do not imply confirmed recognition.

## 6. Implementation sequence and file boundaries

1. Inspect current git diff, source files and this package. Preserve existing changes. Continue the scoped branch unless Shaun requests another; use the `codex/` prefix for any new branch. GitHub operations use `C:\Users\USER\bin\gh-for-repo.cmd`, never `gh auth switch`. No account or global credential changes.
2. Establish draft/release isolation **before adding page entry points** as described below. This is ordinary implementation, not a new deployment platform.
3. Refine `src/content-pages.css` and `src/content-pages.js` to the shared contract: transparent integrated hero header, corrected type sizes, inline responsive menu, grids, image sizing, flow-based height and accessible controls. Keep global/homepage selectors unchanged.
4. Add the eight route `index.html` files and their local copy. Start About/Awards as visual references, then reuse components for the remaining pages. Add only a small `src/content-page-forms.js` if needed for UI behaviour, importing it on pages that use forms. No new API/backend files until actual provider contracts exist.
5. Optimise/copy the two supplied portraits. Reuse existing approved assets; preserve all source originals.
6. Complete four form UIs per forms.md. Wire no production receiver without its supplied contract. Membership and Health Check actions remain inactive in draft. Implement Expo table/FAQ but no invented checkout.
7. Reconcile the two existing article tasks; make only necessary changes to `content/articles.js` / existing article template. Activate cross-links only through release logic.
8. Finish read-only code/copy/link review. Carry out compilation, visual verification and any tests only within the permission actually granted by Shaun. If tests remain unapproved, explicitly report them not run; never describe a page as verified solely because its files exist.
9. Deliver a task-by-task completion report listing locally built, reviewed, integrated, release-held and actually deployed separately. Do not mark the spreadsheet Done or deploy just because buildable UI work has finished.

### Required draft/release isolation

Add `content/page-release.js` with one explicit record per new route: key, path, source HTML path, navigation label, initial status `draft`, and required dependency route keys. Use keys `about`, `awards`, `membership`, `partner`, `ambassador`, `volunteer`, `healthCheck`, `expo`. It is the single source for entry inclusion and eligible cross-links. Required route dependencies are About → Partner; Partner → Ambassador; Expo → Partner and Ambassador. Other business/integration holds remain explicit release requirements in section 7, not invented URLs. Existing routes remain outside this new-draft gate and retain their current build behaviour.

Update `vite.config.js` narrowly:

- Normal `npm run build`: original entries plus only explicitly released new entries, output `dist`.
- Local review build using Vite `--mode review`: include all eight new pages, output `dist-review`. Add that output folder to `.gitignore`. This is for local inspection, not automatic Pages deployment.
- Keep new draft HTML outside `public/`; assets may be public but must not contain private copy/documents. Avoid direct imports of draft HTML from released pages, which could cause Vite to emit it despite entry filtering.
- Add `build/content-pages-plugin.js` for this site's narrow HTML transformation. New HTML uses `<!-- content:primary-nav -->` and `<!-- content:footer-nav -->` markers; render them from the active release set before Vite processes links. Mark required inter-page CTAs with `data-page-link` containing the target manifest key. In normal mode fail the build if an included page's required destination is excluded; in review mode resolve to the local draft route. Production may contain no href to a draft route. Optional navigation items are omitted, never disabled dummy links. Do not silently remove required content CTAs just to pass release. Apply this plugin only to the eight new content pages; leave existing page templates unchanged except for the separately specified, release-ready link updates.
- Do not switch a record to released automatically when a file exists. Only after dependency completion and publication approval. Existing full-homepage anchor links stay unchanged until their matching new destination is released; then update only those corresponding anchors/links.
- Missing draft routes must not be exposed via fallback homepage masquerading as the intended content. Inspect the existing fallback/404 behaviour and ensure excluded routes do not return unfinished page content. Do not change unrelated live routing rules to solve this.

Unlinked or `noindex` pages are still publicly reachable. Keeping them out of production output is required. A public branch preview or pushing private client material to this public GitHub repo also counts as publication; keep unfinished/private review work local unless Shaun separately approves its exposure. Do not run a Cloudflare deployment command in this task by inference.

### Protected surfaces

Preserve live temporary hero, working MailerLite embeds and their validation/error handling, survey Jotform page, survey thank-you opt-in, calculator, favicon/title decisions, analytics/Search Console, DNS/nameservers/MX/SPF/DKIM/DMARC, secrets and redirects. Do not rewrite `src/main.js`, global signup logic or global styles for the new pages. Only scoped/shared changes demonstrably necessary for this plan belong in the diff. Never expose API keys in client code, documentation or logs.

## 7. Batch of genuine missing inputs — not reasons to stop layout work

| Owner | Needed input | What it blocks |
| --- | --- | --- |
| Client/Shaun | Provider/form ID or endpoint, field mapping, submission recipients/destination, privacy notice and success/error behaviour for Awards, Partner, Ambassador, Volunteer | Live form integration/publication, not controls or page construction |
| Client/Shaun | Membership joining URL and confirmation the advertised benefits are available | Membership activation/publication |
| Client/Shaun | Ambassador programme operational readiness, including mentioned referral codes/rewards | Publishing those programme promises |
| Client/Shaun | Health Check tool URL/embed, or complete approved native-tool specification | Real assessment and T09/T08 tool CTA activation |
| Client/Shaun | Expo purchase URLs, active price/early-bird rules, venue details or approved TBA language, unified CPD wording, Nic's remaining details or approved omission, benefit footnote clarification | Expo publication and checkout |
| Shaun | Publication selection and any outstanding verification permission | Releasing an otherwise completed subset |

Ask for these as one concise batch after or alongside implementation; do not halt every unrelated page to repeat the same question. If all inputs remain missing, finish every buildable page and hand over a local review with these specific integration gaps. Do not mark an entire page “impossible to build”.

## 8. Acceptance and final handoff

Use [release-checklist.md](release-checklist.md) to report evidence and holdbacks. Required outcome: all eight layouts contain the supplied public copy and specified components; the two article tasks are accounted for without duplication; responsive behaviour is not tied to screen height; production output excludes unfinished pages; no regressions are introduced into protected routes. Form layouts alone are not a working integration, and a Health Check landing page alone is not an assessment.

### Ready-to-paste assignment to Sol

> Implement `docs/sol-handover/README.md` in the Yoga Rise - Website workspace, using its linked copy, assets, forms specification and release checklist as the execution contract. It supersedes the earlier inaccessible-documents plan. Build all eight new page layouts and complete the two existing article tasks locally in design 02, without inventing missing integrations, Health Check scoring or Expo facts. Do not publish unfinished pages, push, deploy, submit forms or run/add tests without my explicit approval for that activity. Complete all work that is buildable and report each remaining external dependency precisely. Preserve the existing live homepage, forms, survey, calculator, DNS and analytics. Use Edge extension control only if browser work is needed.
