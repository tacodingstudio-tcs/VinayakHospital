"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";

const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const short = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

type Res = { lmp: Date; due: Date; w: number; d: number; days: number; left: number; tri: 1 | 2 | 3; out: boolean };
const TRI = ["First trimester", "Second trimester", "Third trimester"];

export default function Calculator() {
  const [res, setRes] = useState<Res | null>(null);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState<"" | "ok" | "fail">("");
  const [busy, setBusy] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const min = new Date(Date.now() - 300 * 864e5).toISOString().slice(0, 10);

  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(""); setSaved("");
    const f = new FormData(e.currentTarget);
    const lmp = new Date(`${f.get("lmp")}T00:00:00`);
    const cycle = Number(f.get("cycle")) || 28;
    const name = String(f.get("name") || "").trim();
    const mobile = String(f.get("mobile") || "").trim();
    if (isNaN(lmp.getTime())) return setErr("Please enter the first day of your last period.");
    if (lmp > new Date()) return setErr("That date is in the future.");
    if (cycle < 21 || cycle > 35) return setErr("Cycle length should be between 21 and 35 days.");
    if ((name || mobile) && !/^[6-9]\d{9}$/.test(mobile)) return setErr("To be contacted, please enter a name and a valid 10-digit mobile number, or leave both blank.");
    const due = addDays(lmp, 280 + (cycle - 28));
    const ref = new Date(); ref.setHours(0, 0, 0, 0);
    const days = Math.max(0, Math.floor((+ref - +lmp) / 864e5));
    const w = Math.floor(days / 7);
    setRes({ lmp, due, w, d: days % 7, days, left: Math.ceil((+due - +ref) / 864e5), tri: w <= 13 ? 1 : w <= 27 ? 2 : 3, out: w > 42 });
    if (name && mobile) {
      setBusy(true);
      try {
        const r = await fetch(`${site.api}/api/leads/pregnancy`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, mobile, email: f.get("email"), lastPeriodDate: f.get("lmp"), cycleLength: cycle, estimatedDueDate: due.toISOString() }),
        });
        setSaved(r.ok ? "ok" : "fail");
      } catch { setSaved("fail"); }
      setBusy(false);
    }
  }

  const wk = res ? Math.max(1, Math.min(res.w, 40)) : 1;
  const pct = res ? Math.min(res.days / 280, 1) * 100 : 0;
  const lab = "mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-ink-soft";
  const inp = "w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-base transition focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30";

  return (
    <section className="wrap pb-8">
      <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-ink/10 lg:grid-cols-[1fr_1.05fr]">
        <form onSubmit={go} noValidate className="p-5 md:p-8" aria-label="Due date calculator">
          <h2 className="display text-2xl">Your details</h2>
          <p className="mt-1 text-ink-soft">Takes ten seconds. The calculation happens in your browser.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
            <div><label htmlFor="c-lmp" className={lab}>First day of last period *</label><input id="c-lmp" name="lmp" type="date" min={min} max={today} required className={inp} /></div>
            <div><label htmlFor="c-cycle" className={lab}>Cycle length (days)</label><input id="c-cycle" name="cycle" type="number" min={21} max={35} defaultValue={28} inputMode="numeric" className={inp} /></div>
          </div>
          <details className="mt-5 rounded-2xl bg-cream-2 p-4">
            <summary className="cursor-pointer font-bold">Want our team to contact you? <span className="font-normal text-ink-soft">(optional)</span></summary>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div><label htmlFor="c-name" className={lab}>Name</label><input id="c-name" name="name" autoComplete="name" className={inp} /></div>
              <div><label htmlFor="c-mob" className={lab}>Mobile</label><input id="c-mob" name="mobile" inputMode="numeric" autoComplete="tel-national" placeholder="10 digits" className={inp} /></div>
              <div className="sm:col-span-2"><label htmlFor="c-em" className={lab}>Email</label><input id="c-em" name="email" type="email" autoComplete="email" className={inp} /></div>
            </div>
            <p className="mt-2 text-sm text-ink-soft">Leave these blank and nothing is sent anywhere.</p>
          </details>
          <button className="btn btn-clay mt-5 w-full sm:w-auto" disabled={busy}>{busy ? "Calculating…" : "Calculate my due date"} <span aria-hidden>→</span></button>
          {err && <p role="alert" className="mt-3 rounded-xl bg-clay/10 p-3 text-clay-dark">{err}</p>}
        </form>

        <div aria-live="polite" className="bg-gradient-to-br from-[#7A1550] to-[#4A0B32] p-5 text-white md:p-8">
          {!res ? (
            <div className="flex h-full min-h-[240px] flex-col justify-center">
              <p className="display text-3xl">Your result appears here.</p>
              <p className="mt-2 text-[#F8DCE9]">Enter the first day of your last period to see your estimated due date, current week and key dates.</p>
            </div>
          ) : res.out ? (
            <p className="text-[#F8DCE9]">That date looks too far back to be a current pregnancy. Please check it, or speak to your doctor.</p>
          ) : (
            <>
              <p className="folio !text-[#FFB3D1]">Estimated due date</p>
              <p className="display mt-1 text-[clamp(2rem,4vw,3.2rem)] leading-tight">{fmt(res.due)}</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-white/10 p-3"><p className="display text-3xl">{res.w}<span className="text-base">w</span> {res.d}<span className="text-base">d</span></p><p className="text-xs text-[#F8DCE9]">Now</p></div>
                <div className="rounded-2xl bg-white/10 p-3"><p className="display text-3xl">{Math.max(res.left, 0)}</p><p className="text-xs text-[#F8DCE9]">Days to go</p></div>
                <div className="rounded-2xl bg-white/10 p-3"><p className="display text-3xl">{TRI[res.tri - 1].split(" ")[0]}</p><p className="text-xs text-[#F8DCE9]">Trimester</p></div>
              </div>

              <div className="mt-5" role="progressbar" aria-label="Pregnancy progress" aria-valuemin={0} aria-valuemax={40} aria-valuenow={Math.min(res.w, 40)}>
                <div className="relative h-3 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gradient-to-r from-[#FFB3D1] to-[#ff6b6b]" style={{ width: `${pct}%` }} /></div>
                <div className="mt-1 grid grid-cols-3 text-xs text-[#F8DCE9]"><span>Week 1</span><span className="text-center">Week 14</span><span className="text-right">Week 28 → 40</span></div>
              </div>

              <ol className="mt-5 space-y-2 text-[15px]">
                {[
                  ["Last period began", res.lmp],
                  ["First trimester ends (week 13)", addDays(res.lmp, 13 * 7 + 6)],
                  ["Second trimester ends (week 27)", addDays(res.lmp, 27 * 7 + 6)],
                  ["Estimated due date (week 40)", res.due],
                ].map(([l, d]) => { const dt = d as Date; const past = dt <= new Date(); return (
                  <li key={l as string} className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2"><span className="flex items-center gap-2"><span aria-hidden className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${past ? "bg-[#FFB3D1] text-[#4A0B32]" : "border border-white/40"}`}>{past ? "✓" : ""}</span>{l as string}</span><span className="font-bold">{short(dt)}</span></li>
                ); })}
              </ol>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/resources/pregnancy/week-${wk}`} className="btn btn-light !px-5 !py-2.5">Read about week {wk} →</Link>
                <Link href="/resources/hospital-bag-checklist" className="btn btn-ghost-light !px-5 !py-2.5">Hospital bag checklist</Link>
                <Link href="/contact?doctor=Dr%20Hetal%20Jadav" className="btn btn-clay !px-5 !py-2.5">Book with Dr Hetal</Link>
              </div>
              {saved === "ok" && <p role="status" className="mt-3 text-sm text-[#F8DCE9]">Thank you. Our team may contact you.</p>}
              {saved === "fail" && <p role="status" className="mt-3 text-sm text-[#F8DCE9]">We could not save your details, but your result above is still correct.</p>}
              <p className="mt-3 text-sm text-[#F8DCE9]">This is an estimate. Your doctor will confirm your dates with an ultrasound.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
