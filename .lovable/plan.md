

## Full Website Review + 100 Feature Roadmap

A complete audit of the AXT site as it stands today, followed by 100 prioritised enhancements grouped by theme. Approve the plan and I'll execute in waves (you can also pick specific waves to ship first).

---

### Current State Audit

**Strengths**
- Strong, consistent brand system (Void/Gold, Bebas/DM Mono/Cormorant, zero radius, grain overlay)
- Solid page coverage: Home, Services, About, Fellowship, Work, Insights, FAQ, Careers, Contact, Hub + sub-pages
- Auth, RLS, profiles, roles, course progress, enquiries, careers leads, blog posts schema in place
- Shared `useReveal` hook, BackToTop, CookieConsent, SEO meta + sitemap

**Gaps**
- No course progress UI on `HannaPath` (table exists, unused)
- No blog post editor in admin — `blog_posts` is read-only from the app
- No signup flow — admins must create users manually
- No file/image storage, no edge functions, no email notifications on form submits
- Minimal accessibility (focus rings, skip links, aria labels)
- No analytics, no rate limiting on public forms, no honeypot/captcha
- No search, no filtering on Work/Insights, no pagination
- Single learning path hardcoded in TSX — not data-driven
- No testimonials, no client logos, no pricing/engagement model page
- No multilingual support (Cairo audience would benefit from Arabic)
- No PWA, no offline, no print stylesheets

---

### 100 Features — Grouped by Wave

**Wave 1 — Hub Core (10)**
1. Course progress toggles on HannaPath (Not started / In progress / Completed)
2. Per-phase progress bars + overall completion %
3. Streak counter (consecutive days with progress updates)
4. "Last activity" timestamp on profile
5. Resume-where-you-left-off card on Hub dashboard
6. Course notes field per course (private to fellow)
7. Bookmarks/favorites for courses
8. Estimated time remaining (based on hours-per-course)
9. Certificate upload per course (storage bucket)
10. Downloadable progress report (PDF)

**Wave 2 — Hub Admin & Content (10)**
11. Blog post editor (create/edit/publish/unpublish) in `/hub/admin`
12. Rich-text editor (Tiptap) for posts
13. Cover image upload for posts (storage)
14. Draft autosave
15. Enquiries table view with status (new/contacted/closed)
16. Career interests table view + status
17. Fellow management (invite, deactivate, assign role)
18. Send invite email via edge function (Resend)
19. CSV export for enquiries, career interests, fellows
20. Admin activity log

**Wave 3 — Auth & Account (10)**
21. Public signup (gated by invite code) for fellowship onboarding
22. Magic-link login option
23. Google OAuth
24. Email verification banner + resend
25. Update email flow
26. Two-factor auth (TOTP)
27. Session list + revoke
28. Account deletion (self-service)
29. Avatar upload on profile
30. Display-name + bio + timezone fields

**Wave 4 — Learning Paths Engine (10)**
31. Move learning paths to DB (`learning_paths`, `phases`, `courses` tables)
32. Path catalogue page `/hub/paths`
33. Multi-path enrolment per fellow
34. New "IT Path" seeded
35. Admin UI to create/edit paths, phases, courses
36. Course tags (platform, level, hours, language)
37. Reorder courses via drag-and-drop
38. Prerequisites between courses
39. Cohort grouping (Cohort 01, 02…)
40. Cohort leaderboard (opt-in)

**Wave 5 — Public Site Content (10)**
41. Pricing / engagement models page (`/services/engagement`)
42. Industries page (`/industries`) — Finance, Health, Government, Education
43. Client logos strip on Home
44. Testimonials section (DB-backed)
45. Detailed case study sub-pages (`/work/:slug`)
46. Methodology page (how AXT delivers)
47. Trust & compliance page (ISO/Cyber Essentials/GDPR)
48. Press / media kit page
49. Partners page
50. Events page (workshops, talks)

