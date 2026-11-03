"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const KEY = "vinayak.scroll";
const read = (): Record<string, number> => { try { return JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch { return {}; } };
const write = (m: Record<string, number>) => { try { sessionStorage.setItem(KEY, JSON.stringify(m)); } catch { /* ignore */ } };

// Scroll reveals (tiny IntersectionObserver, no animation library) and scroll restoration:
// Back/Forward return to where you were, new pages start at the top.
export default function Motion() {
  const path = usePathname();
  const popped = useRef(false);
  const last = useRef<string>("");

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const onPop = () => { popped.current = true; };
    const save = () => { const m = read(); m[last.current || location.pathname + location.search] = window.scrollY; write(m); };
    let t: number | undefined;
    const onScroll = () => { window.clearTimeout(t); t = window.setTimeout(save, 120); };
    window.addEventListener("popstate", onPop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);
    return () => { window.removeEventListener("popstate", onPop); window.removeEventListener("scroll", onScroll); window.removeEventListener("pagehide", save); };
  }, []);

  useEffect(() => {
    const here = location.pathname + location.search;
    last.current = here;
    let raf = 0;
    if (popped.current) {
      popped.current = false;
      const y = read()[here] ?? 0; let tries = 0;
      const go = () => { window.scrollTo(0, y); if (Math.abs(window.scrollY - y) > 2 && tries++ < 30) raf = requestAnimationFrame(go); };
      raf = requestAnimationFrame(go);
    } else {
      window.scrollTo(0, 0);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = () => Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (reduce || !("IntersectionObserver" in window)) { els().forEach((e) => e.classList.add("in")); return () => cancelAnimationFrame(raf); }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els().forEach((e) => io.observe(e));
    const again = window.setTimeout(() => els().forEach((e) => io.observe(e)), 500); // client components that render a moment later
    return () => { cancelAnimationFrame(raf); window.clearTimeout(again); io.disconnect(); };
  }, [path]);

  return null;
}
