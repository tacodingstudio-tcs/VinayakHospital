"use client";
import { useState } from "react";
import { useLocal } from "@/lib/useLocal";

type M = { id: string; date: string; weightKg?: number; heightCm?: number; headCm?: number };
type State = { name: string; dob: string; items: M[] };
const METRICS = { weightKg: ["Weight", "kg"], heightCm: ["Height", "cm"], headCm: ["Head circumference", "cm"] } as const;
type Key = keyof typeof METRICS;
const fmt = (s: string) => new Date(`${s}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Chart({ items, k }: { items: M[]; k: Key }) {
  const pts = items.filter((m) => m[k] != null).map((m) => ({ x: +new Date(`${m.date}T00:00:00`), y: m[k] as number }));
  if (pts.length < 2) return <p className="py-6 text-ink-soft">Add at least two {METRICS[k][0].toLowerCase()} readings to see a chart.</p>;
  const W = 600, H = 260, P = 36;
  const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const sx = (v: number) => P + ((v - x0) / (x1 - x0 || 1)) * (W - P * 2);
  const sy = (v: number) => H - P - ((v - y0) / (y1 - y0 || 1)) * (H - P * 2);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${METRICS[k][0]} over time, from ${y0} to ${y1} ${METRICS[k][1]}`} className="w-full text-clay">
      <polyline fill="none" stroke="currentColor" strokeWidth="2.5" points={pts.map((p) => `${sx(p.x)},${sy(p.y)}`).join(" ")} />
      {pts.map((p, i) => <g key={i}><circle cx={sx(p.x)} cy={sy(p.y)} r="4.5" fill="currentColor" /><text x={sx(p.x)} y={sy(p.y) - 10} textAnchor="middle" fontSize="12" fill="#1b1a1f">{p.y}</text></g>)}
    </svg>
  );
}

export default function GrowthTracker() {
  const [s, setS, ready] = useLocal<State | null>("vinayak.growth", null);
  const [err, setErr] = useState("");
  const [k, setK] = useState<Key>("weightKg");
  const today = new Date().toISOString().slice(0, 10);
  if (!ready) return <div className="wrap min-h-[560px] pb-8" aria-busy />;

  if (!s)
    return (
      <form className="wrap max-w-xl space-y-6 pb-8" noValidate aria-label="Add child" onSubmit={(e) => {
        e.preventDefault(); const f = new FormData(e.currentTarget); const dob = String(f.get("dob") || "");
        if (!dob || dob > today) return setErr("Please enter a valid date of birth that is not in the future.");
        setS({ name: String(f.get("name") || "").trim() || "Your child", dob, items: [] });
      }}>
        <div><label htmlFor="g-name" className="eyebrow">Child&rsquo;s name (optional)</label><input id="g-name" name="name" className="field" /></div>
        <div><label htmlFor="g-dob" className="eyebrow">Date of birth *</label><input id="g-dob" name="dob" type="date" max={today} required className="field" /></div>
        <button className="btn btn-clay">Start tracking</button>
        {err && <p role="alert" className="text-clay-dark">{err}</p>}
        <p className="text-sm text-ink-soft">Saved only in this browser. Nothing is sent to us.</p>
      </form>
    );

  const sorted = [...s.items].sort((a, b) => a.date.localeCompare(b.date));
  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr("");
    const f = new FormData(e.currentTarget); const date = String(f.get("date") || "");
    const n = (x: FormDataEntryValue | null) => (x === null || x === "" ? undefined : Number(x));
    const m: M = { id: crypto.randomUUID(), date, weightKg: n(f.get("w")), heightCm: n(f.get("h")), headCm: n(f.get("hc")) };
    if (!date || date > today || date < s!.dob) return setErr("Choose a date between the date of birth and today.");
    if (m.weightKg == null && m.heightCm == null && m.headCm == null) return setErr("Enter at least one measurement.");
    if ((m.weightKg ?? 1) <= 0 || (m.weightKg ?? 0) > 60 || (m.heightCm ?? 1) <= 0 || (m.heightCm ?? 0) > 200 || (m.headCm ?? 1) <= 0 || (m.headCm ?? 0) > 70) return setErr("One of the values looks out of range. Please check it.");
    setS((p) => p && ({ ...p, items: [...p.items, m] }));
    e.currentTarget.reset();
  }

  return (
    <div className="wrap pb-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Tracking</p><p className="display text-4xl">{s.name}</p><p className="text-ink-soft">Born {fmt(s.dob)}</p></div>
        <button className="text-sm underline" onClick={() => { if (confirm("Remove this child and all measurements from this browser?")) setS(null); }}>Remove child</button>
      </div>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <form onSubmit={add} noValidate className="space-y-5" aria-label="Add measurement">
          <div><label htmlFor="m-date" className="eyebrow">Date *</label><input id="m-date" name="date" type="date" min={s.dob} max={today} defaultValue={today} required className="field" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label htmlFor="m-w" className="eyebrow">Weight kg</label><input id="m-w" name="w" type="number" step="0.01" min="0" className="field" /></div>
            <div><label htmlFor="m-h" className="eyebrow">Height cm</label><input id="m-h" name="h" type="number" step="0.1" min="0" className="field" /></div>
            <div><label htmlFor="m-hc" className="eyebrow">Head cm</label><input id="m-hc" name="hc" type="number" step="0.1" min="0" className="field" /></div>
          </div>
          <button className="btn btn-clay">Add measurement</button>
          {err && <p role="alert" className="text-clay-dark">{err}</p>}
        </form>
        <div>
          <div className="flex gap-2" role="tablist" aria-label="Measurement">
            {(Object.keys(METRICS) as Key[]).map((m) => <button key={m} role="tab" aria-selected={k === m} onClick={() => setK(m)} className={`rounded-full px-4 py-2 text-sm font-semibold ${k === m ? "bg-ink text-cream" : "border border-ink/20"}`}>{METRICS[m][0]}</button>)}
          </div>
          <Chart items={sorted} k={k} />
        </div>
      </div>
      {sorted.length > 0 && (
        <table className="mt-12 w-full text-left text-sm">
          <caption className="sr-only">Recorded measurements</caption>
          <thead><tr className="eyebrow"><th className="py-3">Date</th><th>Weight</th><th>Height</th><th>Head</th><th><span className="sr-only">Remove</span></th></tr></thead>
          <tbody>{[...sorted].reverse().map((m) => (
            <tr key={m.id} className="border-t border-ink/10"><td className="py-3">{fmt(m.date)}</td><td>{m.weightKg ?? "–"}{m.weightKg != null && " kg"}</td><td>{m.heightCm ?? "–"}{m.heightCm != null && " cm"}</td><td>{m.headCm ?? "–"}{m.headCm != null && " cm"}</td>
              <td className="text-right"><button className="underline" aria-label={`Remove measurement from ${fmt(m.date)}`} onClick={() => setS((p) => p && ({ ...p, items: p.items.filter((x) => x.id !== m.id) }))}>Remove</button></td></tr>
          ))}</tbody>
        </table>
      )}
      <p className="mt-6 max-w-2xl text-sm text-ink-soft">This is a simple record. It does not compare against growth charts or say whether a measurement is normal. Please review growth with your pediatrician. Saved only in this browser.</p>
    </div>
  );
}
