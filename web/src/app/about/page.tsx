import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { doctors, journey, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "For over a decade, Vinayak Children & Maternity Hospital has cared for families in Kodinar, from pregnancy and childbirth to newborn care and childhood.",
  alternates: { canonical: "/about" },
};

const facts = [
  [String(site.since), "Trusted care since"],
  ["2", "Specialist doctors"],
  ["~10", "Years of care"],
  ["24/7", "Emergency support"],
];
const moments = ["Two lines on a pregnancy test.", "That first heartbeat.", "A mother's nervous smile.", "The first cry of a newborn.", "A child's first vaccination.", "A parent's anxious visit."];
const values = [
  ["Compassion", "Care with kindness. We listen, understand and treat every patient with dignity.", "bg-[#ffe9d6]"],
  ["Trust", "Relationships matter. We believe honest communication is an important part of healthcare.", "bg-[#e3f4ee]"],
  ["Responsibility", "Every patient matters. We approach every interaction with care and responsibility.", "bg-[#e9e6ff]"],
  ["Family", "Care beyond the patient. When one person needs care, the whole family feels it.", "bg-[#ffe3ea]"],
];
const H2 = "display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05]";

export default function About() {
  return (
    <>
      <PageHero eyebrow={`About Vinayak Hospital · Since ${site.since}`} title={<>Where <em>new beginnings</em> meet lifelong care.</>} intro="For over a decade, we've cared for families in Kodinar, from pregnancy and childbirth to newborn care and childhood." />

      {/* Story + facts */}
      <section className="wrap grid items-center gap-5 pb-8 md:grid-cols-[0.9fr_1.1fr]" aria-labelledby="story-h">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl"><Image src="/img/reception.jpeg" alt="Reception at Vinayak Children & Maternity Hospital" fill priority sizes="(max-width:768px) 100vw, 45vw" className="object-cover" /></div>
        <div className="reveal">
          <p className="eyebrow">Our story</p>
          <h2 id="story-h" className={`${H2} mt-2`}>Built around families, <em className="text-clay">one story at a time.</em></h2>
          <p className="mt-4 text-lg text-ink-soft">From pregnancy consultations and childbirth to newborn care, childhood illnesses and vaccinations, our journey has been built around the moments that matter most to families.</p>
          <p className="mt-3 text-ink-soft">We understand that when a child is unwell, a parent&rsquo;s heart is never calm. And pregnancy can bring questions alongside happiness.</p>
          <blockquote className="display mt-5 border-l-4 border-clay pl-4 text-xl leading-snug">Sometimes what a family needs most isn&rsquo;t just medicine. It is reassurance, patience and someone who listens.</blockquote>
        </div>
      </section>

      <section className="wrap pb-8" aria-label="The hospital in numbers">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {facts.map(([v, l]) => <div key={l} className="reveal card p-5 text-center"><dd className="display text-4xl text-clay">{v}</dd><dt className="mt-1 text-sm font-semibold text-ink-soft">{l}</dt></div>)}
        </dl>
      </section>

      {/* Moments */}
      <section className="bg-[#fde3cc] py-8" aria-labelledby="mom-h">
        <div className="wrap">
          <p className="eyebrow">Every family has a story</p>
          <h2 id="mom-h" className={`${H2} mt-2`}>Moments in <em className="text-clay">a family&rsquo;s life.</em></h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {moments.map((m, i) => (
              <li key={m} className="reveal card flex items-center gap-4 p-4"><span className="display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-clay text-lg text-white">{i + 1}</span><span className="display text-lg leading-snug">{m}</span></li>
            ))}
          </ol>
          <p className="mt-5 max-w-2xl text-ink-soft">These are not just moments in healthcare. They are <strong className="text-ink">moments in a family&rsquo;s life.</strong></p>
        </div>
      </section>

      {/* Care that grows with your family */}
      <section className="wrap py-8" aria-labelledby="grow-h">
        <p className="eyebrow">Our care</p>
        <h2 id="grow-h" className={`${H2} mt-2`}>Care that grows <em className="text-clay">with your family.</em></h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((c) => (
            <li key={c.n} className="reveal">
              <Link href={`/departments/${c.dept}`} className="card group flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1">
                <div className="relative aspect-[4/3] bg-cream-2"><Image src={c.image} alt={`${c.title} care at Vinayak Hospital`} fill sizes="(max-width:640px) 100vw, 20vw" className="object-cover" /></div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-bold text-clay">{c.n} · {c.eyebrow}</p>
                  <h3 className="display mt-1 text-xl leading-tight">{c.title}</h3>
                  <p className="mt-1 text-sm italic text-ink-soft">&ldquo;{c.line}&rdquo;</p>
                  <p className="mt-2 flex-1 text-sm text-ink-soft">{c.desc}</p>
                  <p className="mt-3 text-sm font-bold text-clay">Explore this care →</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        <p className="display mt-6 text-center text-xl md:text-2xl">Because your family&rsquo;s health isn&rsquo;t a single moment. <em className="text-clay">It&rsquo;s a lifetime of care.</em></p>
      </section>

      {/* Doctors */}
      <section className="border-y border-ink/10 bg-white py-8" aria-labelledby="team-h">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="eyebrow">The people behind the care</p><h2 id="team-h" className={`${H2} mt-2`}>Doctors who <em className="text-clay">listen.</em></h2></div>
            <Link href="/doctors" className="inline-block py-1 text-sm font-bold text-clay underline underline-offset-4">Meet the team →</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {doctors.map((d, i) => (
              <Link key={d.slug} href={`/doctors/${d.slug}`} className="reveal card group flex gap-4 bg-cream p-4 transition-transform hover:-translate-y-1">
                <div className={`relative h-28 w-28 shrink-0 overflow-hidden ${i ? "blob-b" : "blob-a"} bg-cream-2`}><Image src={d.photo} alt={d.name} fill sizes="112px" className="object-cover" /></div>
                <div><p className="text-xs font-bold text-clay">{d.specialty} · {d.experience}</p><h3 className="display text-2xl leading-tight group-hover:text-clay">{d.name}</h3><p className="mt-1 line-clamp-3 text-sm text-ink-soft">{d.bio}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="wrap grid gap-4 py-8 md:grid-cols-2" aria-label="Mission and vision">
        {[
          ["Our mission", "Care comes first.", "Our mission is to provide compassionate, accessible and responsible healthcare for women and children, while treating every patient with dignity, patience and respect.", "People first. Always.", "/img/child-checkup-2.jpeg"],
          ["Our vision", "Growing with our community.", "We want families in Kodinar and surrounding communities to have access to trusted, compassionate healthcare close to home.", "For Kodinar. For families. For generations.", "/img/newborn-care.jpeg"],
        ].map(([k, h, p, e, img]) => (
          <article key={k} className="reveal card overflow-hidden">
            <div className="relative aspect-[16/7] bg-cream-2"><Image src={img} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" /></div>
            <div className="p-6"><p className="eyebrow">{k}</p><h3 className="display mt-1 text-2xl">{h}</h3><p className="mt-2 text-ink-soft">{p}</p><p className="display mt-3 text-lg italic text-clay">{e}</p></div>
          </article>
        ))}
      </section>

      {/* Values */}
      <section className="wrap pb-8" aria-labelledby="vals">
        <p className="eyebrow">Our philosophy</p>
        <h2 id="vals" className={`${H2} mt-2`}>What we <em className="text-clay">believe in.</em></h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([t, d, bg], i) => (
            <li key={t} className={`reveal card ${bg} p-5`}><span className="display grid h-10 w-10 place-items-center rounded-full bg-white text-lg text-clay">{i + 1}</span><h3 className="display mt-3 text-xl">{t}</h3><p className="mt-1 text-sm text-ink-soft">{d}</p></li>
          ))}
        </ul>
        <p className="display mt-6 text-center text-xl italic md:text-2xl">&ldquo;Behind every patient is a family. Behind every family is a story.&rdquo;</p>
      </section>

      {/* Promise */}
      <section className="mx-3 mb-6 overflow-hidden rounded-[2rem] text-white md:mx-6" style={{ background: "linear-gradient(160deg,#7A1550 0%,#5B0E3E 55%,#4A0B32 100%)" }} aria-labelledby="promise-h">
        <div className="wrap grid items-center gap-6 py-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="folio !text-[#FFB3D1]">Our promise</p>
            <h2 id="promise-h" className="display mt-2 text-[clamp(1.6rem,3.2vw,2.6rem)] leading-tight">From the first <em className="text-[#FFB3D1]">heartbeat</em> to the first <em className="text-[#FFB3D1]">smile</em>, from childhood to <em className="text-[#FFB3D1]">motherhood</em>, we are here to care, support and walk beside you.</h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="btn btn-clay">Book an appointment</Link>
            <Link href="/doctors" className="btn btn-ghost-light">Meet our doctors</Link>
            <a href={`tel:${site.tel}`} className="btn btn-ghost-light">Call the hospital</a>
          </div>
        </div>
      </section>
    </>
  );
}
