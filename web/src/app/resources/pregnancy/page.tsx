import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getContent, type Week } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pregnancy Week-by-Week",
  description: "Explore your pregnancy week by week with general guidance, care considerations and questions to discuss with your doctor at every stage.",
  alternates: { canonical: "/resources/pregnancy" },
};

export default async function Pregnancy() {
  const weeks = (await getContent<Week[]>("pregnancy")) ?? [];
  const tris = Array.from(new Set(weeks.map((w) => w.trimester)));
  return (
    <>
      <PageHero image="/img/pregnancy-journey.jpg" eyebrow="Pregnancy" title={<>Forty weeks, <em className="text-clay">one at a time.</em></>} intro="General guidance for each week. Every pregnancy is different, so use this to prepare questions for your doctor." />
      <div className="wrap space-y-6 pb-8">
        {weeks.length === 0 && <p role="alert">Content is temporarily unavailable. Please try again shortly.</p>}
        {tris.map((t) => (
          <section key={t} aria-label={t}>
            <h2 className="display reveal text-3xl md:text-5xl">{t} <span className="text-lg text-ink-soft">{weeks.find((w) => w.trimester === t)?.trimesterRange}</span></h2>
            <ul className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
              {weeks.filter((w) => w.trimester === t).map((w) => (
                <li key={w.week}>
                  <Link href={`/resources/pregnancy/week-${w.week}`} className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-ink/15 transition-colors hover:border-clay hover:bg-clay hover:text-cream">
                    <span className="text-[10px] uppercase tracking-widest opacity-80">Week</span>
                    <span className="display text-3xl">{w.week}</span>
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
