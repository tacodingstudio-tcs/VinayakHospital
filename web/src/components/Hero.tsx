"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const scenes = [
  { word: "heartbeat.", label: "Pregnancy", image: "/img/pregnancy-journey.jpg" },
  { word: "cry.", label: "Birth", image: "/img/birth-journey.jpg" },
  { word: "smile.", label: "Newborn", image: "/img/newborn-care.jpeg" },
  { word: "step.", label: "Childhood", image: "/img/child-checkup-1.jpeg" },
];
const PULSE = "M0,40 L330,40 L360,40 L378,8 L402,72 L424,22 L440,40 L760,40 L790,40 L808,8 L832,72 L854,22 L870,40 L1200,40";

// Cinematic opening: photographs cross-fade with slow camera motion while the headline's last word changes.
export default function Hero() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => { if (!document.hidden) setI((n) => (n + 1) % scenes.length); }, 4200);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <section className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-ink text-cream" style={{ height: "100svh", paddingTop: 64 }} aria-label="Introduction">
      {scenes.map((s, n) => (
        <div key={s.image} className={`absolute inset-0 -z-10 transition-opacity duration-[1600ms] ${n === i ? "opacity-100" : "opacity-0"}`} aria-hidden>
          <Image src={s.image} alt="" fill priority={n === 0} sizes="100vw" className="kb object-cover" style={{ animationDelay: `${-n * 4}s` }} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/25" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden />

      <div className="wrap flex flex-1 flex-col justify-center">
        <p className="folio hero-fade !text-rose">Vinayak Children &amp; Maternity Hospital · Kodinar</p>
        <h1 className="display mt-6 text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.92]">
          <span className="sr-only">From the first heartbeat, cry, smile and step.</span>
          <span aria-hidden className="hero-word-line block overflow-hidden"><span className="hero-word block">From the first</span></span>
          <span aria-hidden className="grid overflow-hidden pb-[0.12em] italic text-rose">
            {scenes.map((s, n) => (
              <span key={s.word} className={`col-start-1 row-start-1 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${n === i ? "translate-y-0 opacity-100" : "translate-y-[70%] opacity-0"}`}>{s.word}</span>
            ))}
          </span>
        </h1>
        <p className="hero-fade mt-6 max-w-lg text-lg leading-relaxed text-cream/85">Care for women and children, close to home. Every story here begins with a family.</p>
        <div className="hero-fade mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-clay">Book an appointment <span aria-hidden>→</span></Link>
          <a href={`tel:${site.tel}`} className="btn btn-ghost-light">Emergency {site.phone}</a>
        </div>
      </div>

      <div className="wrap relative pb-6">
        <svg className="w-full text-pulse" viewBox="0 0 1200 80" preserveAspectRatio="none" height="56" aria-hidden>
          <path d={PULSE} pathLength={1} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pulse-draw" />
        </svg>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
          <ol className="flex flex-wrap gap-x-6 gap-y-1" aria-label="Opening scenes">
            {scenes.map((s, n) => (
              <li key={s.label}>
                <button onClick={() => { setPlaying(false); setI(n); }} aria-current={n === i} className={`folio border-b pb-1 transition-colors ${n === i ? "border-cream text-cream" : "border-transparent text-cream/55 hover:text-cream"}`}>0{n + 1} {s.label}</button>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-5">
            <button onClick={() => setPlaying((p) => !p)} className="folio text-cream/70 hover:text-cream" aria-label={playing ? "Pause the opening slideshow" : "Play the opening slideshow"}>{playing ? "Pause" : "Play"}</button>
            <a href="#story-start" className="folio flex items-center gap-2 text-cream">Scroll to begin <span aria-hidden className="inline-block animate-bounce">↓</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
