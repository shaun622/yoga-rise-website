# YogaRise — form UI and integration contract

Part of [the Sol handover](README.md). Four separate forms, not one newsletter form reused four times. All controls can be built locally now. No provider or receiver was supplied in these source documents.

## Shared design

Use a paper form panel with ink text, square 1px borders and generous spacing. Title/intro above it; max width 960px. Desktop: two equal columns for short fields; textareas, choice groups, consent and submit span the full width. <=640px: one column. Textareas at least 140px high and vertically resizable. Inputs at least 56px high, font at least 16px, visible labels above every control. Do not rely on clipped placeholder text as the label. Long names, accents and complete email addresses must fit by normal input scrolling, not truncated stored values.

Group radios/checkboxes in `fieldset`/`legend`. Labels must be clickable and comfortably spaced. Use the site's outlined CTA style for submit, but a genuine disabled state for unconnected draft forms. Place field errors adjacent to fields and an accessible status region after the submit area. Repeated errors should be announced; move focus to an error summary only after a real failed submit. Do not show internal reference/debug messages unless returned as a safe user-facing provider contract.

The requirements below are **planned UI defaults**, not a claim that the source documents supplied validation rules. Name/email required; meaningful application text required as specified; contact extras optional unless explicitly marked required below. Retain any explicitly optional source field as optional. Reconcile with the eventual provider's requirements before activation and record differences, without silently dropping submitted fields.

Do not impose a minimum five-character name, reject “test” by name, strip diacritics, split a person's name, or apply a home-made email-domain blacklist. Use native `type=email` plus the provider's documented validation. Website/social fields accept a handle or URL where the label permits either; do not reject a handle for lacking `https://`. Phone fields use `type=tel`, not numeric conversion.

## A. Awards — `#nominate`

| HTML field name | Label / type | Required |
| --- | --- | --- |
| `nomination_type` | Who would you like to put forward? Radio: Myself; Someone else; A studio / organisation | Yes |
| `contact_name` | Your name; text, autocomplete=name | Yes |
| `contact_email` | Your email; email, autocomplete=email | Yes |
| `nominee_name` | Nominee's name; text | Yes |
| `nominee_organisation` | Nominee's business / studio / organisation; text | No |
| `nominee_profile` | Nominee's website or social profile; text | No |
| `categories[]` | Which category might they be suited to? Eight checkboxes, exact provisional category labels from Awards copy | No; do not force a guess |
| `recognition_reason` | Why do you believe they deserve to be recognised? Textarea | Yes |
| `observed_impact` | What impact have you seen them make? Textarea | Yes |
| `contact_consent` | Checkbox: I consent to be contacted when formal nominations open. | Yes for this interest form |

Submit label: **Put someone forward**. Source does not supply a separate final submit label; this reuses its existing action wording. Button aliases select Myself/Someone else only when the user chooses the corresponding explicit CTA. Do not copy the contact name into nominee fields automatically. Do not collect the nominee's email or add them to marketing lists. Contact consent applies to the submitter and the stated follow-up, not general newsletter consent or consent on behalf of the nominee.

## B. Partner — `#partnership-enquiry`

| HTML field name | Label / type | Required |
| --- | --- | --- |
| `name` | Name; text, autocomplete=name | Yes |
| `organisation` | Organisation; text, autocomplete=organization | Yes |
| `role` | Role; text, autocomplete=organization-title | No |
| `email` | Email; email, autocomplete=email | Yes |
| `phone` | Phone; tel, autocomplete=tel | No |
| `website` | Website; text | No |
| `interests[]` | How are you interested in partnering? Checkboxes | No, source explicitly optional |
| `objectives[]` | What would you most like to achieve through a YogaRise partnership? Checkboxes | No, source explicitly optional |
| `message` | Tell us a little about your brand and what you'd like to explore. Textarea | Yes |

Interest options: Build / Lead / Support / Experience / Amplify / Exhibitor / Not sure yet. Objective options: Brand awareness / Thought leadership / Lead generation / Product experience / Community engagement / Industry alignment / Other. Preserve selected combinations; do not collapse to one scalar. “Other” is a selectable option; the existing message field provides explanation, so no invented extra required field is necessary.

