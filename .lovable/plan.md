

## New Pages, Improvements & Enhancements

### A. New Pages

**1. Case Studies / Portfolio (`/work`)**
A page showcasing AXT's project work — anonymized case studies with problem/approach/outcome structure. Builds credibility with prospective clients. Each case study as a card with sector tag (Finance, Healthcare, Government), service pillar badge, and key metrics.

**2. Team / About (`/about`)**
A dedicated About page (separate from the homepage section) with team bios, company timeline, and values. Positions AXT as a serious firm with named senior practitioners — reinforces the "Senior Delivery" promise.

**3. Blog / Insights (`/insights`)**
A content hub for thought leadership — cybersecurity advisories, governance guidance, IT strategy articles. Stored in the database, with an admin interface in the Hub. Drives SEO and positions AXT as an authority.

**4. FAQ (`/faq`)**
Common questions about services, engagement models, the Fellowship programme. Reduces friction for prospects deciding whether to reach out. Uses accordion components.

**5. Careers (`/careers`)**
Separate from the Fellowship — a page for professional hires. Even if there are no current openings, it signals growth and ambition. Can include a "Register interest" form wired to the database.

---

### B. Hub Enhancements

**6. Course Progress Tracking**
Add a `course_progress` table in the database. Each course card gets a status toggle (Not Started / In Progress / Completed). The Hub dashboard shows an overall progress bar and phase completion percentage. Fellows can see how far they've come.

**7. Password Reset Flow**
Add a "Forgot password?" link on the Hub login page that triggers a password reset email via the auth system. Essential for real users.

**8. Fellow Profile Page (`/hub/profile`)**
A simple page where fellows can see their email, update their display name, and view their progress stats (courses completed, current phase, streak).

**9. Admin Dashboard (`/hub/admin`)**
For AXT staff — view all fellows, their progress, and submitted enquiries from the contact form. Protected by a role-based check (admin role in a `user_roles` table).

---

### C. UX & Design Improvements

**10. Page Transition Animations**
Add fade/slide transitions between routes using React Router + CSS. Gives the site a polished, app-like feel consistent with the premium brand.

**11. Loading Skeleton States**
Replace the plain "Loading..." text in the Hub with skeleton shimmer components matching the card layouts. More professional.

**12. Back-to-Top Button**
A subtle gold arrow that appears after scrolling past the fold. Useful on long pages like Services and HannaPath.

**13. Cookie Consent Banner**
If targeting UK/EU users (Leeds, London, Cairo), a minimal GDPR cookie consent banner is expected. Ghost-style button, dismissible, stores preference in localStorage.

**14. Dark/Light Mode Toggle** *(optional — may conflict with brand)*
The AXT brand is fundamentally dark. Skip this unless explicitly requested.

---

### D. Technical Improvements

**15. Image/Asset Optimization**
Add Open Graph meta images for social sharing. When someone shares axt.tech on LinkedIn or Twitter, it should show a branded preview card — not a blank thumbnail.

**16. Sitemap & robots.txt**
Generate a sitemap.xml for SEO. The existing robots.txt exists but may need updating to reference the sitemap.

**17. Analytics Integration**
Add lightweight, privacy-respecting analytics (e.g., Plausible or a simple page-view tracker via database) to understand traffic patterns.

---

### Recommended Priority Order

| Priority | Item | Impact |
|----------|------|--------|
| 1 | Course progress tracking (Hub) | High — core fellowship UX |
| 2 | Password reset flow | High — essential for real users |
| 3 | Case Studies page | High — client conversion |
| 4 | Admin dashboard | High — operational need |
| 5 | Blog/Insights page | Medium — SEO + authority |
| 6 | Fellow profile page | Medium — personalization |
| 7 | FAQ page | Medium — reduces friction |
| 8 | OG meta images | Medium — social sharing |
| 9 | Page transitions | Low — polish |
| 10 | Cookie consent | Low — compliance |

Let me know which items you want to build, or say "all" and I'll work through them in priority order.

