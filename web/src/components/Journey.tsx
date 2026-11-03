"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { journey } from "@/content/site";

// Horizontal photo essay. Native scrolling with snap, so it is touch-friendly, keyboard-friendly and needs no scroll-jacking.
export default function Journey() {
  const rail = useRef<HTMLUListElement>(null);
  const step = (dir: 1 | -1) => {
    const el = rail.current; if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 32), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="wrap mb-6 flex items-center justify-between">
        <p className="folio text-ink-soft">Scroll the essay →</p>
        <div className="flex gap-2">
          <button onClick={() => step(-1)} aria-label="Previous chapter" className="grid h-11 w-11 place-items-center border border-ink transition-colors hover:bg-ink hover:text-cream">←</button>
          <button onClick={() => step(1)} aria-label="Next chapter" className="grid h-11 w-11 place-items-center border border-ink transition-colors hover:bg-ink hover:text-cream">→</button>
        </div>
      </div>
      <ul ref={rail} tabIndex={0} aria-label="Five chapters of care" className="hide-scroll flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 pl-[max(1.25rem,calc((100vw-1280px)/2))] pr-8">
        {journey.map((s) => (
          <li key={s.n} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw] lg:max-w-[420px]">
            <article>
              <div className="relative aspect-[3/4] bg-cream-2">
                <Image src={s.image} alt={`${s.title} care at Vinayak Hospital`} fill sizes="(max-width:640px) 78vw, (max-width:1024px) 44vw, 420px" className="object-cover" />
              </div>
              <div className="rule mt-4 pt-3">
                <p className="folio flex justify-between text-ink-soft"><span>Chapter {s.n}</span><span>{s.eyebrow}</span></p>
                <h3 className="display mt-3 text-4xl">{s.title}</h3>
                <p className="display mt-2 text-xl italic text-clay">&ldquo;{s.line}&rdquo;</p>
                <p className="mt-3 text-ink-soft">{s.desc}</p>
                <Link href={`/departments/${s.dept}`} className="folio mt-4 inline-block border-b border-ink pb-0.5">Read on →</Link>
              </div>
            </article>
          </li>
        ))}
        <li aria-hidden className="w-4 shrink-0" />
      </ul>
    </div>
  );
}
