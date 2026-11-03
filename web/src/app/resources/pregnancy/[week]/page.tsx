import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WeekArt from "@/components/WeekArt";
import { getContent, type Week } from "@/lib/content";

const num = (s: string) => (/^week-(\d{1,2})$/.test(s) ? parseInt(s.slice(5), 10) : 0);

export async function generateMetadata({ params }: { params: { week: string } }): Promise<Metadata> {
  const n = num(params.week);
  return { title: `${n} Weeks Pregnant`, description: `Learn about week ${n} of pregnancy: general changes, care considerations and questions to discuss with your healthcare provider.`, alternates: { canonical: `/resources/pregnancy/week-${n}` } };
}

const List = ({ title, items }: { title: string; items: string[] }) => (
  <div className="reveal">
    <h2 className="eyebrow">{title}</h2>
    <ul className="mt-4 space-y-3">{items.map((i) => <li key={i} className="flex gap-3"><span className="text-pulse" aria-hidden>♥</span>{i}</li>)}</ul>
  </div>
);

export default async function WeekPage({ params }: { params: { week: string } }) {
  const n = num(params.week);
  if (n < 1 || n > 40) notFound();
  const w = await getContent<Week>(`pregnancy/${n}`);
  if (!w) notFound();
  return (
    <article>
      <section className="wrap grid items-center gap-12 pt-[130px] pb-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Link href="/resources/pregnancy" className="eyebrow">← All weeks</Link>
          <p className="eyebrow mt-5 !text-ink-soft">{w.trimester} · {w.trimesterRange}</p>
          <h1 className="display mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">Week <em className="text-clay">{w.week}</em></h1>
          <p className="display mt-6 text-2xl italic md:text-3xl">&ldquo;{w.emotionalLine}&rdquo;</p>
          <p className="mt-6 inline-block rounded-full border border-ink/15 px-5 py-2 text-sm">Your baby is about the size of {w.sizeComparison} <span aria-hidden>{w.sizeEmoji}</span></p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] shadow-xl"><WeekArt week={w.week} trimester={w.trimester} size={w.sizeComparison} emoji={w.sizeEmoji} /></div>
      </section>
      <section className="bg-cream-2 py-8"><div className="wrap grid gap-12 md:grid-cols-2">
        <div className="reveal"><h2 className="eyebrow">Baby&rsquo;s development</h2><p className="mt-4 text-lg leading-relaxed">{w.babyDevelopment}</p></div>
        <div className="reveal"><h2 className="eyebrow">Your body</h2><p className="mt-4 text-lg leading-relaxed">{w.maternalChanges}</p></div>
      </div></section>
      <section className="wrap grid gap-12 py-8 md:grid-cols-2">
        <List title="Wellbeing" items={w.wellbeingTopics} />
        <List title="Care considerations" items={w.careTopics} />
        <List title="Questions for your doctor" items={w.questionsForDoctor} />
        <List title="This week's checklist" items={w.checklist} />
      </section>
      <section className="wrap pb-8">
        <div className="flex items-center justify-between border-t border-ink/15 pt-8">
          {n > 1 ? <Link href={`/resources/pregnancy/week-${n - 1}`} className="btn btn-ghost">← Week {n - 1}</Link> : <span />}
          {n < 40 ? <Link href={`/resources/pregnancy/week-${n + 1}`} className="btn btn-ghost">Week {n + 1} →</Link> : <Link href="/contact" className="btn btn-clay">Book a visit</Link>}
        </div>
        <p className="mt-5 max-w-2xl text-sm text-ink-soft">General information only. It is not a diagnosis or medical advice. Please talk to your doctor about your own pregnancy.</p>
      </section>
    </article>
  );
}
