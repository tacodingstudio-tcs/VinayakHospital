"use client";
import { Children, useCallback, useEffect, useRef, useState } from "react";

// Horizontal slider with native scroll-snap (swipe, trackpad, keyboard), arrow buttons and optional auto-slide.
// Auto-slide pauses on hover, focus and touch, loops at the end, and is off for reduced-motion users.
export default function Slider({ children, label, auto = 4500 }: { children: React.ReactNode; label: string; auto?: number }) {
  const rail = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [edge, setEdge] = useState<"start" | "mid" | "end">("start");
  const items = Children.toArray(children);

  const step = useCallback((dir: 1 | -1, wrap = false) => {
    const el = rail.current; if (!el) return;
    const card = el.querySelector("li"); const w = (card?.clientWidth ?? 320) + 16;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (wrap && dir === 1 && atEnd) { el.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" }); return; }
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const el = rail.current; if (!el) return;
    const on = () => setEdge(el.scrollLeft < 8 ? "start" : el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 ? "end" : "mid");
    on(); el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!auto || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => { if (!document.hidden) step(1, true); }, auto);
    return () => window.clearInterval(t);
  }, [auto, paused, step]);

  const btn = "grid h-11 w-11 place-items-center rounded-full border border-ink/25 bg-white transition-colors hover:bg-ink hover:text-cream disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink";
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
      <div className="mb-3 flex items-center justify-between">
        <p className="folio text-ink-soft" aria-live="polite">{items.length} {items.length === 1 ? "item" : "items"} · slide or use the arrows</p>
        <div className="flex gap-2">
          <button className={btn} aria-label={`Previous ${label}`} disabled={edge === "start"} onClick={() => step(-1)}>←</button>
          <button className={btn} aria-label={`Next ${label}`} disabled={edge === "end"} onClick={() => step(1)}>→</button>
        </div>
      </div>
      <ul ref={rail} tabIndex={0} aria-label={label} className="hide-scroll -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-4 pt-1">
        {items.map((c, i) => <li key={i} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.8%]">{c}</li>)}
      </ul>
    </div>
  );
}
