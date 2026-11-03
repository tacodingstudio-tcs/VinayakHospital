export const site = {
  name: "Vinayak Children & Maternity Hospital",
  short: "Vinayak Hospital",
  since: 2014,
  phone: "+91 90708 09010",
  tel: "+919070809010",
  whatsapp: "https://wa.me/919070809010",
  email: "Vinayakhospital1911@gmail.com",
  address: "Nagarpalika Stadium Road, Chara Japa, Kodinar - 362720",
  opd: "Mon – Sat, 9:30 AM – 7:00 PM",
  emergency: "24 hours, every day",
  map: "https://www.google.com/maps?q=20.7903431,70.7058077",
  mapEmbed: "https://www.google.com/maps?q=20.7903431,70.7058077&z=15&output=embed",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  api: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5080",
};

export type Doctor = {
  slug: string; name: string; specialty: string; role: string; photo: string;
  experience: string; bio: string; care: string[]; resource: { label: string; title: string; href: string };
};

export const doctors: Doctor[] = [
  {
    slug: "dr-pradhyuman-jadav", name: "Dr Pradhyuman Jadav", specialty: "Pediatrician", role: "Child Specialist",
    photo: "/img/viyananksir.jpeg", experience: "Around 10 Years",
    bio: "Dr. Pradhyuman takes the time to listen to every parent's concerns and explains things in plain language, without rushing an appointment. Known across Kodinar for his patience with even the fussiest toddlers.",
    care: ["Newborn & Neonatal Care", "Child Vaccination", "Routine Check-ups & Growth Monitoring", "Treatment for Childhood Illnesses", "Emergency Pediatric Care"],
    resource: { label: "Parent Resource", title: "Keep Your Child's Vaccinations Organized", href: "/resources/vaccination-tracker" },
  },
  {
    slug: "dr-hetal-jadav", name: "Dr Hetal Jadav", specialty: "Gynaecologist", role: "Women's Health Specialist",
    photo: "/img/vinayankmrs.jpeg", experience: "12+ Years",
    bio: "Dr. Hetal believes every woman deserves to feel heard and comfortable, whether it's a routine check-up or a high-risk pregnancy. Her calm, reassuring manner has made her a trusted presence for families across Kodinar through pregnancy, delivery, and beyond.",
    care: ["Pregnancy Care & Prenatal Check-ups", "Normal Delivery", "Postnatal Care", "Routine Gynecological Check-ups", "High-Risk Pregnancy Management"],
    resource: { label: "Patient Resource", title: "Explore Women's Health Topics", href: "/resources/womens-health" },
  },
];

export type Department = {
  slug: string; name: string; tagline: string; overview: string; doctor?: string; doctorName?: string;
  image: string; items: { title: string; desc: string }[];
};

