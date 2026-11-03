import LazyMap from "@/components/LazyMap";
import Image from "next/image";
import Link from "next/link";
import { DeptIcon } from "@/components/DeptIcons";
import ArticleArt from "@/components/ArticleArt";
import Reviews from "@/components/Reviews";
import Slider from "@/components/Slider";
import ToolTiles from "@/components/ToolTiles";
import Story from "@/components/Story";
import { departments, doctors, site } from "@/content/site";
import { cover, getPosts } from "@/lib/blog";
import { getContent, img, type WhCategory } from "@/lib/content";

const tone = ["from-[#ff9a76] to-[#e8504a]", "from-[#8b7bff] to-[#4a3fc0]", "from-[#2fb59a] to-[#176553]"];
const why = [
  ["Modern equipment", "Diagnostic and treatment technology for accurate diagnosis and effective care."],
  ["Affordable treatment", "Transparent pricing so quality healthcare stays accessible to every family."],
  ["Emergency support", "Round-the-clock emergency care when your family needs it most."],
  ["Trusted healthcare", "Families across Kodinar trust Vinayak for their most important health decisions."],
];
const steps = ["Choose a department", "Book an appointment", "Visit the hospital", "Receive compassionate care"];

const H2 = "display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05]";

export default async function Home() {
  const blog = await getPosts();
  const wh = await getContent<{ categories: WhCategory[] }>("womens-health");
  const covers = ["/img/womens-health-journey.jpg", "/img/pregnancy-journey.jpg", "/img/Maternity.jpg", "/img/birth-journey.jpg", "/img/newborn-care.jpeg", "/img/child-checkup-1.jpeg"];
  // One grid: our own blog posts first, then the women's health library articles.
  const cards = [
    ...blog.map((p) => ({ href: `/blog/${p.slug}`, tag: p.category, title: p.title, text: p.summary, photo: cover(p.coverImage), image: "" })),
    ...(wh?.categories ?? []).flatMap((c) => c.articles.map((a) => ({ href: `/resources/womens-health/${a.slug}`, tag: c.title, title: a.title, text: a.excerpt, photo: "", image: "" }))),
  ].map((c, i) => ({ ...c, image: c.image || img(covers[i % covers.length]) }));
  return (
    <>
      <Story />

      {/* At a glance */}
      <section className="border-b border-ink/10 bg-white" aria-label="At a glance">
        <dl className="wrap grid divide-ink/10 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {[
            ["Emergency · " + site.emergency, site.phone, `tel:${site.tel}`],
            ["Outpatient hours", site.opd, ""],
            ["Address", "Nagarpalika Stadium Road, Kodinar", site.map],
            ["Since", `${site.since} · 2 specialist doctors`, ""],
          ].map(([k, v, href]) => (
            <div key={k} className="px-5 py-4 first:pl-0">
              <dt className="folio text-clay">{k}</dt>
              <dd className="mt-1 font-bold">{href ? <a href={href} className="inline-block py-1 hover:text-clay" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{v}</a> : v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Free tools: shown prominently right after the story so visitors do not have to hunt in a menu */}
      <section className="wrap pt-8 md:pt-8" aria-labelledby="tools-h">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="eyebrow">Free for every parent &amp; patient</p><h2 id="tools-h" className={`${H2} mt-2`}>7 free tools to <em className="text-clay">guide your journey.</em></h2></div>
          <Link href="/resources" className="inline-block py-1.5 text-sm font-bold text-clay underline underline-offset-4">See all resources →</Link>
        </div>
        <div className="mt-6"><ToolTiles /></div>
      </section>

      {/* Departments with their real services */}
      <section className="wrap py-8 md:py-6" aria-labelledby="care-h">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="eyebrow">Our departments</p><h2 id="care-h" className={`${H2} mt-2`}>Care for mothers <em className="text-clay">and children.</em></h2></div>
          <Link href="/services" className="inline-block py-1.5 text-sm font-bold text-clay underline underline-offset-4">All 19 services →</Link>
        </div>
        <ul className="mt-7 grid gap-4 md:grid-cols-3">
          {departments.map((d, i) => (
            <li key={d.slug} className="reveal">
              <div className="card flex h-full flex-col overflow-hidden">
                <Link href={`/departments/${d.slug}`} className={`flex items-center gap-4 bg-gradient-to-br ${tone[i]} p-4 text-white`}>
                  <span className="h-20 w-24 shrink-0"><DeptIcon slug={d.slug} /></span>
                  <span><span className="display block text-xl leading-tight">{d.name}</span><span className="text-sm text-white/85">{d.items.length} services</span></span>
                </Link>
                <ul className="flex-1 space-y-1.5 p-4 text-[15px]">
                  {d.items.slice(0, 5).map((it) => <li key={it.title} className="flex gap-2"><span className="text-clay" aria-hidden>•</span>{it.title}</li>)}
                  {d.items.length > 5 && <li className="text-ink-soft">+ {d.items.length - 5} more</li>}
                </ul>
                <Link href={`/departments/${d.slug}`} className="border-t border-ink/10 px-4 py-3 text-sm font-bold text-clay">Explore department →</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Doctors */}
      <section className="bg-[#fde3cc] py-8 md:py-6" aria-labelledby="doc-h">
        <div className="wrap">
          <p className="eyebrow">Our doctors</p>
          <h2 id="doc-h" className={`${H2} mt-2`}>Specialists who <em className="text-clay">listen.</em></h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {doctors.map((d, i) => (
              <article key={d.slug} className="reveal card flex gap-4 p-4 sm:p-5">
                <div className={`relative h-28 w-28 shrink-0 overflow-hidden sm:h-36 sm:w-36 ${i ? "blob-b" : "blob-a"} bg-cream-2`}><Image src={d.photo} alt={d.name} fill sizes="144px" className="object-cover" /></div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-clay">{d.specialty} · {d.experience}</p>
                  <h3 className="display text-xl leading-tight sm:text-2xl">{d.name}</h3>
                  <p className="mt-1 line-clamp-3 text-sm text-ink-soft">{d.bio}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">{d.care.slice(0, 3).map((c) => <li key={c} className="rounded-full bg-cream-2 px-2.5 py-1 text-xs font-semibold">{c}</li>)}</ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href={`/doctors/${d.slug}`} className="btn btn-ghost !px-4 !py-2 !text-sm">Profile</Link>
                    <Link href={`/contact?doctor=${encodeURIComponent(d.name)}`} className="btn btn-clay !px-4 !py-2 !text-sm">Book</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vinayak + how a visit works */}
      <section className="wrap grid gap-5 py-8 md:py-6 lg:grid-cols-[1.2fr_1fr]" aria-labelledby="why-h">
        <div>
          <p className="eyebrow">Why Vinayak</p>
          <h2 id="why-h" className={`${H2} mt-2`}>Trusted by families <em className="text-clay">across Kodinar.</em></h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {why.map(([t, d], i) => (
              <li key={t} className="reveal card flex gap-3 p-4">
                <span className="display grid h-9 w-9 shrink-0 place-items-center rounded-full bg-clay/10 text-clay">{i + 1}</span>
                <span><span className="display block text-lg leading-tight">{t}</span><span className="text-sm text-ink-soft">{d}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="self-start rounded-[2rem] bg-ink p-6 text-cream shadow-xl">
          <p className="folio !text-rose">Your visit, simplified</p>
          <ol className="mt-4 space-y-3">
            {steps.map((t, i) => <li key={t} className="flex items-center gap-3"><span className="display grid h-8 w-8 shrink-0 place-items-center rounded-full bg-clay text-sm">{i + 1}</span><span className="font-bold">{t}</span></li>)}
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/contact" className="btn btn-clay !px-5 !py-2.5">Book appointment</Link>
            <a href={`tel:${site.tel}`} className="btn btn-ghost-light !px-5 !py-2.5">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Health library: blog posts + women's health articles */}
      {cards.length > 0 && (
        <section className="wrap py-8 md:py-6" aria-labelledby="blog-h">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="eyebrow">Health library</p><h2 id="blog-h" className={`${H2} mt-2`}>Read, learn <em className="text-clay">and ask.</em></h2></div>
            <div className="flex gap-4 text-sm font-bold text-clay"><Link href="/blog" className="inline-block py-1.5 underline underline-offset-4">Blog →</Link><Link href="/resources/womens-health" className="inline-block py-1.5 underline underline-offset-4">Women&rsquo;s health library →</Link></div>
          </div>
          <div className="mt-5">
            <Slider label="health articles">
              {cards.map((c) => (
                <Link key={c.href} href={c.href} className="card group flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1">
                  <div className="relative aspect-[16/9] overflow-hidden bg-cream-2">{c.photo?.includes("/blog/") && <span className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Illustration</span>}{c.photo ? <Image src={c.photo} alt="" fill sizes="(max-width:640px) 85vw, (max-width:1024px) 46vw, 32vw" className="object-cover" /> : <ArticleArt tag={c.tag} title={c.title} />}</div>
                  <div className="flex flex-1 flex-col p-4"><p className="text-xs font-bold text-clay">{c.tag}</p><h3 className="display mt-1 text-lg leading-snug group-hover:text-clay">{c.title}</h3><p className="mt-1 line-clamp-2 text-sm text-ink-soft">{c.text}</p><p className="mt-auto pt-3 text-sm font-bold text-clay">Read more →</p></div>
                </Link>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* Before you visit: answers taken from the site's own information */}
      <section className="border-y border-ink/10 bg-white py-8 md:py-8" aria-labelledby="faq-h">
        <div className="wrap grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Before you visit</p>
            <h2 id="faq-h" className={`${H2} mt-2`}>Common <em className="text-clay">questions.</em></h2>
            <p className="mt-3 text-ink-soft">Can&rsquo;t find your answer? Call us on <a href={`tel:${site.tel}`} className="inline-block py-1 font-bold text-clay underline underline-offset-2">{site.phone}</a>.</p>
          </div>
          <div className="space-y-2">
            {[
              ["How do I book an appointment?", "Use the booking form on the Contact page, call us, or message us on WhatsApp. It is a request, and our team calls you to confirm the slot."],
              ["What are your OPD hours?", `General OPD runs ${site.opd}. Emergency care is available ${site.emergency}.`],
              ["What should I do in an emergency?", `Call ${site.phone} or come straight to the hospital. Bring ID, current medications and medical records if you can, but never delay if time matters.`],
              ["Which doctors can I see?", "Dr Pradhyuman Jadav is our pediatrician (child specialist) and Dr Hetal Jadav is our gynaecologist (women's health specialist)."],
              ["Where are you located?", `${site.address}. Directions are on the Contact page.`],
            ].map(([q, a]) => (
              <details key={q} className="reveal group rounded-2xl bg-cream px-5 py-4 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">{q}<span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay text-white transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-2 text-[15px] text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* Visit: map + contact */}
      <section className="wrap pb-8 md:pb-6" aria-labelledby="visit-h">
        <div className="card grid overflow-hidden md:grid-cols-[1fr_1.3fr]">
          <div className="p-6 md:p-8">
            <p className="eyebrow">Visit us</p>
            <h2 id="visit-h" className={`${H2} mt-2`}>Come and <em className="text-clay">say hello.</em></h2>
            <dl className="mt-5 space-y-3 text-[15px]">
              <div><dt className="folio text-ink-soft">Address</dt><dd className="font-semibold">{site.address}</dd></div>
              <div><dt className="folio text-ink-soft">Outpatient</dt><dd className="font-semibold">{site.opd}</dd></div>
              <div><dt className="folio text-ink-soft">Emergency</dt><dd className="font-semibold"><a href={`tel:${site.tel}`} className="text-clay underline underline-offset-2">{site.phone}</a> · {site.emergency}</dd></div>
              <div><dt className="folio text-ink-soft">Email</dt><dd className="break-all font-semibold"><a href={`mailto:${site.email}`} className="inline-block py-1">{site.email}</a></dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/contact" className="btn btn-clay !px-5 !py-2.5">Book appointment</Link>
              <a href={site.map} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-5 !py-2.5">Get directions</a>
            </div>
          </div>
          <LazyMap className="h-64 w-full md:h-full md:min-h-[320px]" />
        </div>
      </section>
    </>
  );
}
