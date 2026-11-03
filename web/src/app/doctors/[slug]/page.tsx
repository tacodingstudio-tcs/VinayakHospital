import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { departments, doctors } from "@/content/site";

const clip = (s: string, n = 155) => (s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, "") + "…");
export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const d = doctors.find((x) => x.slug === params.slug);
  if (!d) return {};
  return { title: `${d.name} · ${d.specialty}`, description: clip(d.bio), alternates: { canonical: `/doctors/${d.slug}` }, openGraph: { images: [d.photo] } };
}

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const d = doctors.find((x) => x.slug === params.slug);
  if (!d) notFound();
  const dept = departments.find((x) => x.doctor === d.slug);
  const ld = { "@context": "https://schema.org", "@type": "Physician", name: d.name, medicalSpecialty: d.specialty, image: d.photo, description: d.bio };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wrap grid items-end gap-12 pt-[130px] pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Link href="/doctors" className="eyebrow">← All doctors</Link>
          <h1 className="display mt-6 text-[clamp(1.9rem,3.6vw,3rem)]">{d.name}</h1>
          <p className="mt-4 text-xl text-clay">{d.specialty} · {d.role}</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{d.bio}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/contact?doctor=${encodeURIComponent(d.name)}`} className="btn btn-clay">Book an appointment</Link>
            {dept && <Link href={`/departments/${dept.slug}`} className="btn btn-ghost">{dept.name}</Link>}
          </div>
        </div>
        <div className="img-frame relative aspect-[4/5] rounded-[28px]">
          <Image src={d.photo} alt={d.name} fill priority sizes="(max-width:1024px) 90vw, 35vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-ink py-8 text-cream">
        <div className="wrap grid gap-12 md:grid-cols-[0.6fr_1.4fr]">
          <div><p className="eyebrow !text-rose reveal">Experience</p><p className="display reveal mt-3 text-6xl">{d.experience}</p></div>
          <div>
            <p className="eyebrow !text-rose reveal">Areas of care</p>
            <ul className="mt-6 divide-y divide-cream/15 border-y border-cream/15">
              {d.care.map((c, i) => (
                <li key={c} className="reveal display flex gap-6 py-5 text-2xl md:text-3xl"><span className="text-cream/75">0{i + 1}</span>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap py-8">
        <Link href={d.resource.href} className="reveal group block rounded-[28px] bg-cream-2 p-10 md:p-14">
          <p className="eyebrow">{d.resource.label}</p>
          <p className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)] transition-colors group-hover:text-clay">{d.resource.title} →</p>
        </Link>
      </section>
    </article>
  );
}
