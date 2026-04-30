# AXT Site — Credibility, Conversion & SME Layer

The current site already covers Hero, Services, Fellowship, and Contact strongly. This plan fills the gaps from your brief: **dual‑tier pricing, community impact, founder credibility (you, Omar), trust signals, and a unified primary CTA** — without touching the brand system (Bebas / Cormorant / DM Mono, gold on void, sharp corners, grain overlay).

---

## 1. Unify contact identity (site‑wide)

- Replace `hello@axt.tech` and the per‑city emails (`cairo@axiomera.tech`, `leeds@…`, `london@…`) with a single primary: `**hello@axiomera.technology**`.
- Add a secondary CTA used on Hero, Services, Contact, and Footer:
**"Book Your Free 15‑Minute Security Check"** → opens contact form pre‑tagged `service_interest = "Free Security Check"`.
- Files touched: `Footer.tsx`, `Contact.tsx`, `Index.tsx`, `Services.tsx`, `i18n/locales/en.json` + `ar.json`.

---

## 2. Services page — add **Dual‑Tier Pricing**

New section on `/services` (after Engagement Models), styled as a 2‑column grid (2px gap, void/obsidian backgrounds, gold accents):

```text
┌──────────────────────────┬──────────────────────────┐
│  COMMUNITY ESSENTIALS    │  ENTERPRISE PREMIUM      │
│  For UK SMEs             │  For Institutions        │
│  ────────────────────    │  ────────────────────    │
│  · Essentials Cyber Pack │  · Full SOC + IR         │
│  · Baseline Hardening    │  · ISO 27001 / SOC 2     │
│  · Quarterly Review      │  · Fractional CISO       │
│  From £/month            │  Bespoke                 │
│  [Book Security Check]   │  [Brief Us]              │
└──────────────────────────┴──────────────────────────┘
```

Final wording for bullets and price floor will be confirmed with you before publishing (see Q below).

---

## 3. Home page — add **Community Impact** section

New section between *Why AXT* and *Testimonials*:

- Section label: `04 — Community Impact`
- Headline: **"Giving Back to UK Society."**
- Body: short paragraph on Essentials packages for SMEs at reduced cost, and how protecting small businesses strengthens UK digital resilience.
- Three small stat tiles (e.g. *SMEs Protected · Hours Donated · UK Coverage*) — placeholder values until real metrics exist.
- CTA: link to the new pricing section on `/services`.

(Existing section numbering on Home and Testimonials shifts by one.)

---

## 4. About page — replace fictional team with **Founder Credibility**

The current `/about` `team` array contains placeholder names (Ahmed Khalil, Sarah Mitchell, James Hartley). Replace the *Leadership* section with a single **Founder** block centred on you:

- Name: **Omar Salem**, Founder & Managing Director
- Bio framing: UK‑educated, Cairo‑based, internationally minded; story line — *"AXT was built to give back to the society that taught me so much."*
- Optional headshot slot (placeholder until you supply one).
- Keep the Values, Timeline, and CTA sections untouched.

---

## 5. Add a **Trust Signals** strip (Home + Services)

A thin full‑width strip above the footer:

- Row of monochrome compliance marks: **GDPR · ISO 27001 · Cyber Essentials · NCSC‑aligned** (text‑set in DM Mono with thin gold dividers — no third‑party logos until we have permission to use them).
- One placeholder testimonial card already exists on Home; add one **case‑style scenario** card on Services:
*"How AXT Essentials protected a Leeds retailer from ransomware in 72 hours."* (anonymised scenario, clearly framed as illustrative).

---

## 6. SEO tune‑up (low‑risk metadata only)

Update `<Seo>` descriptions and `index.html` meta to include the keywords from your brief:
*"SME cybersecurity UK", "virtual SOC Leeds", "IT governance UK"* — woven naturally into existing copy, no keyword stuffing.

---

## Technical notes

- All new sections use existing tokens: `--axt-void`, `--axt-obsidian`, `--axt-gold`, the `font-display` / `font-mono` / `font-editorial` classes, and the `useReveal` scroll‑in hook. No new dependencies.
- The "Free Security Check" CTA reuses the existing `Contact.tsx` form by passing a query param (`?service=security-check`) and pre‑selecting `service_interest`.
- No DB migrations required — the `enquiries` table already has `service_interest` as free text.
- i18n: English copy added now; Arabic strings stubbed with English fallback so nothing breaks on `/ar`. Translations can follow.

---

## One question before I build

I need a price floor for **Community Essentials** to display on the pricing tier (e.g. *"From £249/month"*). Options: B

- (a) **Show "From £X/month"** — give me the number and I'll use it.
- (b) **Show "From £POA"** (Price On Application) — no number on the public site, captured in the security‑check call.
- (c) **No price at all** — both tiers say *"Bespoke"* and conversion happens via the call.

If you don't want to decide now, I'll default to **(b) — "From £POA"**, which keeps the premium feel and lets you set pricing per client. B