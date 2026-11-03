"use client";
import { useState } from "react";
import type { MilestoneGroup } from "@/lib/content";

const CAT: Record<string, string> = { movement: "Movement", communication: "Communication", social: "Social", learning: "Learning" };

export default function Milestones({ groups }: { groups: MilestoneGroup[] }) {
  const [id, setId] = useState(groups[0]?.id);
  const g = groups.find((x) => x.id === id) ?? groups[0];
  const cats = Array.from(new Set(g.milestones.map((m) => m.category)));
  return (
    <div className="wrap pb-8">
      <div role="tablist" aria-label="Age group" className="flex flex-wrap gap-2">
        {groups.map((x) => <button key={x.id} role="tab" aria-selected={x.id === g.id} onClick={() => setId(x.id)} className={`rounded-full px-5 py-2.5 text-sm font-semibold ${x.id === g.id ? "bg-ink text-cream" : "border border-ink/20 hover:border-ink"}`}>{x.label}</button>)}
      </div>
      <h2 className="display mt-12 text-5xl">{g.label}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2" role="tabpanel">
        {cats.map((c) => (
          <section key={c}>
            <h3 className="eyebrow">{CAT[c] ?? c}</h3>
            <ul className="mt-4 space-y-3">{g.milestones.filter((m) => m.category === c).map((m) => <li key={m.id} className="flex gap-3"><span className="text-pulse" aria-hidden>♥</span>{m.title}</li>)}</ul>
          </section>
        ))}
      </div>
      <p className="mt-14 max-w-2xl rounded-2xl bg-cream-2 p-6 text-sm text-ink-soft">Every child develops at their own pace. These are general guides, not a test. If you are worried about your child&rsquo;s development, please speak to your pediatrician.</p>
    </div>
  );
}
