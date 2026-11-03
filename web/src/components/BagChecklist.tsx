"use client";
import { useLocal } from "@/lib/useLocal";
import type { BagCategory } from "@/lib/content";

export default function BagChecklist({ cats }: { cats: BagCategory[] }) {
  const [done, setDone] = useLocal<Record<string, boolean>>("vinayak.bag", {});
  const total = cats.reduce((n, c) => n + c.items.length, 0);
  const count = cats.reduce((n, c) => n + c.items.filter((i) => done[i.id]).length, 0);

  return (
    <div className="wrap pb-8">
      <div className="sticky top-[72px] z-10 -mx-2 mb-5 rounded-2xl bg-cream/90 p-4 backdrop-blur" role="status" aria-live="polite">
        <div className="flex items-center justify-between text-sm font-semibold"><span>{count} of {total} packed</span>
          <button className="underline" onClick={() => setDone({})}>Reset</button></div>
        <div className="mt-2 h-2 rounded-full bg-ink/10"><div className="h-full rounded-full bg-pulse transition-all" style={{ width: `${total ? (count / total) * 100 : 0}%` }} /></div>
      </div>
      <div className="grid gap-12 md:grid-cols-2">
        {cats.map((c) => (
          <fieldset key={c.key} className="reveal">
            <legend className="display text-3xl">{c.title}</legend>
            {c.note && <p className="mt-2 text-sm text-ink-soft">{c.note}</p>}
            <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {c.items.map((i) => (
                <li key={i.id}>
                  <label className="flex cursor-pointer items-center gap-4 py-3">
                    <input type="checkbox" checked={!!done[i.id]} onChange={(e) => setDone((p) => ({ ...p, [i.id]: e.target.checked }))} className="h-5 w-5 accent-[var(--clay)]" />
                    <span className={done[i.id] ? "text-ink/40 line-through" : ""}>{i.label}{i.optional && <span className="ml-2 text-xs text-ink-soft">optional</span>}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
      <p className="mt-12 text-sm text-ink-soft">Your ticks are saved only in this browser. Nothing is sent to us.</p>
    </div>
  );
}