Submit: **Start the conversation**. The category-partnership CTA scrolls to this same form; no fake preselected “category” option not present in the client's list.

## C. Ambassador — `#ambassador-application`

| HTML field name | Label / type | Required |
| --- | --- | --- |
| `name` | Name; text, autocomplete=name | Yes |
| `email` | Email; email, autocomplete=email | Yes |
| `phone` | Phone; tel | No |
| `location` | Location; text | Yes |
| `instagram` | Instagram; text accepting handle or URL | No; no assumption that every community voice uses Instagram |
| `linkedin` | LinkedIn (optional); text | No |
| `website` | Website (optional); text | No |
| `applicant_type` | Which best describes you? Select with empty initial option | Yes |
| `about_work` | Tell us a little about you and your work. Textarea | Yes |
| `motivation` | Why would you like to become a YogaRise Ambassador? Textarea | Yes |
| `community` | Tell us about your community. Textarea; helper: Where do you connect with them and approximately how large is your audience? | Yes |
| `support_methods[]` | How would you like to support YogaRise? Checkboxes | No |

Applicant types: Yoga Teacher / Studio Owner / Teacher Trainer / Creator / Wellness Professional / Community Leader / Other. Support methods: Social content / Email or newsletter / Studio or community / Word of mouth / Content collaboration / Other.

Submit: **Apply to become an ambassador**. Audience size is narrative, not a minimum-follower gate. Do not add file upload, referral-code generation or an application fee.

## D. Volunteer — `#volunteer-application`

| HTML field name | Label / type | Required |
| --- | --- | --- |
| `name` | Name; text, autocomplete=name | Yes |
| `email` | Email; email, autocomplete=email | Yes |
| `phone` | Phone; tel | No |
| `location` | Location; text | Yes |
| `motivation` | Why would you like to volunteer with YogaRise? Textarea | Yes |
| `preferred_roles[]` | Where would you most like to help? Checkboxes | No |
| `experience` | Do you have any relevant skills or experience you'd like us to know about? Textarea; helper: No previous event experience required. | No |
| `availability[]` | When are you available? Checkboxes | Yes, at least one |
| `accessibility_requirements` | Do you have any accessibility requirements you'd like us to know about? Textarea | No |

Role options: Registration / Sessions / Expo / Speakers / Networking / Operations / Wherever needed. Availability: Before the event / Event day / After the event. Submit: **Submit application**.

Never make accessibility disclosure a condition of applying. Do not send this text to Google Analytics, log it in the browser, store it in localStorage or use it for marketing segmentation. Before enabling the field's transmission, the client must confirm the recipient/storage access and privacy notice. Do not improvise legal consent wording; render the approved notice when supplied.

## Draft state and eventual activation

### Build now

- Render all controls, labels, source helper copy and accessible grouping.
- Set submit disabled while the provider is missing. Add a submit-event guard that prevents submission through Enter or script-triggered native submission paths used by the page. Never set an empty action that reloads the current page and implies delivery.
- Keep a local review-only notice outside the visitor-facing content: “Form connection pending — this draft does not send applications.” Strip review notices from any eventual release. Do not publish the disconnected form page.
- Do not create fake success states or save personal form data to local storage to simulate a backend. Native controls can still be edited during local design review.

### Supply before connecting each form

Provider/embed or endpoint; form ID; exact field mapping including checkbox arrays; required-field rules; destination/recipient and access owner; provider spam protection; privacy notice; confirmation/double-opt-in behaviour if applicable; exact success and error response semantics. Do not send applications to either of the existing MailerLite newsletter/survey groups merely because those IDs are known.

Prefer the client's supplied hosted form integration when available. If it requires secrets/server-side processing not already present, specify that integration separately rather than adding a new backend by guesswork. Preserve native provider validation/challenge handling and confirmed delivery messages while styling around it. A successful HTTP response alone is not proof of a accepted application; follow the provider's actual response contract.

On activation: pending state prevents duplicate clicks; success is shown only after confirmed acceptance; server field errors map to fields; network/unknown errors preserve entered values and honestly say delivery was not confirmed. No arbitrary subscriber-status messages. Never claim an email was sent unless that is an established provider action. The final end-to-end submission must use an address and scenario Shaun explicitly authorises.
