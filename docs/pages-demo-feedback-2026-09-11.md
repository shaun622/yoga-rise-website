# Pages demo: approved Valerie feedback

## Scope and isolation

Shaun approved the WhatsApp feedback plan for **https://yoga-rise-website.pages.dev/** only. The main domains must not change appearance, content or links.

The base Pages URL and both main domains share a Cloudflare production deployment. This is a hostname-selected demo, not an independent staging project. Deploy through the existing tracked Git build so the requested base Pages address receives the update; do not change DNS, custom domains or redirects, and do not substitute a branch-preview URL.

- Original HTML, page content, shared partials, styles, image files and application integrations are preserved as the default.
- `build/demo-site-plugin.js` adds an early marker only when the hostname is exactly `yoga-rise-website.pages.dev`. `src/demo-site.css` scopes every style to that marker.
- `src/demo-site.js` independently checks that exact hostname before changing the DOM. Production builds have no query-string, cookie, local-storage, `.com.au` or wildcard preview override.
- Local Vite development enables the demo on localhost/127.0.0.1; `?original` shows the unchanged original view there. This exception is not present in production output.
- All new assets are versioned under `public/assets/demo-20260911/`. No original image is overwritten.
- The two generated articles inherit the same bootstrap from the blog template. Survey and thank-you retain their existing header-free structure.

## Implemented checklist

| Approved item | Implementation |
| --- | --- |
| Homepage hero | New supplied warm-toned side-angle banner. Existing copy, header, logo, actions and layout retained. |
| Valerie portrait | Slight 1.16× CSS crop in the shared Home/About team carousel only. Emma, Peter, Nic, Derek, founder portrait and speaker photographs remain unchanged. |
| Footer order | Two real vertical groups: About, Expo, Membership, Blog; then “Become a:” with Partner, Ambassador, Volunteer. Existing released anchors are reused. |
| Contact / Presenter | Both remain on hold and are omitted, with no invented route, placeholder or dead link. |
| Footer background | New supplied banner on every standard page with the shared footer. Existing signup destination, logo, tagline and acknowledgement retained. |
| About audience cards | Five supplied softened images, preserving teachers / studio owners / educators / industry professionals / brands order and all approved copy. |
| About banners and Vision | New hero, Mission, full-width banner above Vision, and Vision conversation image. |
| Site-wide banner pass | New supplied images mapped to Home, About, Awards, Expo, Membership, Partner, Ambassador, Volunteer, Health Check, blog index/articles, calculator, survey and thank-you. The already-correct professional community collage crop is preserved. |
| Expo date | Demo displays **Sydney / December 2026 / Full Day Event**, preserving the existing visual separators. No specific day or venue is invented. Original main-domain date is untouched. |
| Expo audience section | Homepage Expo split layout: paper background, inset rule, text left and existing presenter scene right; stacks on tablet/mobile. All five existing statements retained. No new CTA. |
| Expo speakers | Team-style name/rule/portrait/role/session rhythm with consistent 3:4 portraits. Three complete profiles retained: Valerie, Emma, Tashi. Three desktop columns, two tablet columns, one mobile column. Nic's incomplete speaker card remains excluded. |
| Homepage four cards | New Courses, Events and Awards images. The previous Events photograph moves into Membership as requested. |
| Responsive implementation | Fluid gutters/type, image cover positions and gradients, automatic image height with intrinsic dimensions, responsive Expo grids, existing touch-scroll team carousel, and grouped two-column footer at all widths. Existing laptop header and desktop-only calculator summary behaviour retained. |

## Supplied image provenance

Source: Valerie's [YR - Photos for website folder](https://drive.google.com/drive/folders/1LVSvwyId2E0Fh9kQxZP1UiqDZBUQXRZA). Originals were retrieved from the Drive image viewer through the Edge extension. No new AI images were generated. WebP conversion changes file format/size only; layout crops are CSS. Nineteen new files total approximately 950 KiB.

Banner filenames below are `ChatGPT Image Sep 11, 2026, [time] PM.png` in **Banner images**.

| New asset | Supplied original | Demo use |
| --- | --- | --- |
| `home-hero.webp` | 06_49_30 | Home hero; Ambassador hero |
| `about-hero.webp` | 06_50_00 | About hero; Volunteer hero; blog mastheads |
| `why.webp` | 06_37_12 | Home Why; Health Check and calculator heroes |
| `footer.webp` | 06_36_14 | Shared footer |
| `vision-banner.webp` | 06_42_35 | About full-width banner above Vision |
| `mission.webp` | 07_04_03 | About Mission |
| `seated.webp` | 06_53_17 | Membership hero; survey and thank-you backgrounds |
| `partner-hero.webp` | 07_05_49 | Partner hero |
| `teachers.webp` | About / faded / 2.png | About teachers card |
| `studio-owners.webp` | About / faded / 5.png | About studio owners card |
| `educators.webp` | About / faded / 4.png | About educators card |
| `industry.webp` | About / faded / 1.png | About industry professionals card |
| `brands.webp` | About / faded / 3.png | About brands card |
| `courses.webp` | Courses / 10.png | Home Courses |
| `events.webp` | Events / 14.png | Home Events |
| `expo-hero.webp` | Events / ChatGPT Image Sep 11, 2026, 07_59_04 PM.png | Expo hero |
| `awards.webp` | Awards / 6.png | Home Awards |
| `awards-hero.webp` | Awards / ChatGPT Image Sep 11, 2026, 07_34_01 PM.png | Awards hero |
| `vision.webp` | YogaRise Expo.png, root folder | About Vision |

## Preserved and still outstanding

- No MailerLite, Jotform, calculator calculation, analytics, email, DNS, redirect, release-status or indexing changes.
- Existing main-domain links remain verbatim, including footer signup. Header navigation and the income-calculator blog CTA are unchanged.
- Awards/Health Check/Calculator are removed from the **demo footer only**, not unpublished.
- Ticketing, incomplete venue/programme/CPD details, unfinished forms and previously withheld content stay excluded by the normal production build. Do not deploy review mode.
- Contact and Presenter require approved content/destinations before adding them.
- The broader unfinished-work list remains in `published-pages-and-outstanding-items-2026-09-11.md`; this note supersedes only its demo footer order and demo Expo date.

## Validation and release

Production compilation completed successfully with all 15 existing HTML documents. Source/output inspection confirmed the exact-host guard, inactive `.com.au` path, preserved original files and links, retained release exclusions and the new asset paths. All nineteen supplied files were converted successfully; updated inline images include correct intrinsic dimensions.

No automated test suite, form submission, signup email or new test script was run. Read-only mobile/laptop visual and link review was offered separately and remains subject to Shaun's confirmation; responsive behaviour is implemented but must not be described as browser-verified until that review occurs.

Publish only the deliberate tracked source/assets through Git-to-Cloudflare. Do not upload local `dist`, since the working copy also contains the user's untracked asset-drop folder. The private `.reference` folder, DNS backup, originals and credentials must not be published.
