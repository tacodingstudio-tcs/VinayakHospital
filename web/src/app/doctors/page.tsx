import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Parallax from "@/components/Parallax";
import ScrollText from "@/components/ScrollText";
import { doctors } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet Dr Pradhyuman Jadav (Pediatrician) and Dr Hetal Jadav (Gynaecologist) at Vinayak Children & Maternity Hospital, Kodinar.",
  alternates: { canonical: "/doctors" },
};

// Each doctor is a scene: the portrait stays pinned while the story scrolls past it.
export default function Doctors() {
  return (
    <>
      <PageHero image="/img/child-checkup-2.jpeg" eyebrow="The people behind the care" title={<>Every family deserves a doctor <em>who listens.</em></>} />
      {doctors.map((d, i) => (
        <section key={d.slug} className={i % 2 ? "bg-cream-2" : ""} aria-labelledby={`d-${d.slug}`}>
          <div className="wrap grid gap-6 md:grid-cols-2 md:gap-6">
            <div className={`md:sticky md:top-[64px] md:h-[calc(100svh-64px)] md:py-6 ${i % 2 ? "md:order-2" : ""}`}>
              <Parallax amount={7} className="aspect-[4/5] bg-cream-2 md:aspect-auto md:h-full">
                <Image src={d.photo} alt={d.name} fill sizes="(max-width:768px) 100vw, 45vw" className="object-cover" priority={i === 0} />
              </Parallax>
            </div>
            <div className="py-6 md:py-6">
              <p className="folio text-clay">{d.specialty} · {d.experience}</p>
              <h2 id={`d-${d.slug}`} className="display mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.92]">{d.name}</h2>
              <p className="mt-3 text-ink-soft">{d.role}</p>
              <ScrollText className="display mt-12 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-snug" text={d.bio} />
              <h3 className="folio mt-5 text-clay">Areas of care</h3>
              <ul className="rule mt-4">
                {d.care.map((c, n) => <li key={c} className="reveal flex gap-5 border-b border-ink/25 py-4 text-lg"><span className="folio w-8 pt-1 text-ink-soft">0{n + 1}</span>{c}</li>)}
              </ul>
              <Link href={d.resource.href} className="reveal group mt-12 block border border-ink/30 p-6 transition-colors hover:bg-ink hover:text-cream">
                <span className="folio text-clay group-hover:text-rose">{d.resource.label}</span>
                <span className="display mt-2 block text-2xl">{d.resource.title} →</span>
              </Link>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/doctors/${d.slug}`} className="btn btn-ghost">Full profile</Link>
                <Link href={`/contact?doctor=${encodeURIComponent(d.name)}`} className="btn btn-clay">Book an appointment</Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
