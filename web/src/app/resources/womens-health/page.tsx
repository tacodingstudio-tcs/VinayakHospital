import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getContent, type WhCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Women's Health Library",
  description: "Women's health resources covering periods, reproductive health, pregnancy, postpartum care, wellness and menopause.",
  alternates: { canonical: "/resources/womens-health" },
};

export default async function Page() {
  const data = await getContent<{ categories: WhCategory[] }>("womens-health");
  const cats = data?.categories ?? [];
  return (
    <>
      <PageHero image="/img/womens-health-journey.jpg" eyebrow="Women's health" title={<>A library for <em className="text-clay">every age.</em></>} intro="Plain-language guides. General information only, so please talk to your gynecologist about your own health." />
      <div className="wrap space-y-6 pb-8">
        {cats.length === 0 && <p role="alert">Content is temporarily unavailable.</p>}
        {cats.map((c) => (
          <section key={c.id} aria-labelledby={`c-${c.id}`}>
            <h2 id={`c-${c.id}`} className="display reveal text-3xl md:text-5xl">{c.title}</h2>
            <p className="reveal mt-2 text-ink-soft">{c.description}</p>
            <ul className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
              {c.isBridge
                ? c.bridgeLinks.map((l) => <li key={l.url} className="reveal"><Link href={l.url} className="display flex justify-between py-5 text-2xl transition-colors hover:text-clay">{l.label}<span aria-hidden>→</span></Link></li>)
                : c.articles.map((a) => (
                  <li key={a.id} className="reveal">
                    <Link href={`/resources/womens-health/${a.slug}`} className="group grid gap-1 py-5 md:grid-cols-[1fr_1fr_auto] md:items-center">
                      <span className="display text-2xl transition-colors group-hover:text-clay">{a.title}</span>
                      <span className="text-ink-soft">{a.excerpt}</span>
                      <span aria-hidden className="hidden md:block">→</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
