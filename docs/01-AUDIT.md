# Phase 1 – Audit of the existing site (reference only)

Source: `E:\Vinayak Hospital Web\vinayankhospitalkodinar` (ASP.NET Core MVC, EF Core + SQL Server, Tailwind 3 + 200 KB hand-written site.css, GSAP from CDN).
Brand: **Vinayak Children & Maternity Hospital**, Kodinar (Gujarat). Trusted since 2014.

## Business facts to preserve (all taken from the existing site)
- Address: Nagarpalika Stadium Road, Chara Japa, Kodinar - 362720 (map pin 20.7903431, 70.7058077)
- Phone / WhatsApp / Emergency: +91 90708 09010 (emergency 24/7)
- Email: Vinayakhospital1911@gmail.com
- OPD hours: Mon–Sat 9:30 AM – 7:00 PM
- Doctors: Dr Pradhyuman Jadav (Pediatrician, 10+ yrs), Dr Hetal Jadav (Gynaecologist, 12+ yrs)
- Powered-by credit: Twisha Consultancy Services
- Only real stats exist: 2 doctors, 10+ years, 24/7 emergency, since 2014, 19+ care services. No invented numbers.

## Departments (3) and services (19)
1. Pediatric Care (7): Newborn & Neonatal, Child Vaccination, Check-ups & Growth, Childhood Illness, Nutrition Counselling, Special & NICU Newborn Care, Emergency Pediatric.
2. Gynecology & Maternity (10): Prenatal, High-Risk Pregnancy, Normal Delivery, C-Section, Postnatal, IVF & Infertility, Routine Gynae, Family Planning, Ultrasound, Menstrual/Hormonal.
3. Diagnostics & Emergency (2): Laboratory, 24/7 Emergency.

## Routes (all must exist in the new site)
| Route | Notes |
|---|---|
| `/` | Home; pulls approved reviews (6) + latest blog posts (3) from DB |
| `/Home/About`, `/Home/Doctors`, `/Home/Services`, `/Home/Gallery`, `/Home/Contact`, `/Home/Emergency`, `/Home/Careers`, `/Home/Privacy`, `/Home/TermsofService` | static content |
| `/doctors/{slug}` | 2 profiles (static C# data) |
| `/departments/{slug}` | 3 departments (static C# data) |
| `/Blog`, `/Blog/Details?slug=` | DB-driven, category filter |
| `/Admin/Login`, `BlogList/Create/Edit/Delete` | session password login |
| `/resources/pregnancy-calculator` | client-side + saves lead |
| `/resources/pregnancy`, `/resources/pregnancy/week-{n}` | 40-week guide (static C#) |
| `/resources/hospital-bag-checklist` | localStorage checklist |
| `/resources/vaccination-tracker` | schedule + localStorage tracking |
| `/resources/baby-growth-tracker` | WHO-style reference + localStorage + chart |
| `/resources/baby-milestones` | age-based milestones |
| `/resources/womens-health`, `/resources/womens-health/{slug}` | article library |

## Functionality and data (what must keep working)
| Feature | Today | Backend dependency |
|---|---|---|
| Book appointment | POST `/Home/BookAppointment` -> `Appointments` table (FullName, MobileNumber [6-9]\d{9}, Email?, DoctorName, AppointmentDate, Message) | **Yes – DB write** |
| Patient review | POST `/Home/AddReview` -> `Reviews` (auto-approved) | **Yes – DB write + read** |
| Pregnancy due-date lead | POST `/Home/SavePregnancyLead` -> `PregnancyLeads` | **Yes – DB write** |
| Blog + admin CMS | `BlogPosts`, session password | **Yes – DB read/write + auth** |
| Trackers (bag, vaccine, growth, milestones) | browser localStorage, static reference data in C# | None – pure content/JS |
| Floating WhatsApp / Call / Due-date modal | static | None |

Tables: Appointments, Reviews, BlogPosts, PregnancyLeads (EF migrations present).

## Problems found in the old project (drive the architecture)
1. **Secrets in source control.** `appsettings.json` contains the production SQL Server host, user, password and the admin password in plain text, and is committed to git. **These must be treated as compromised and rotated.** The new project reads them only from environment variables.
2. **Public data leak:** `GET /Home/Appointments` has no `[AdminAuth]` – anyone can list every patient's name, phone and appointment. Must be fixed whatever else we decide.
3. **Weak admin auth:** single shared password compared with `==`, in-memory session, no rate limit.
4. Reviews are published immediately with no moderation (a hospital site should moderate).
5. Anyone can POST unlimited appointments / leads (no rate limit, no honeypot).
6. Appointment time is date only, and doctor is a free-text string.
7. Content is duplicated: services list lives in both `Services.cshtml` and `DepartmentData.cs`; doctors in both view and C#.
8. Home page hot-links stock photos from pexels.com, loads GSAP from a CDN, and ships 1–2 MB PNGs next to JPG twins (`Maternity.png` 1.6 MB etc.).
9. Emoji used as department icons, mixed pink/sage/navy palettes across pages, 200 KB unstructured CSS.
10. Hours say Mon–Sat 9:30–7 on the Contact page while the emergency copy says 24/7 – keep both, but present them clearly as OPD vs emergency.
11. Social links in the footer are `#` (placeholders) – we will not render buttons that go nowhere.
12. Blog posts have no SEO fields, no sitemap, no structured data, no canonical URLs.

## Assets inventory (`wwwroot/images`)
- Logo: `logo.png` (457 KB, needs optimising)
- Photos (real, reusable): `viyananksir.jpeg`, `vinayankmrs.jpeg` (doctors), `reception.jpeg`, `operation-theatre.jpeg`, `child-checkup-1/2.jpeg`, `newborn-care.jpeg`, `doctor-profile.jpeg`, `EMERGENCY.jpg`, `Maternity.jpg`, `Neonatal.jpg`, `Laboratory.jpg`
- Illustrations: `birth-journey`, `pregnancy-journey`, `womens-health-journey`, `footer-illustration` (+ GIF icons: not reused – cartoon GIFs fight a premium direction)
- Gallery page currently uses the above; no extra hospital photography exists, so the new Gallery must be built from them (and flagged as a needs-new-photography item).

## Keep / replace verdict
- **Keep the database and its 4 tables.** Reuse the content text almost verbatim.
- **Keep the .NET backend, but as an API only** (see Phase 2). Do not rewrite working EF models/migrations.
- **Replace every view, all CSS, all UI JS.**
