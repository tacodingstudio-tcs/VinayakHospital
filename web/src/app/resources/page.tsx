import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { tools } from "@/content/site";

export const metadata: Metadata = {
  title: "Parent & Patient Resources",
  description: "Pregnancy calculator, week-by-week guide, hospital bag checklist, vaccination and growth trackers, milestones and a women's health library.",
  alternates: { canonical: "/resources" },
};

export default function Resources() {
  const groups = ["Pregnancy", "Child Health", "Women's Health"];
  return (
    <>
      <PageHero image="/img/womens-health-journey.jpg" eyebrow="Resources" title={<>Tools for every <em className="text-clay">stage.</em></>} intro="Free, simple guides from our team. They are general information, not medical advice. Your doctor knows your situation best." />
      <div className="wrap space-y-6 pb-8">
        {groups.map((g) => (
          <section key={g} aria-labelledby={`g-${g}`}>
            <h2 id={`g-${g}`} className="eyebrow reveal">{g}</h2>
            <ul className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
              {tools.filter((t) => t.group === g).map((t) => (
                <li key={t.href} className="reveal">
                  <Link href={t.href} className="group grid items-center gap-2 py-8 md:grid-cols-[1fr_1fr_auto]">
                    <span className="display text-3xl transition-all duration-500 group-hover:translate-x-2 group-hover:text-clay md:text-4xl">{t.title}</span>
                    <span className="text-ink-soft">{t.desc}</span>
                    <span aria-hidden className="hidden text-2xl md:block">→</span>
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
