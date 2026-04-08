

## Full Project Review — Improvements & Enhancements

After reviewing every page and component, here are the issues and improvements organized by priority.

---

### 1. Critical Fixes

**A. 404 Page doesn't match AXT design system**
The NotFound page uses default Tailwind classes (`bg-muted`, `text-muted-foreground`) instead of AXT branding. It should use `Layout`, Bebas Neue headings, Void background, gold accents, and a ghost button back to home.

**B. Contact form doesn't actually send data**
`handleSubmit` just sets `submitted = true` — no data is stored or emailed. Wire it to a database table so enquiries are saved and you can view them.

**C. About anchor (`/#about`) doesn't smooth-scroll**
Clicking "About" in the nav navigates but doesn't scroll to the `#about` section when already on the home page. Need scroll-to-hash logic.

**D. `useReveal` hook is duplicated / inconsistent**
The `useReveal` hook is defined inline in `Index.tsx` but other pages (Services, Fellowship, HannaPath) use bare `reveal` CSS classes without the intersection observer — meaning their animations fire immediately on load instead of on scroll.

---

### 2. UX & Navigation Enhancements

**E. No "Hub" link in navbar for authenticated users**
After login, fellows have no way to reach `/hub` from the navbar. Add a conditional "Hub" link (or user icon) that appears when authenticated.

**F. Mobile menu doesn't close on navigation**
The mobile menu closes on click, but the `/#about` hash link won't trigger a route change — menu stays open.

**G. Footer missing London market**
Footer lists Cairo and Leeds but omits London.

**H. Back button in HannaPath uses `<a>` instead of `<Link>`**
Line 235 of HannaPath uses `<a href="/hub">` which causes a full page reload. Should use React Router `<Link>`.

---

### 3. Design Polish

**I. Services page has no scroll-reveal animations**
Cards appear statically. Should use the same `useReveal` intersection observer pattern as the homepage.

**J. Fellowship page has no scroll-reveal animations**
Same issue — sections appear without animation.

**K. Why AXT cards have no hover effect**
Homepage "Why AXT" cards have no hover state. Add the same `onMouseEnter`/`onMouseLeave` gold-subtle background transition used on the Hub dashboard cards.

**L. Contact form inputs don't have visible focus states**
`focus:border-axt-gold` won't work because `axt-gold` isn't defined in Tailwind config as a color — it's a CSS variable. Fix focus styles.

---

### 4. Technical Debt

**M. Extract `useReveal` to a shared hook**
Move from `Index.tsx` to `src/hooks/useReveal.ts` and use consistently across all pages.

**N. Inline styles everywhere**
Many components use `style={{ color: 'var(--axt-gold)' }}` repeatedly. Create Tailwind utility classes (e.g., `text-axt-gold`, `bg-axt-void`) mapped to CSS variables in `tailwind.config.ts` for cleaner code.

**O. `font-editorial` class defined in CSS but used inconsistently**
Some places use `className="font-editorial"`, others use inline `style={{ fontFamily: "'Cormorant Garamond', serif" }}`. Standardize.

---

### 5. Content & SEO

**P. Missing favicon**
No favicon is set in `index.html`.

**Q. Missing `<meta>` keywords and structured data**
Add relevant meta tags for IT/cybersecurity consulting SEO.

---

### Implementation Plan (prioritized)

| Step | What | Files |
|------|------|-------|
| 1 | Extract `useReveal` to shared hook | `src/hooks/useReveal.ts`, update all pages |
| 2 | Add Tailwind color utilities for AXT tokens | `tailwind.config.ts` |
| 3 | Restyle 404 page to AXT design | `src/pages/NotFound.tsx` |
| 4 | Add scroll-reveal to Services + Fellowship | `Services.tsx`, `Fellowship.tsx` |
| 5 | Fix About anchor smooth scroll | `src/components/Navbar.tsx` |
| 6 | Add "Hub" nav link for authenticated users | `Navbar.tsx` |
| 7 | Fix Footer (add London) | `Footer.tsx` |
| 8 | Fix HannaPath `<a>` → `<Link>` | `HannaPath.tsx` |
| 9 | Add hover effects to Why AXT cards | `Index.tsx` |
| 10 | Fix contact form focus styles | `Contact.tsx` |
| 11 | Wire contact form to database | Migration + `Contact.tsx` |
| 12 | Standardize `font-editorial` usage | Multiple files |

