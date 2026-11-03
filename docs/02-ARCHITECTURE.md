# Phase 2 – Concept, stack, architecture

## Chosen concept: "First Heartbeat" (editorial x immersive)
Considered:
- A. Premium Editorial: refined serif type, calm imagery. Safe, but forgettable for a local hospital.
- B. Immersive Interactive: scroll storytelling, motion. Memorable, risk of heaviness on low-end phones in Kodinar.
- C. Bold Experimental: oversized type, broken grids. Striking, but weak trust signal for a medical brand.

**Decision:** B's storytelling on A's restraint. One idea runs through every page: a single pulse line (ECG) that draws as you scroll, from the first heartbeat to a child's growing years. Hero is typography-led with a lightweight canvas/SVG pulse (no heavy WebGL). Three.js is dropped in favour of GSAP + SVG so the site stays fast on budget phones.

## Design system
- Colours: Ink #1B1A1F, Cream #FAF4EA, Clay (primary) #C65A3E, Rose #E9B8A6, Sage #5E7F6B, Pulse (accent) #FF4D5E. Replaces the old pink/navy/sage mix.
- Type: Fraunces (display, variable, optical size) + Inter (UI). Gujarati-capable fallback Noto Sans Gujarati for later.
- Scale: fluid clamp() from 16px body to 14vw hero. 8px spacing grid, 12-col grid with deliberate overlap.
- Motion: ease `cubic-bezier(.22,1,.36,1)`, 0.6–1.1 s reveals, `prefers-reduced-motion` disables scroll-jacking and pulse loops.
- Cursor: custom only on fine pointers; never on touch.

## Stack
| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js (App Router) + TypeScript | SSR/SSG for SEO, route transitions, image optimisation |
| Styling | Tailwind + CSS variables for tokens | small output, one design system |
| Motion | GSAP + ScrollTrigger, Lenis | scroll storytelling, small bundle when split |
| Backend | Existing .NET 8 + EF Core, reduced to a JSON API | tables and migrations stay untouched |
| DB | Existing SQL Server (test DB), connection string via env var | no schema change needed |
| Content | Typed TS files (departments, doctors, tools) | removes C#/view duplication |
| Hosting | Frontend on Vercel or the existing Docker host; API in existing Dockerfile | |

## API (replaces MVC controllers)
- `POST /api/appointments` (validation, honeypot, rate limit)
- `POST /api/reviews` (stored unapproved; admin approves)
- `GET  /api/reviews` (approved only)
- `POST /api/leads/pregnancy`
- `GET  /api/blog`, `GET /api/blog/{slug}`
- `POST /api/admin/login` (hashed password, signed cookie, rate limit); admin CRUD for blog, review moderation, **protected** appointments list
- Secrets only from env vars; `.env*` git-ignored.

## Pages (nothing dropped)
Home, About, Doctors, Doctor/[slug], Services, Departments/[slug], Gallery, Blog, Blog/[slug], Contact, Emergency, Careers, Privacy, Terms, Admin, and all 8 Resources tools (calculator, 40 weekly pages, bag checklist, vaccination, growth, milestones, women's health + articles).

## Build order
1. Scaffold web + api, tokens, layout, nav, footer
2. Home
3. Content pages and Contact (live API)
4. Resources tools
5. Blog + admin
6. Responsive, a11y, SEO (sitemap, JSON-LD MedicalOrganization), Lighthouse, browser testing
