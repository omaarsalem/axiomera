## Goal

Slim the homepage to a focused, premium landing experience and move the heavier content into dedicated pages. Add a new Testimonials page (none currently exists).

## Current homepage sections

1. Hero
2. Gold ticker
3. Who We Are (with stats + locations)
4. What We Do (three pillars + full service lists)
5. Philosophy break
6. Why AXT (4 cards)
7. Community Impact (UK SME programme + founder quote)
8. Trust signals (compliance marks)
9. Testimonials (3 quotes)
10. Fellowship teaser
11. Contact CTA

This is too long and too dense for a landing page.

## New homepage (lean, ~5 sections)

1. **Hero** — keep as-is
2. **Ticker** — keep
3. **What We Do** — keep heading + three pillar cards but **remove the per-pillar service bullet lists** (those belong on /services). Each card shows: number, name, tagline, one-line quote, and a "Learn more →" link to /services.
4. **Philosophy break** — keep (short, high impact)
5. **Fellowship teaser** — keep (drives second CTA)
6. **Contact CTA** — keep

Renumber section labels: 01 What We Do, 02 Fellowship, 03 Work With Us.

## Content moved off the homepage


| Section                                          | New home                                      |
| ------------------------------------------------ | --------------------------------------------- |
| Who We Are (stats, locations, founder narrative) | `/about` (already exists — append/merge)      |
| Community Impact (SME programme + founder quote) | `/about` (new section)                        |
| Why AXT (4 differentiator cards)                 | `/about` (new section)                        |
| Trust signals (GDPR, ISO 27001, etc.)            | `/about` footer strip + `/services` top strip |
| Testimonials (3 quotes)                          | new `/testimonials` page                      |
| Pillar service bullet lists                      | already on `/services` — verify               |


## New page: `/testimonials`

- Route added in `src/App.tsx`
- New file `src/pages/Testimonials.tsx`
- Hero: section label "Client Voices", headline "What Clients / Tell Us."
- Grid of testimonial cards (start with the existing 3, leave the data array easy to extend)
- Add a few more placeholder quotes for credibility (clearly attributed by role + sector, no fake company names — keeps with positioning rules)
- Closing CTA strip linking to /contact
- Add nav entry "Testimonials" to `Navbar.tsx` (and i18n `en.json` / `ar.json` under `nav.testimonials`)
- Add link from homepage philosophy break or contact section: small "Read client voices →" link

## About page additions

Append three sections to `src/pages/About.tsx`:

- **Why AXT** — the 4 differentiator cards
- **Community Impact** — UK SME programme block + founder quote
- **Trust / Aligned With** — compliance marks strip

(Will read About.tsx first to integrate cleanly with existing structure and section numbering.)

## Files to change

- `src/pages/Index.tsx` — remove sections 01 Who We Are, 03 Why AXT, 04 Community Impact, Trust strip, Testimonials; trim pillars cards; renumber labels
- `src/pages/About.tsx` — append Why AXT, Community Impact, Trust strip
- `src/pages/Testimonials.tsx` — new
- `src/App.tsx` — add `/testimonials` route
- `src/components/Navbar.tsx` — add nav item
- `src/i18n/locales/en.json` + `ar.json` — add `nav.testimonials`
- `public/sitemap.xml` — add /testimonials

## Out of scope

- No design-system changes (fonts, colors, spacing all preserved)
- No backend/database changes
- Translations beyond the new nav label stay English-only for now (matches current homepage copy pattern)

## Open question

Want me to also add a small "Read client voices →" link inside the homepage Contact CTA block, or keep the homepage completely free of testimonial references and rely only on the navbar entry? home page completely free of testimonial references and rely only on the navbar entry