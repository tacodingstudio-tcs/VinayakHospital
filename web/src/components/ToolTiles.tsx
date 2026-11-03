"use client";
import Link from "next/link";
import { useState } from "react";
import { tools } from "@/content/site";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ICON: Record<string, React.ReactNode> = {
  "/resources/pregnancy-calculator": <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  "/resources/pregnancy": <><path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z" /><path d="M9 9h6M9 13h6" /></>,
  "/resources/hospital-bag-checklist": <><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M9 8V6a3 3 0 016 0v2M9 13l2 2 4-4" /></>,
  "/resources/vaccination-tracker": <path d="M15 3l6 6M17 5l-9 9-3 3v3h3l3-3 9-9M12 8l4 4M8 12l4 4" />,
  "/resources/baby-growth-tracker": <><path d="M4 20V4M4 20h16" /><path d="M7 15l4-4 3 3 5-6" /></>,
  "/resources/baby-milestones": <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  "/resources/womens-health": <path d="M12 21s-7-4.4-9-9.2C1.6 8 4 5 7 5c2 0 3.4 1 5 3 1.6-2 3-3 5-3 3 0 5.4 3 4 6.8-2 4.8-9 9.2-9 9.2z" />,
};
const STAGES = [
  { name: "Pregnancy", blurb: "From the first test to the hospital bag.", grad: "from-[#ff9a76] to-[#e8504a]" },
  { name: "Child Health", blurb: "Vaccines, growth and milestones.", grad: "from-[#8b7bff] to-[#4a3fc0]" },
  { name: "Women's Health", blurb: "Plain-language guides for every age.", grad: "from-[#2fb59a] to-[#176553]" },
];

// Stage picker: choose a stage on the left, see its tools as a list on the right.
export default function ToolTiles() {
  const [i, setI] = useState(0);
  const st = STAGES[i];
  const list = tools.filter((t) => t.group === st.name);
  return (
    <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-ink/10 md:grid-cols-[0.85fr_1.4fr]">
      <div role="tablist" aria-label="Choose a stage" className={`flex gap-2 bg-gradient-to-br ${st.grad} p-3 transition-colors duration-500 max-md:overflow-x-auto md:flex-col md:p-5`}>
        {STAGES.map((s, n) => {
          const on = n === i; const count = tools.filter((t) => t.group === s.name).length;
          return (
            <button key={s.name} role="tab" aria-selected={on} onClick={() => setI(n)} className={`shrink-0 rounded-2xl px-4 py-3 text-left transition-all md:px-5 md:py-4 ${on ? "bg-white text-ink shadow-lg" : "bg-white/10 text-white hover:bg-white/20"}`}>
              <span className="display block text-lg leading-tight md:text-2xl">{s.name}</span>
              <span className={`mt-0.5 hidden text-sm md:block ${on ? "text-ink-soft" : "text-white/80"}`}>{s.blurb}</span>
              <span className={`mt-1 block text-xs font-bold ${on ? "text-clay" : "text-white/80"}`}>{count} free {count === 1 ? "tool" : "tools"}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" aria-label={st.name} className="p-2 md:p-4"><ul className="divide-y divide-ink/10">
        {list.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-cream md:p-4">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${st.grad} text-white`}><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden {...P}>{ICON[t.href]}</svg></span>
              <span className="min-w-0 flex-1"><span className="display block text-lg leading-tight md:text-xl">{t.title}</span><span className="block text-sm text-ink-soft">{t.desc}</span></span>
              <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-clay transition-all group-hover:translate-x-1 group-hover:bg-clay group-hover:text-white">→</span>
            </Link>
          </li>
        ))}
      </ul></div>
    </div>
  );
}
