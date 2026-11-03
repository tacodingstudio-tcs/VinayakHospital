import type { Metadata } from "next";
import GrowthTracker from "@/components/GrowthTracker";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Baby Growth Tracker",
  description: "Keep a simple record of your child's weight, height and head circumference and see growth over time.",
  alternates: { canonical: "/resources/baby-growth-tracker" },
};

export default function Page() {
  const info = [
    ["Every child grows differently", "Healthy babies come in many sizes. What matters most is that your child grows steadily over time, not how they compare with another child."],
    ["Measure the same way each time", "Weigh and measure at the same clinic, on the same scale, with little clothing. Head size is measured around the widest part of the head. This makes the numbers easier to compare."],
    ["Why three measurements", "Weight, length or height, and head size together give your pediatrician a fuller picture of how your child is growing and developing."],
    ["Look at the trend", "One reading says little. The line over several visits is more useful, so record after each check-up and bring the chart along."],
    ["Feeding, sleep and activity", "Growth goes hand in hand with feeding, sleep and activity. Tell your doctor about any change in appetite, energy or feeding habits."],
    ["Talk to your pediatrician if", "Your child is not gaining weight, seems to have stopped growing, is unusually sleepy or fussy, or you simply feel worried. Early advice is always welcome."],
  ];
  return (
    <>
      <PageHero image="/img/child-checkup-1.jpeg" eyebrow="Child health" title={<>Watch them <em className="text-clay">grow.</em></>} intro="Record measurements after each check-up and see them on a simple chart." />
      <GrowthTracker />
      <section className="wrap pb-8" aria-labelledby="gi-h">
        <h2 id="gi-h" className="display text-2xl md:text-3xl">Good to know about baby growth</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {info.map(([t, d]) => <div key={t} className="card p-4"><h3 className="display text-lg">{t}</h3><p className="mt-1 text-[15px] text-ink-soft">{d}</p></div>)}
        </div>
      </section>
    </>
  );
}
