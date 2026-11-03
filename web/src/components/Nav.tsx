"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, tools } from "@/content/site";

const groups = ["Pregnancy", "Child Health", "Women's Health"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState(false);
  const path = usePathname();
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const resBox = useRef<HTMLLIElement>(null);

  useEffect(() => { setOpen(false); setRes(false); }, [path]);

  // Resources dropdown: close on outside click or Escape.
  useEffect(() => {
    if (!res) return;
    const down = (e: MouseEvent) => { if (!resBox.current?.contains(e.target as Node)) setRes(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setRes(false); };
    document.addEventListener("mousedown", down); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [res]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button"));
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);

  const links = [{ href: "/", label: "Home" }, ...nav];
  const active = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));
  const linkCls = (on: boolean) => `rounded-full px-2.5 py-2 text-[14px] font-bold xl:px-3.5 xl:text-[15px] transition-colors hover:bg-ink/8 ${on ? "bg-ink/8 text-clay" : "text-ink"}`;

  return (
    <>
      <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-[1280px] min-[1500px]:max-w-[1480px]">
        <div className="flex h-14 items-center justify-between gap-3 rounded-full bg-white/90 pl-4 pr-2 shadow-[0_10px_40px_-12px_rgba(34,32,74,.45)] backdrop-blur-md">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
            <Image src="/img/logo.png" alt="" width={34} height={34} className="h-[34px] w-[34px] object-contain" priority />
            <span className="leading-tight">
              <span className="display block whitespace-nowrap text-[12.5px] font-bold text-ink min-[380px]:text-[14px] sm:text-[19px]">Vinayak Children &amp; Maternity</span>
              <span className="block text-[12px] font-medium tracking-[0.3em] text-[#c2185b] sm:text-[14px]">Hospital</span>
            </span>
          </Link>

          {/* Desktop links: the same set as the original site's header */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {links.map((l) =>
                l.href === "/resources" ? (
                  <li key={l.href} ref={resBox} className="relative" onMouseEnter={() => setRes(true)} onMouseLeave={() => setRes(false)}>
                    <button className={`${linkCls(active("/resources"))} flex items-center gap-1`} aria-haspopup="true" aria-expanded={res} onClick={() => setRes((o) => !o)}>
                      Resources <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`transition-transform ${res ? "rotate-180" : ""}`}><polyline points="6 9 12 15 18 9" /></svg>
                    </button>
                    <div className={`absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-3 transition-all duration-200 ${res ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                      <div className="rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-ink/10">
                        {groups.map((g) => (
                          <div key={g} className="mb-2 last:mb-0">
                            <p className="folio px-3 pb-1 pt-2 text-clay">{g}</p>
                            {tools.filter((t) => t.group === g).map((t) => <Link key={t.href} href={t.href} className="block rounded-xl px-3 py-2 text-[15px] font-semibold hover:bg-cream-2">{t.title}</Link>)}
                          </div>
                        ))}
                        <Link href="/resources" className="mt-2 block rounded-xl bg-cream-2 px-3 py-2 text-center text-sm font-bold">All resources →</Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={l.href}><Link href={l.href} className={linkCls(active(l.href))} aria-current={active(l.href) ? "page" : undefined}>{l.label}</Link></li>
                )
              )}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href={`tel:${site.tel}`} className="hidden h-10 items-center gap-2 rounded-full bg-clay/10 px-3 text-sm font-bold text-clay min-[1500px]:flex" aria-label={`Emergency, call ${site.phone}`}><span className="h-2 w-2 animate-pulse rounded-full bg-clay" aria-hidden />24/7 Emergency</a>
            <Link href="/contact" className="btn btn-clay !hidden shrink-0 !px-4 !py-2.5 sm:!inline-flex sm:!px-5"><span className="xl:hidden">Book</span><span className="hidden whitespace-nowrap xl:inline">Book Appointment</span></Link>
            <button ref={btn} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu" className="flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-cream transition-transform hover:scale-105 xl:hidden">
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Small screens: full-screen menu */}
      <div
        id="menu" ref={panel} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}
        // @ts-expect-error inert is valid HTML
        inert={!open ? "" : undefined}
        className={`fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-[#14123f] to-[#3a2f7c] pt-24 text-cream transition-[clip-path] duration-[850ms] ease-[cubic-bezier(.76,0,.24,1)] xl:hidden ${open ? "[clip-path:circle(150%_at_100%_0)]" : "[clip-path:circle(0%_at_100%_0)]"}`}
      >
        <div className="wrap grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr]">
          <nav aria-label="Menu">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <Link href={l.href} style={{ transitionDelay: open ? `${300 + i * 60}ms` : "0ms" }} className={`display block text-[clamp(2.2rem,8vw,4.6rem)] transition-all duration-700 hover:translate-x-3 hover:text-rose ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} ${active(l.href) ? "text-rose" : ""}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <aside className="space-y-4 self-end text-[15px]">
            <div className="rounded-3xl bg-white/10 p-6"><p className="folio !text-rose">Emergency · {site.emergency}</p><a href={`tel:${site.tel}`} className="display mt-2 block text-4xl">{site.phone}</a></div>
            <div className="rounded-3xl bg-white/10 p-6"><p className="folio !text-rose">Outpatient hours</p><p className="mt-2">{site.opd}</p></div>
            <div className="rounded-3xl bg-white/10 p-6"><p className="folio !text-rose">Find us</p><p className="mt-2">{site.address}</p></div>
            <Link href="/contact" className="btn btn-clay w-full">Book Appointment</Link>
          </aside>
        </div>
      </div>
    </>
  );
}
