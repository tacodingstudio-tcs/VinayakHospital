"use client";
import Link from "next/link";
import { useState } from "react";
import { DeptIcon } from "./DeptIcons";
import { departments, doctors, site } from "@/content/site";

const tone = ["from-[#ff9a76] to-[#e8504a]", "from-[#8b7bff] to-[#4a3fc0]", "from-[#2fb59a] to-[#176553]"];

// One component: pick a department, its services appear below (and a service opens its details).
export default function ServicesExplorer() {
  const [d, setD] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const dep = departments[d];
  const doc = doctors.find((x) => x.slug === dep.doctor);
  return (
    <section className="wrap pb-8" aria-label="Services by department">
      <div role="tablist" aria-label="Departments" className="grid gap-3 md:grid-cols-3">
        {departments.map((x, i) => (
          <button key={x.slug} role="tab" aria-selected={i === d} onClick={() => { setD(i); setOpen(null); }} className={`flex items-center gap-3 rounded-3xl p-3 text-left transition-all ${i === d ? `bg-gradient-to-br ${tone[i]} text-white shadow-xl` : "bg-white ring-1 ring-ink/10 hover:-translate-y-0.5"}`}>
            <span className={`h-14 w-16 shrink-0 rounded-2xl p-1 ${i === d ? "" : `bg-gradient-to-br ${tone[i]}`}`}><DeptIcon slug={x.slug} /></span>
            <span><span className="display block text-lg leading-tight">{x.name}</span><span className={`text-sm ${i === d ? "text-white/85" : "text-ink-soft"}`}>{x.items.length} services</span></span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.4fr]">
        <aside className={`self-start rounded-[2rem] bg-gradient-to-br ${tone[d]} p-6 text-white`}>
          <h2 className="display text-2xl leading-tight">{dep.name}</h2>
          <p className="mt-1 text-white/90">{dep.tagline}</p>
          <p className="mt-3 text-sm text-white/85">{dep.overview}</p>
          {doc && <p className="mt-3 text-sm">Led by <Link href={`/doctors/${doc.slug}`} className="font-bold underline">{doc.name}</Link></p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={doc ? `/contact?doctor=${encodeURIComponent(doc.name)}` : "/contact"} className="btn btn-light !px-4 !py-2 !text-sm">Book appointment</Link>
            <Link href={`/departments/${dep.slug}`} className="btn btn-ghost-light !px-4 !py-2 !text-sm">Full page →</Link>
          </div>
        </aside>
        <ul className="space-y-2">
          {dep.items.map((it, i) => (
            <li key={it.title} className="card overflow-hidden">
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-4 text-left">
                <span className="flex items-center gap-3"><span className="display text-clay">{String(i + 1).padStart(2, "0")}</span><span className="display text-lg leading-tight">{it.title}</span></span>
                <span aria-hidden className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-clay text-white transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="border-t border-ink/10 bg-cream px-4 py-3 text-[15px]">
                  <p className="text-ink-soft">{it.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm font-bold text-clay">
                    <Link href={doc ? `/contact?doctor=${encodeURIComponent(doc.name)}` : "/contact"}>Book →</Link>
                    <a href={`tel:${site.tel}`}>Call {site.phone}</a>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
