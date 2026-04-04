

## AXT Fellowship Learning Hub

### Summary
Build a password-protected "Member Hub" at `/hub` using Supabase Auth (email/password). After login, fellows see a dashboard with learning path cards. Starting with Hanna's Learning Path, organized into phases with all the courses you provided.

### Architecture

```text
/hub (login gate)
  ├── Not authenticated → Login form (email + password)
  └── Authenticated → Member Hub Dashboard
        ├── Welcome header with fellow's name
        └── Learning Path cards
              └── "Hanna's Learning Path" → /hub/hanna
                    ├── Hero: "Your Journey Starts Here, Hanna."
                    ├── Stats: 8 Phases · 24+ Courses · 8 Months · £0
                    ├── Phase 1: How to Learn + English Foundations (4 courses)
                    ├── Phase 2: Digital Foundations — Excel + ICDL (3 courses)
                    ├── Phase 3: Business Fundamentals (3 courses)
                    ├── Phase 4: Digital Marketing Core (3 courses)
                    ├── Phase 5: Advanced Marketing + AI (3 courses)
                    ├── Phase 6: Communication + Leadership (4 courses)
                    ├── Phase 7: Professional English (2 courses)
                    └── Phase 8: Certification + Capstone (2 courses)
```

### Steps

1. **Enable Lovable Cloud** — set up Supabase for auth. No profiles table needed initially; we just need email/password login.

2. **Create auth context and login page** (`src/pages/Hub.tsx`)
   - Login form styled in the AXT design system (Void background, gold accents, DM Mono, zero border-radius)
   - Email + password fields, gold "Access Hub" button
   - On success, show the hub dashboard
   - Logout button in hub header

3. **Build the Hub Dashboard** (authenticated view in `Hub.tsx`)
   - SectionLabel "AXT Fellowship · Member Hub"
   - Welcome message
   - Grid of learning path cards (starting with one: Hanna's Learning Path)
   - Each card shows: name, phase count, course count, duration, cost
   - Cards link to individual path pages

4. **Create Hanna's Learning Path page** (`src/pages/HannaPath.tsx` at `/hub/hanna`)
   - Protected route (redirects to /hub if not authenticated)
   - Hero section with personalized intro
   - Stats bar: 8 Phases, 24+ Courses, 8 Months, £0
   - Phase sections (1-8), each with:
     - Phase number and title
     - Phase goal description
     - Course cards with: platform badge, course title, description, "FREE" link button opening in new tab
   - All courses from your message organized by phase, matching the PDF structure

5. **Add route to App.tsx** — `/hub` and `/hub/hanna`, both wrapped with auth check

6. **Create the first user account** — You'll need to manually create Hanna's account in Supabase Auth (or I can add a note about how to do this via the Supabase dashboard).

### Course Organization (from your data)

**Phase 1 — How to Learn + English Foundations** (Months 1-2)
- Coursera: Learning How to Learn
- FutureLearn: Basic English 1 (Elementary)
- FutureLearn: Basic English 2 (Pre-Intermediate)
- OpenLearn: Everyday English 1

**Phase 2 — Digital Foundations** (Months 2-3)
- Edraak: ICDL Base
- Edraak: Mastering Excel
- Santander: Excel – From Basics to Intermediate

**Phase 3 — Business Fundamentals** (Months 3-4)
- Edraak: Accounting Essentials for Non-Accountants
- Edraak: Agile Project Management
- edX (AdelaideX): Introduction to Project Management

**Phase 4 — Digital Marketing Core** (Months 4-5)
- HubSpot: Social Media Marketing Certification
- HubSpot: Digital Marketing Certification
- HubSpot: Content Marketing Certification
- Simplilearn: Digital Marketing Strategy

**Phase 5 — Advanced Marketing + AI** (Months 5-6)
- Simplilearn: ChatGPT for Digital Marketing
- Simplilearn: Introduction to Content Marketing
- Semrush: Become an AI-Powered Marketer
- Santander: Digital Marketing
- Santander: Digital Advertising: Data, AI and Legal Compliance

**Phase 6 — Communication + Leadership** (Months 6-7)
- Santander: Effective Communication
- Santander: Critical Thinking & Problem Solving
- Santander: Strategic Communication & Teamwork
- Santander: Leadership
- Edraak: Introduction to Entrepreneurship

**Phase 7 — Professional English** (Month 7)
- Santander: Elevating Your English: Crafting Engaging Presentations
- Santander: Elevating Your English: Communicating as a Leader
- edX (BerkeleyX): How to Write an Essay

**Phase 8 — Certification + Professional Portfolio** (Month 8)
- Santander: Excel – Intermediate to Advanced
- Santander: Project Management & Agile Fundamentals
- Meta: 100-101 Certified Digital Marketing Associate

### Design Notes
- All pages use the AXT design system: Void/Obsidian/Carbon backgrounds, gold accents, DM Mono body, Bebas Neue headings, zero border-radius, grain overlay
- Course cards show platform as a 9px gold label, course title in Bebas Neue, description in DM Mono, with a ghost button linking out
- Phase sections alternate between Void and Obsidian backgrounds
- Login page is minimal and institutional — centered form, AXT branding above

