"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { departments } from "@/content/site";

// Index of departments. On mouse devices a photograph follows the cursor over the hovered row.
export default function DeptIndex() {
  const [active, setActive] = useState<number | null>(null);
  const tip = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    if (tip.current) tip.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 110}px)`;
  };

  return (
    <div onMouseMove={move} onMouseLeave={() => setActive(null)}>
      <ol className="rule">
        {departments.map((d, i) => (
          <li key={d.slug} className="border-b border-ink/80">
            <Link href={`/departments/${d.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)} className="group grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-[60px_1.3fr_1fr_auto]">
              <span className="folio text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[clamp(1.9rem,3.6vw,3rem)] leading-none transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-clay">{d.name}</span>
              <span className="text-ink-soft">{d.tagline}</span>
              <span className="folio text-ink-soft">{d.items.length} services →</span>
            </Link>
          </li>
        ))}
      </ol>
      <div ref={tip} aria-hidden className={`pointer-events-none fixed left-0 top-0 z-30 hidden h-[220px] w-[170px] overflow-hidden bg-cream-2 shadow-2xl transition-opacity duration-300 [@media(pointer:fine)]:block ${active === null ? "opacity-0" : "opacity-100"}`}>
        {departments.map((d, i) => (
          <Image key={d.slug} src={d.image} alt="" fill sizes="170px" className={`object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
    </div>
  );
}
