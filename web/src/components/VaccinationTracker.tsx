"use client";
import { useState } from "react";
import { useLocal } from "@/lib/useLocal";
import type { Vaccine } from "@/lib/content";

type State = { name: string; dob: string; given: Record<string, string> };
const add = (dob: string, days: number) => { const d = new Date(`${dob}T00:00:00`); d.setDate(d.getDate() + days); return d; };
const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function VaccinationTracker({ schedule }: { schedule: Vaccine[] }) {
  const [s, setS, ready] = useLocal<State | null>("vinayak.vacc", null);
  const [err, setErr] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date(); now.setHours(0, 0, 0, 0);

  if (!ready) return <div className="wrap min-h-[560px] pb-8" aria-busy />;

  if (!s)
    return (
      <form className="wrap max-w-xl space-y-6 pb-8" noValidate aria-label="Add child" onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget); const dob = String(f.get("dob") || "");
        if (!dob || dob > today) return setErr("Please enter a valid date of birth that is not in the future.");
        setS({ name: String(f.get("name") || "").trim() || "Your child", dob, given: {} });
      }}>
        <div><label htmlFor="v-name" className="eyebrow">Child&rsquo;s name (optional)</label><input id="v-name" name="name" className="field" /></div>
        <div><label htmlFor="v-dob" className="eyebrow">Date of birth *</label><input id="v-dob" name="dob" type="date" max={today} required className="field" /></div>
        <button className="btn btn-clay">Start tracking</button>
        {err && <p role="alert" className="text-clay-dark">{err}</p>}
        <p className="text-sm text-ink-soft">Saved only in this browser. Nothing is sent to us.</p>
      </form>
    );

  const rows = schedule.map((v) => {
    const due = add(s.dob, v.timingInDays); const given = s.given[v.id];
    return { v, due, given, status: given ? "Recorded" : due <= now ? "Due / check with doctor" : "Upcoming" };
  });
  const recorded = rows.filter((r) => r.given).length;

  return (
    <div className="wrap pb-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow">Tracking</p><p className="display text-4xl">{s.name}</p><p className="text-ink-soft">Born {fmt(new Date(`${s.dob}T00:00:00`))}</p></div>
        <div className="text-right"><p className="display text-4xl">{recorded}/{rows.length}</p><p className="text-sm text-ink-soft">recorded</p><button className="mt-2 text-sm underline" onClick={() => { if (confirm("Remove this child and all records from this browser?")) setS(null); }}>Remove child</button></div>
      </div>
      <ol className="divide-y divide-ink/10 border-y border-ink/10">
        {rows.map(({ v, due, given, status }) => (
          <li key={v.id} className="grid gap-3 py-6 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
            <div><p className="display text-2xl">{v.name}</p><p className="text-sm text-ink-soft">{v.timingLabel} · around {fmt(due)}</p></div>
            <p className={`text-sm font-semibold ${given ? "text-sage" : status.startsWith("Due") ? "text-clay-dark" : "text-ink-soft"}`}>{status}{given ? ` · ${fmt(new Date(`${given}T00:00:00`))}` : ""}</p>
            {given
              ? <button className="btn btn-ghost !py-2" onClick={() => setS((p) => p && ({ ...p, given: Object.fromEntries(Object.entries(p.given).filter(([k]) => k !== v.id)) }))}>Undo</button>
              : <button className="btn btn-clay !py-2" onClick={() => setS((p) => p && ({ ...p, given: { ...p.given, [v.id]: today } }))}>Mark given today</button>}
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl text-sm text-ink-soft">This is a general reference schedule, not medical advice. Timing and vaccines can vary. Please follow your pediatrician&rsquo;s advice. Records are saved only in this browser.</p>
    </div>
  );
}
