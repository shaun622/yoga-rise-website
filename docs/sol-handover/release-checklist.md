# YogaRise — completion and release checklist

Use with [README.md](README.md). This is an acceptance specification, **not permission to run tests, submit forms or deploy**. Record the method actually used; distinguish code inspection from rendered verification and live delivery.

## Per-task report

| Task | Copy/layout built | Local visual review | Real integration | Release status / outstanding input |
| --- | --- | --- | --- | --- |
| T01 About | Built locally | Not run | Community link known; Partner dependency | Draft / hold |
| T02 Awards | Built locally, form UI disabled | Not run | Provider missing | Draft / hold |
| T03 Membership | Built locally, joining CTA disabled | Not run | Joining destination missing | Draft / hold |
| T04 Partner | Built locally, form UI disabled | Not run | Provider missing | Draft / hold |
| T05 Ambassador | Built locally, form UI disabled | Not run | Provider/programme fulfilment missing | Draft / hold |
| T06 Volunteer | Built locally, form UI disabled | Not run | Provider/privacy handling missing | Draft / hold |
| T07 Income article | Existing record compared; no duplicate created | Not run | Existing calculator link retained | Existing published article unchanged |
| T08 Marketing article | Existing record compared; pending CTA retained | Not run | Health Check tool missing | Existing article; tool link held |
| T09 Health Check LP | Built locally, assessment CTA disabled | Not run | Assessment not supplied | Draft / hold |
| T10 Expo | Built locally, checkout disabled and review notes isolated | Not run | Checkout/facts incomplete | Draft / hold |

Update this table in Sol's completion report, not the client's spreadsheet unless asked. “Built locally”, “ready to publish” and “deployed” are separate states.

## Content and interactions

- All public paragraphs from each copy file are accounted for in rendered content; section summaries in README are not substitutes for full copy.
- No internal collaborator instructions, placeholders, social-media adaptations, markdown escape characters or unused `[image1]`/`[image2]` references appear to visitors.
- One H1 per page; logical heading hierarchy; functional skip link; image alt appropriate to content (decorative photos empty, portraits named).
- About has five ecosystem nodes, correct founder/team content and real Nic portrait. Awards has eight provisional category cards with qualifiers. Expo has four correctly matched portraits, complete table and all eleven FAQs.
- All repeated CTAs use their specified destination. No dead `#` links, nonexistent pages, links into hidden homepage sections, unconnected newsletter copies or invented checkout endpoints.
- T08 must not advertise a clickable working assessment until it exists. Existing calculator/article/survey slugs stay unchanged.
- All form labels persist after typing. Names with accents, long text and full email input are not shortened or subjected to invented minimum-name rules. Checkbox arrays preserve multiple selections.
- Disconnected forms cannot send/reload/pretend success. Live provider validation, success/error and privacy behaviour remain explicitly unverified until an authorised integration check occurs.

## Responsive/accessible review targets, when authorised

Inspect all eight pages, not just one hero. Suggested viewports: 320×568, 375×667, 390×844, 768×1024, 980×720, 1024×600, 1366×650, 1440×900 and 1920×1080. Also inspect immediately around the 640px and 980px layout transitions and desktop 200% zoom. Use browser extension-controlled tabs/available emulation, not OS window resizing that interrupts Shaun.

- No horizontal page scroll, hero clipping, overlapping copy/forms or fixed-height traps on short screens.
- Mobile navigation opens in document flow, is keyboard accessible and does not trap focus or leave hidden links tabbable; desktop resize restores it correctly.
- All form columns and choice labels stack cleanly. Submit labels wrap without covering other fields. Long text does not overflow cards.
- Ticket cards retain every feature and price label when stacked. Speaker photos preserve faces; no text-height clipping. FAQ works with keyboard and native disclosure state.
- Focus visibility, sensible reading order, readable photograph contrast, reduced-motion behaviour and touch target sizes are checked.

Do not execute this matrix or add test automation without the required permission. If only static inspection is completed, say so clearly.

## Release isolation acceptance

- Normal Vite build's entry set includes the original routes and only explicitly released new routes. All eight start draft; no automatic promotion because a page was built.
- Review mode includes drafts only in `dist-review`, ignored by git and not configured as Cloudflare production output.
- No draft HTML under `public/`, no import or link-induced output that bypasses entry filtering, no private source documents copied into deployable assets.
- Production HTML contains no href to an excluded draft. Required CTA dependencies are satisfied before releasing a page. Existing article Health Check CTA remains inactive until its destination/tool is ready.
- If compilation/output inspection is authorised, inspect actual output contents, not only the config source, before claiming isolation works. A route loading the old homepage through fallback is not a successful new-page check.
- No global live-homepage CSS or MailerLite/Jotform/calculator/analytics/DNS/secret changes outside the authorised scope.

## Eventual production procedure — only after publication approval

1. Recheck branch, diff and actual production baseline. Record released task IDs and held task IDs explicitly.
2. Resolve required destinations, page facts and any approved integration verification. Do not claim all spreadsheet work is finished if an assessment or receiver is still missing.
3. Select only approved routes in the release manifest. Apply matching narrow navigation/article CTA updates. Keep unreleased routes excluded and review notices out of emitted public HTML.
4. With relevant permission, compile and inspect the exact output and existing protected routes. Confirm Cloudflare will build the normal production mode, not review mode.
5. Stage only intentional, approved files. Never include original private client exports, ignored source DOCX, DNS backup, secrets or unrelated asset directory. Public GitHub visibility is separate from website visibility.
6. Push/deploy only the approved selection through the established Git/Pages workflow. Record commit and deployment URL; do not assume a successful push equals a completed deployment.
7. Read-only verify actual released custom-domain URLs, HTTPS/canonical routing and protected pages after deployment. Do not submit live forms without separate explicit permission.
8. Report exactly what is live and what is still local/held. Do not change DNS, nameservers, mail or the temporary/full homepage hostname switch.

## State at handover preparation

Client documents were read through the user-opened Edge tabs and copied locally; two Expo speaker portraits were extracted and mapped from the source DOCX. No new website pages were implemented, app tests/builds run, forms submitted, git commits/pushes performed or deployments made while preparing this revised package.
