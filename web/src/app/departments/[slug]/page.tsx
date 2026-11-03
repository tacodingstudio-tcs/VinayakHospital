import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { departments, doctors, site } from "@/content/site";

const clip = (s: string, n = 155) => (s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, "") + "…");
export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const d = departments.find((x) => x.slug === params.slug);
  if (!d) return {};
  return { title: d.name, description: clip(d.overview), alternates: { canonical: `/departments/${d.slug}` }, openGraph: { images: [d.image] } };
}

export default function Department({ params }: { params: { slug: string } }) {
  const d = departments.find((x) => x.slug === params.slug);
  if (!d) notFound();
  const doc = doctors.find((x) => x.slug === d.doctor);
  const emergency = d.slug === "diagnostics-emergency";

  return (
    <>
      <section className="relative flex min-h-[340px] items-end overflow-hidden bg-ink text-cream">
        <Image src={d.image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="wrap relative pb-8 pt-32">
          <Link href="/services" className="eyebrow !text-rose">← All services</Link>
          <h1 className="display mt-5 text-[clamp(1.9rem,3.6vw,3rem)]">{d.name}</h1>
          <p className="mt-3 max-w-xl text-lg text-cream/85">{d.tagline}</p>
        </div>
      </section>

      <section className="wrap grid gap-12 py-8 md:grid-cols-[1fr_1fr]">
        <p className="display reveal text-[clamp(1.2rem,2vw,1.6rem)] font-semibold leading-snug">{d.overview}</p>
        <div className="reveal space-y-6">
          {doc && (
            <Link href={`/doctors/${doc.slug}`} className="flex items-center gap-5 rounded-3xl bg-cream-2 p-5 transition-transform hover:-translate-y-1">
              <Image src={doc.photo} alt={doc.name} width={88} height={88} className="h-22 w-22 h-[88px] w-[88px] rounded-full object-cover" />
              <span><span className="eyebrow">Led by</span><span className="display block text-2xl">{doc.name}</span><span className="text-sm text-ink-soft">{doc.specialty}</span></span>
            </Link>
          )}
          <div className="flex flex-wrap gap-3">
            <Link href={doc ? `/contact?doctor=${encodeURIComponent(doc.name)}` : "/contact"} className="btn btn-clay">Book an appointment</Link>
            <a href={`tel:${site.tel}`} className="btn btn-ghost">{emergency ? "Emergency " : "Call "}{site.phone}</a>
          </div>
        </div>
      </section>

      <section className="bg-cream-2 py-8" aria-labelledby="svc-h">
        <div className="wrap">
          <h2 id="svc-h" className="eyebrow reveal">What we offer</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {d.items.map((it, i) => (
              <li key={it.title} className="reveal card p-5">
                <span className="display text-xl text-clay">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-2 text-xl">{it.title}</h3>
                <p className="mt-3 text-ink-soft">{it.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-8">
        <p className="eyebrow">Other departments</p>
        <ul className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
          {departments.filter((x) => x.slug !== d.slug).map((x) => (
            <li key={x.slug}><Link href={`/departments/${x.slug}`} className="display group flex justify-between py-4 text-xl transition-colors hover:text-clay md:text-2xl">{x.name}<span aria-hidden className="transition-transform group-hover:translate-x-2">→</span></Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