export const departments: Department[] = [
  {
    slug: "pediatric-care", name: "Pediatric Care", tagline: "Gentle, attentive care for every stage of childhood",
    overview: "From a baby's very first check-up to the everyday bumps and illnesses of growing up, our pediatric team is here for your child — and for you. We take the time to explain things clearly, so you always know what to expect next.",
    doctor: "dr-pradhyuman-jadav", doctorName: "Dr Pradhyuman Jadav", image: "/img/child-checkup-1.jpeg",
    items: [
      { title: "Newborn & Neonatal Care", desc: "Round-the-clock monitoring and gentle care for newborns in their first days and weeks." },
      { title: "Child Vaccination", desc: "Complete, on-schedule immunizations to protect your child against preventable illnesses." },
      { title: "Routine Check-ups & Growth Monitoring", desc: "Regular visits to track your child's growth and catch any concerns early." },
      { title: "Treatment for Childhood Illnesses", desc: "Prompt, caring treatment for fevers, infections, and everyday childhood health issues." },
      { title: "Nutritional Counselling for Children", desc: "Practical feeding and nutrition guidance to help your child grow strong and healthy." },
      { title: "Special & NICU Newborn Care", desc: "Extra support and close monitoring for newborns who need a little more care." },
      { title: "Emergency Pediatric Care", desc: "Fast, calm care when your child needs urgent attention, any time of day." },
    ],
  },
  {
    slug: "gynecology-maternity-care", name: "Gynecology & Maternity Care", tagline: "Supporting women through every stage of life",
    overview: "From your first prenatal visit to delivery and beyond, and for every routine women's health check-up in between, our team is here to listen, guide and care for you with patience and respect.",
    doctor: "dr-hetal-jadav", doctorName: "Dr Hetal Jadav", image: "/img/Maternity.jpg",
    items: [
      { title: "Pregnancy Care & Prenatal Check-ups", desc: "Regular check-ups throughout your pregnancy to keep you and your baby healthy." },
      { title: "High-Risk Pregnancy Management", desc: "Close, specialized monitoring for pregnancies that need extra attention and care." },
      { title: "Normal Delivery", desc: "Supportive, experienced care through labour and a natural delivery." },
      { title: "Cesarean (C-Section) Delivery", desc: "Safe, well-managed surgical delivery when it's the best option for you and your baby." },
      { title: "Postnatal Care", desc: "Continued care and guidance for mother and baby in the weeks after delivery." },
      { title: "IVF & Infertility Treatment", desc: "Compassionate, personalized support and treatment for couples on their journey to parenthood." },
      { title: "Routine Gynecological Check-ups", desc: "Preventive screenings and check-ups for women's health at every age." },
      { title: "Family Planning & Contraception Counselling", desc: "Confidential guidance to help you choose the right family planning option for you." },
      { title: "Ultrasound & Sonography", desc: "In-house ultrasound imaging for accurate, timely monitoring during pregnancy and beyond." },
      { title: "Menstrual & Hormonal Disorder Treatment", desc: "Diagnosis and treatment for menstrual irregularities and hormonal health concerns." },
    ],
  },
  {
    slug: "diagnostics-emergency", name: "Diagnostics & Emergency", tagline: "Reliable support whenever you need it",
    overview: "Quick, reliable diagnostic testing as part of your regular care, and emergency support available around the clock when your family needs it most.",
    image: "/img/EMERGENCY.jpg",
    items: [
      { title: "Laboratory & Diagnostic Services", desc: "On-site lab testing for quick, reliable results as part of your care." },
      { title: "24/7 Emergency Services", desc: "Emergency care available around the clock, every day of the week." },
    ],
  },
];

// The five stages of the family journey (from the existing About page).
export const journey = [
  { n: "01", title: "Pregnancy", eyebrow: "A New Beginning", line: "Every journey begins with a little hope.", desc: "Supporting mothers through their pregnancy journey with compassionate and attentive care.", image: "/img/pregnancy-journey.jpg", dept: "gynecology-maternity-care" },
  { n: "02", title: "Birth", eyebrow: "A Moment to Remember", line: "A moment that changes everything.", desc: "Being there for one of life's most precious moments, with care for both mother and baby.", image: "/img/birth-journey.jpg", dept: "gynecology-maternity-care" },
  { n: "03", title: "Newborn", eyebrow: "The First Days", line: "Tiny hands. Endless possibilities.", desc: "Caring for the newest member of your family during those precious first days.", image: "/img/newborn-care.jpeg", dept: "pediatric-care" },
  { n: "04", title: "Childhood", eyebrow: "Years of Growth", line: "Helping them grow, one healthy milestone at a time.", desc: "Supporting children through their growing years with attentive pediatric care.", image: "/img/child-checkup-1.jpeg", dept: "pediatric-care" },
  { n: "05", title: "Women's Health", eyebrow: "Care Through Every Stage", line: "Because caring for women doesn't end with motherhood.", desc: "Continuing healthcare support for women through every stage of life.", image: "/img/womens-health-journey.jpg", dept: "gynecology-maternity-care" },
];

export const nav = [
  { href: "/about", label: "About" },
  { href: "/doctors", label: "Doctors" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const tools = [
  { href: "/resources/pregnancy-calculator", group: "Pregnancy", title: "Pregnancy Calculator", desc: "Estimate your due date and current week." },
  { href: "/resources/pregnancy", group: "Pregnancy", title: "Pregnancy Week-by-Week", desc: "Forty weeks of general guidance and questions for your doctor." },
  { href: "/resources/hospital-bag-checklist", group: "Pregnancy", title: "Hospital Bag Checklist", desc: "What to pack for mother, baby and companions." },
  { href: "/resources/vaccination-tracker", group: "Child Health", title: "Vaccination Tracker", desc: "Keep your child's immunizations organized." },
  { href: "/resources/baby-growth-tracker", group: "Child Health", title: "Baby Growth Tracker", desc: "Record measurements and see growth over time." },
  { href: "/resources/baby-milestones", group: "Child Health", title: "Baby Milestones", desc: "Age-based development and how to support it." },
  { href: "/resources/womens-health", group: "Women's Health", title: "Women's Health Library", desc: "Periods, pregnancy, postpartum, wellness and menopause." },
];