**Wave 6 — Lead Gen & CRM (10)**
51. Honeypot + rate limit on Contact + Careers forms
52. hCaptcha integration
53. Email notification to `hello@axt.tech` on form submit (Resend edge function)
54. Auto-reply to submitter
55. Newsletter signup (footer + post-CTA)
56. Lead scoring (simple rules in admin)
57. UTM capture on form submissions
58. Calendly-style "Book a discovery call" embed
59. Service-specific intake forms (Infra / Cyber / Governance)
60. Fellowship application form (multi-step)

**Wave 7 — UX, Motion & Polish (10)**
61. Route transition wrapper (fade + 8px slide)
62. Skeleton loaders for Hub, Insights, Work
63. Sticky service-pillar nav on Services page
64. Animated counter for stats (intersection-triggered)
65. Magnetic gold cursor on CTA buttons (desktop only)
66. Marquee variants (paused on hover)
67. Section progress dots (right rail) on long pages
68. Smooth-scroll TOC on Insights articles
69. Image lightbox for case study assets
70. Empty-state illustrations matching brand

**Wave 8 — Performance, A11y, SEO (10)**
71. Skip-to-content link
72. Visible focus rings using `--axt-gold`
73. Aria labels + landmarks audit
74. Reduced-motion respect across all reveals
75. Lighthouse pass 95+ (lazy images, font-display swap)
76. Per-page meta + canonical via `react-helmet-async`
77. JSON-LD per article + per case study
78. RSS feed for `/insights`
79. Auto-generated sitemap from DB
80. 404 + 500 styled pages (500 added)

**Wave 9 — Internationalisation & Brand Reach (10)**
81. i18n scaffold (`react-i18next`) — EN default, AR added
82. RTL support for Arabic
83. Language switcher in nav + footer
84. Localised meta tags + hreflang
85. Currency-aware copy where relevant
86. Region landing pages (`/cairo`, `/leeds`, `/london`)
87. Localised contact info per region
88. Date/time formatting via `date-fns` locales
89. Translated Fellowship application
90. Translated FAQ

**Wave 10 — Platform, Ops & Trust (10)**
91. Plausible-style first-party analytics (page_views table + edge function)
92. Server-side error logging (edge function → table)
93. Health-check page `/status`
94. Maintenance mode flag (admin toggle)
95. Feature flags table + provider
96. Audit log on sensitive admin actions
97. Backup/export of all admin data (zipped CSV)
98. Storage bucket policies for avatars, post covers, certificates
99. Edge function: weekly digest email to admins (new leads, new enquiries)
100. PWA install (manifest, service worker, offline 404)

---

### Technical Approach

- **Database**: new tables — `learning_paths`, `phases`, `courses`, `enrolments`, `notes`, `bookmarks`, `certificates`, `testimonials`, `case_studies`, `industries`, `events`, `partners`, `newsletter_subscribers`, `lead_status`, `feature_flags`, `audit_log`, `page_views`, `error_log`. All with RLS following the existing `has_role` pattern.
- **Storage buckets**: `avatars` (public), `post-covers` (public), `certificates` (private), `case-study-assets` (public).
- **Edge functions**: `send-enquiry-email`, `send-careers-email`, `send-invite`, `weekly-digest`, `track-pageview`, `log-error`. All using `Resend` (will request API key when we hit that wave).
- **Libraries to add**: `react-helmet-async`, `react-i18next`, `@tiptap/react` + extensions, `date-fns`, `dompurify`. No UI library swaps.
- **Design system**: every new surface uses Void/Gold tokens, zero radius, DM Mono labels, Bebas headings, grain overlay, scroll reveals via shared `useReveal`.

---

### Recommended Execution Order

Ship in waves so you can review and steer:

1. **Wave 1 + 2** (Hub Core + Admin/Content) — biggest internal value
2. **Wave 3** (Auth & Account) — unblocks self-service onboarding
3. **Wave 6** (Lead Gen) + **Wave 8** (A11y/SEO) — biggest commercial impact
4. **Wave 5** (Public content) + **Wave 7** (Polish)
5. **Wave 4** (Paths engine) — once you have 2+ paths to model
6. **Wave 9** (i18n) — when ready for Arabic launch
7. **Wave 10** (Ops/Trust) — hardening before scale

Reply with **"all"** to run waves in order, **"wave N"** to start a specific one, or list individual feature numbers to cherry-pick.

