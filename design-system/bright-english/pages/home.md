# Home Page Overrides

> **PROJECT:** Bright English
> **Generated:** 2026-11-18 03:37:41
> **Page Type:** Landing / Marketing

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/bright-english/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 80rem (`max-w-7xl`), matching the existing page shell
- **Layout:** Hero, then offer spotlight, audience chooser, course grid, proof, enrollment steps, campus, footer

### Spacing Overrides

- No overrides — use Master spacing

### Typography Overrides

- Outfit has no Vietnamese subset. This page is `lang="vi"`, so headings use Plus Jakarta Sans, which includes Vietnamese and matches the friendly professional typography result.
- Body stays Work Sans from the Master. Work Sans includes Vietnamese.

### Color Overrides

- Keep the existing Bright English indigo `#4F46E5` and navy `#111B3C` on brand surfaces. Repainting the page to the Master blue/green pair would drop the identity already used in the header, hero, and course cards.
- Offer and enrollment buttons use accent `#D97706` with near-black label text `#0F172A`. The Master button snippet sets white on `#D97706`, which misses the 4.5:1 text contrast the same file requires for CTA labels.

### Motion Overrides

- Do not add GSAP. Use a CSS stagger of 400ms with a 60ms delay, once, on the offer cards and on the course grid after a filter change.
- No looping motion. Counters run once when they enter view.
- `prefers-reduced-motion` short-circuits animation in `app/globals.css`.

### Component Overrides

- Offer spotlight, audience cards, and the three-step start section reuse only programs, prices, badges, addresses, phone, and email already published on the page.
- Icons stay in the existing Lucide set so the page does not mix icon families.

---

## Page-Specific Components

- Offer spotlight for the published monthly tuition offer and the two courses that already carry an offer badge
- Audience chooser for the five published age groups
- Start section with the free 3-minute test, consultation form, hotline, email, and both campuses

---

## Recommendations

- Refer to MASTER.md for spacing, focus, and reduced-motion rules
- Keep amber for enrollment actions and indigo for brand chrome
