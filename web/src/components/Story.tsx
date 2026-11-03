"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { StorySound } from "@/lib/storySound";
import Characters from "./StoryCharacters";

type Ch = {
  vil: number; gar: number; hos: number;
  label: string; title: string; line: string; desc: string; href: string; cta: string;
  sky: [string, string]; orb: { x: number; y: number; s: number; fill: string }; back: string; front: string; stars: number; clouds: number;
  sil: string; tree: string; win: number; birds: number; ff: number; rb: number; mist: number;
};

// Six chapters, one world. Sky, light, scenery and hills change; a different character takes the stage.
const CH: Ch[] = [
  { vil: 1, gar: 0, hos: 0, label: "Pregnancy", title: "A new beginning", line: "Every journey begins with a little hope.", desc: "Supporting mothers through pregnancy with compassionate, attentive care.", href: "/departments/gynecology-maternity-care", cta: "Pregnancy care",
    sky: ["#14123f", "#34307a"], orb: { x: 1180, y: 190, s: 0.8, fill: "#fff1c1" }, back: "#2a2870", front: "#1d1b4a", stars: 1, clouds: 0, sil: "#161437", tree: "#1d1b4a", win: 1, birds: 0, ff: 1, rb: 0, mist: 0 },
  { vil: 1, gar: 0, hos: 0, label: "Birth", title: "A moment that changes everything", line: "The first cry. The first hello.", desc: "Being there for one of life's most precious moments, with care for mother and baby.", href: "/departments/gynecology-maternity-care", cta: "Maternity care",
    sky: ["#ff8a6b", "#ffd6a8"], orb: { x: 800, y: 580, s: 1.25, fill: "#fff0b0" }, back: "#d4627a", front: "#a84a6e", stars: 0.2, clouds: 0.6, sil: "#6a2d57", tree: "#7e3560", win: 0.7, birds: 0.7, ff: 0.5, rb: 0, mist: 0.55 },
  { vil: 1, gar: 0, hos: 0, label: "Newborn", title: "Tiny hands, endless possibilities", line: "The first days are the softest.", desc: "Caring for the newest member of your family, from health checks to feeding support.", href: "/departments/pediatric-care", cta: "Newborn care",
    sky: ["#8ec5ff", "#ffe9cf"], orb: { x: 1120, y: 220, s: 1, fill: "#ffe58a" }, back: "#8fd8b0", front: "#5fbf92", stars: 0, clouds: 1, sil: "#4a9a78", tree: "#3c9272", win: 0, birds: 1, ff: 0, rb: 0, mist: 0 },
  { vil: 1, gar: 0, hos: 0, label: "Childhood", title: "One healthy milestone at a time", line: "Look at them go.", desc: "Vaccinations, check-ups and everyday care as your child grows.", href: "/departments/pediatric-care", cta: "Pediatric care",
    sky: ["#59b6ff", "#d6f1ff"], orb: { x: 470, y: 180, s: 1, fill: "#fff3a6" }, back: "#7ad39e", front: "#43b17b", stars: 0, clouds: 1, sil: "#2e9663", tree: "#2a8f5c", win: 0, birds: 1, ff: 0, rb: 0.7, mist: 0 },
  { vil: 1, gar: 0, hos: 0, label: "Women's health", title: "Care doesn't end with motherhood", line: "Because she matters too.", desc: "Check-ups and guidance for women through every stage of life.", href: "/services", cta: "All services",
    sky: ["#ffb27a", "#ffe7c2"], orb: { x: 1160, y: 320, s: 1.1, fill: "#ffd36b" }, back: "#a8d68a", front: "#6fb261", stars: 0, clouds: 0.8, sil: "#4d8f49", tree: "#3f8a45", win: 0, birds: 0.8, ff: 0, rb: 0, mist: 0 },
  { vil: 0, gar: 1, hos: 1, label: "Together", title: "A lifetime of care", line: "Your family's health isn't a single moment.", desc: "We are here for every chapter. Come and say hello.", href: "/contact", cta: "Book an appointment",
    sky: ["#ff7f7a", "#ffd0a0"], orb: { x: 800, y: 440, s: 1.5, fill: "#ffe07a" }, back: "#c95f7e", front: "#7c3f77", stars: 0, clouds: 0.5, sil: "#552d63", tree: "#65366f", win: 1, birds: 0.5, ff: 0.8, rb: 0, mist: 0 },
];
const N = CH.length;
const AUTO_MS = 7500;

const rand = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
const STARS = Array.from({ length: 70 }, () => ({ x: rand() * 1600, y: rand() * 520, r: 1 + rand() * 2.2, d: rand() * 3 }));
const FIREFLIES = Array.from({ length: 16 }, () => ({ x: 80 + rand() * 1440, y: 540 + rand() * 190, d: rand() * 4 }));

function House({ x, w, h }: { x: number; w: number; h: number }) {
  return (
    <g>
      <rect className="s-sil" x={x} y={700 - h} width={w} height={h} />
      <polygon className="s-sil" points={`${x - 6},${700 - h} ${x + w / 2},${700 - h - 26} ${x + w + 6},${700 - h}`} />
      <g className="s-win"><rect x={x + w * 0.22} y={700 - h + 16} width="10" height="12" rx="2" fill="#ffd36b" /><rect x={x + w * 0.58} y={700 - h + 16} width="10" height="12" rx="2" fill="#ffd36b" /></g>
    </g>
  );
}
function Temple({ x }: { x: number }) {
  return (
    <g className="s-sil">
      <rect x={x - 34} y="640" width="68" height="60" />
      <polygon points={`${x - 32},640 ${x + 32},640 ${x + 22},602 ${x - 22},602`} /><polygon points={`${x - 22},602 ${x + 22},602 ${x + 14},566 ${x - 14},566`} />
      <polygon points={`${x - 14},566 ${x + 14},566 ${x},508`} /><rect x={x - 1} y="486" width="2" height="24" /><polygon points={`${x + 1},488 ${x + 16},494 ${x + 1},500`} />
      <g className="s-win"><rect x={x - 8} y="664" width="16" height="36" rx="8" fill="#ffd36b" /></g>
    </g>
  );
}
function Palm({ x, h, sway = 0 }: { x: number; h: number; sway?: number }) {
  const top = 700 - h;
  return (
    <g className="sway" style={{ animationDelay: `${sway}s` }}>
      <path className="s-treestroke" d={`M${x},700 C${x + 6},${700 - h * 0.5} ${x - 10},${700 - h * 0.8} ${x + 8},${top}`} strokeWidth="9" fill="none" strokeLinecap="round" />
      {[-70, -35, 0, 35, 70].map((a) => <ellipse key={a} className="s-tree" cx={x + 8 + Math.sin((a * Math.PI) / 180) * 34} cy={top - Math.cos((a * Math.PI) / 180) * 8 + 6} rx="40" ry="8" transform={`rotate(${a - 90 + (a < 0 ? 0 : 0)} ${x + 8} ${top})`} />)}
      <circle className="s-tree" cx={x + 8} cy={top + 4} r="8" />
    </g>
  );
}
function Tree({ x, r }: { x: number; r: number }) {
  return <g><rect className="s-tree" x={x - 4} y={700 - r * 1.1} width="8" height={r * 1.1} /><circle className="s-tree" cx={x} cy={700 - r * 1.4} r={r} /><circle className="s-tree" cx={x - r * 0.7} cy={700 - r * 1.1} r={r * 0.7} /><circle className="s-tree" cx={x + r * 0.7} cy={700 - r * 1.1} r={r * 0.7} /></g>;
}

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const snd = useRef<StorySound | null>(null);
  const chapterRef = useRef(0);
  const autoRef = useRef(true);       // false only when the visitor presses Pause
  const goRef = useRef<(i: number) => void>(() => {});
  const curRef = useRef(0);
  const [auto, setAuto] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [hint, setHint] = useState(true);

  const startSound = async () => {
    if (!snd.current) snd.current = new StorySound();
    snd.current.setChapter(chapterRef.current);
    await snd.current.enable();
    setSoundOn(true); setHint(false);
    try { localStorage.setItem("vinayak.sound", "on"); } catch { /* ignore */ }
  };

  // Browsers only allow audio after a user gesture, so sound starts on the first click, tap or key press anywhere.
  useEffect(() => {
    let pref: string | null = null;
    try { pref = localStorage.getItem("vinayak.sound"); } catch { /* ignore */ }
    if (pref === "off") { setHint(false); return; }
    const evs = ["pointerdown", "keydown", "touchend"];
    const remove = () => evs.forEach((n) => window.removeEventListener(n, go));
    function go(e: Event) { if ((e.target as Element | null)?.closest?.(".s-ctl")) return; remove(); void startSound(); }
    evs.forEach((n) => window.addEventListener(n, go));
    return remove;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const q = <T extends Element>(s: string) => el.querySelector<T>(s)!;
    const qa = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const chars = qa<SVGGElement>(".s-char"), caps = qa<HTMLElement>(".s-cap"), dots = qa<HTMLButtonElement>(".s-dot");
    gsap.set(chars, { autoAlpha: 0, y: 30 }); gsap.set(chars[0], { autoAlpha: 1, y: 0 });
    gsap.set(caps, { opacity: 0 }); gsap.set(caps[0], { opacity: 1 });
    const live = (k: number) => { chars.forEach((g, n) => g.toggleAttribute("data-off", n !== k)); caps.forEach((c, n) => { c.style.pointerEvents = n === k ? "auto" : "none"; if (n === k) c.removeAttribute("inert"); else c.setAttribute("inert", ""); }); };
    live(0);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const stops = [q(".s-stop0"), q(".s-stop1")];
      const orb = q(".s-orb"), orbFill = q(".s-orb-c"), back = q(".s-back"), front = q(".s-front");
      const stars = q(".s-stars"), clouds = q(".s-clouds"), backG = q(".s-backg"), frontG = q(".s-frontg"), midG = q(".s-midg"), hero = q(".s-hero");
      const sil = qa(".s-sil"), tree = qa(".s-tree"), treeStroke = qa(".s-treestroke");
      const village = q(".s-village"), garden = q(".s-garden"), hosp = q(".s-hosp"), pond = q(".s-pond");
      gsap.set([garden, hosp], { opacity: 0 });
      const win = qa(".s-win"), birds = q(".s-birds"), ff = q(".s-ff"), rb = q(".s-rb"), mist = q(".s-mist");
      const c0 = CH[0];
      gsap.set(orb, { x: c0.orb.x, y: c0.orb.y, scale: c0.orb.s, transformOrigin: "0 0" });
      gsap.set([clouds, birds, rb, mist], { opacity: 0 });
      gsap.set(sil, { fill: c0.sil }); gsap.set(tree, { fill: c0.tree }); gsap.set(treeStroke, { stroke: c0.tree });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
      tl.to(hero, { opacity: 0, y: -40, duration: 0.5 }, 0.15);
      for (let i = 1; i < N; i++) {
        const c = CH[i], t = i - 0.55;
        tl.to(stops[0], { attr: { "stop-color": c.sky[0] }, duration: 0.9 }, t)
          .to(stops[1], { attr: { "stop-color": c.sky[1] }, duration: 0.9 }, t)
          .to(orb, { x: c.orb.x, y: c.orb.y, scale: c.orb.s, duration: 0.9 }, t)
          .to(orbFill, { attr: { fill: c.orb.fill }, duration: 0.9 }, t)
          .to(back, { attr: { fill: c.back }, duration: 0.9 }, t)
          .to(front, { attr: { fill: c.front }, duration: 0.9 }, t)
          .to(sil, { fill: c.sil, duration: 0.9 }, t)
          .to(tree, { fill: c.tree, duration: 0.9 }, t)
          .to(treeStroke, { stroke: c.tree, duration: 0.9 }, t)
          .to(win, { opacity: c.win, duration: 0.9 }, t)
          .to(stars, { opacity: c.stars, duration: 0.9 }, t)
          .to(clouds, { opacity: c.clouds, duration: 0.9 }, t)
          .to(birds, { opacity: c.birds, duration: 0.9 }, t)
          .to(ff, { opacity: c.ff, duration: 0.9 }, t)
          .to(rb, { opacity: c.rb, duration: 0.9 }, t)
          .to(mist, { opacity: c.mist, duration: 0.9 }, t)
          .to(village, { opacity: c.vil, duration: 0.9 }, t)
          .to(garden, { opacity: c.gar, duration: 0.9 }, t)
          .to(hosp, { opacity: c.hos, duration: 0.9 }, t)
          .to(pond, { opacity: c.label === "Women's health" ? 1 : 0, duration: 0.9 }, t)
          .to(backG, { x: -50 * i, duration: 1 }, t)
          .to(midG, { x: -80 * i, duration: 1 }, t)
          .to(frontG, { x: -110 * i, duration: 1 }, t)
          .to(chars[i - 1], { autoAlpha: 0, y: 26, duration: 0.4 }, t)
          .fromTo(chars[i], { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, duration: 0.6 }, t + 0.3)
          .to(caps[i - 1], { opacity: 0, y: -18, duration: 0.3 }, t)
          .fromTo(caps[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, t + 0.35);
      }

      // The story plays by itself inside its own screen (no scroll-lock): it moves to the next chapter every few seconds,
      // loops at the end, and the page scrolls past it normally.
      const goTo = (i: number, dur?: number) => {
        const k = ((i % N) + N) % N;
        const from = curRef.current;
        curRef.current = k; chapterRef.current = k;
        dots.forEach((d, n) => d.setAttribute("aria-current", String(n === k)));
        live(k);
        if (k !== from) { snd.current?.setChapter(k); snd.current?.cue("chapter"); }
        tl.tweenTo(k === 0 ? 0 : k + 0.4, { duration: dur ?? (k === 0 ? 2.4 : 1.7), ease: "power2.inOut", overwrite: true });
      };
      goRef.current = (i) => goTo(i, 1.3);
      let visible = true;
      const sync = () => el.classList.toggle("s-paused", !visible || document.hidden);
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; snd.current?.setActive(visible); sync(); }, { threshold: 0.05 });
      io.observe(el);
      document.addEventListener("visibilitychange", sync);
      const timer = window.setInterval(() => {
        if (!autoRef.current || document.hidden || !visible) return;
        goTo(curRef.current + 1);
      }, AUTO_MS);
      return () => { window.clearInterval(timer); io.disconnect(); document.removeEventListener("visibilitychange", sync); tl.kill(); };
    }, el);
    return () => { mm.revert(); snd.current?.dispose(); snd.current = null; };
  }, []);

  // Sounds follow the picture: each cue fires from the animation it belongs to (heartbeat pulse, footsteps, kicks, tears...).
  useEffect(() => {
    const svg = root.current?.querySelector("svg"); if (!svg) return;
    const MAP: Record<string, string> = { lub: "lub", stepL: "step", hop: "hop", kick: "kick", eo: "open", swing: "swing", floatup: "heart", tear: "tear" };
    const on = (e: Event) => {
      const ev = e as AnimationEvent; const cue = MAP[ev.animationName];
      if (!cue || !snd.current?.on) return;
      const owner = (ev.target as Element).closest?.(".s-char");
      if (owner && Number(owner.getAttribute("data-i")) !== chapterRef.current) return;
      snd.current.cue(cue);
    };
    svg.addEventListener("animationiteration", on);
    return () => svg.removeEventListener("animationiteration", on);
  }, []);

  const scrollToChapter = (i: number) => goRef.current(i);

  const toggleSound = async () => {
    if (soundOn) {
      snd.current?.disable(); setSoundOn(false); setHint(false);
      try { localStorage.setItem("vinayak.sound", "off"); } catch { /* ignore */ }
      return;
    }
    await startSound();
  };

  const ctl = "s-ctl grid h-11 w-11 place-items-center rounded-full bg-ink/65 text-white backdrop-blur transition-transform hover:scale-105 sm:h-auto sm:w-auto sm:grid-flow-col sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm sm:font-bold";

  return (
    <section ref={root} id="story-start" aria-label="A family's story, in six chapters">
      <div className="s-pin relative overflow-hidden bg-ink text-white" style={{ height: "100svh", minHeight: 600 }}>
        <svg className="absolute inset-x-0 -top-[19%] h-[119%] w-full md:inset-0 md:top-0 md:h-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
          <defs>
            <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop className="s-stop0" offset="0" stopColor={CH[0].sky[0]} /><stop className="s-stop1" offset="1" stopColor={CH[0].sky[1]} /></linearGradient>
            <radialGradient id="glowG"><stop offset="0" stopColor="#fff1c9" stopOpacity="0.95" /><stop offset="0.45" stopColor="#ffc7a1" stopOpacity="0.5" /><stop offset="1" stopColor="#ffc7a1" stopOpacity="0" /></radialGradient>
            <radialGradient id="auraG"><stop offset="0" stopColor="#ffe3c2" stopOpacity="0.55" /><stop offset="0.6" stopColor="#ffc7a1" stopOpacity="0.16" /><stop offset="1" stopColor="#ffc7a1" stopOpacity="0" /></radialGradient>
            <radialGradient id="orbG"><stop offset="0" stopColor="#fff" stopOpacity="0.9" /><stop offset="0.3" stopColor="#fff" stopOpacity="0.28" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          </defs>
          <rect width="1600" height="900" fill="url(#skyG)" />
          <g className="s-stars">{STARS.map((s, i) => <circle key={i} className="tw" cx={s.x} cy={s.y} r={s.r} fill="#fff" style={{ animationDelay: `${s.d}s` }} />)}</g>
          <g className="s-orb"><g className="spin" opacity=".28">{Array.from({ length: 14 }, (_, i) => <polygon key={i} points="0,-340 14,0 -14,0" fill="#fff" transform={`rotate(${(360 / 14) * i})`} />)}</g><circle r="260" fill="url(#orbG)" /><circle className="s-orb-c" r="62" fill={CH[0].orb.fill} /></g>
          <g className="s-rb" fill="none" strokeWidth="13" opacity="0">{["#ff6b6b", "#ffa94d", "#ffe066", "#69db7c", "#4dabf7", "#9775fa"].map((c, i) => <path key={c} d={`M${800 - (400 - i * 14)},720 A${400 - i * 14},${400 - i * 14} 0 0 1 ${800 + (400 - i * 14)},720`} stroke={c} strokeOpacity=".6" />)}</g>
          <g className="s-clouds" opacity="0">
            {[[300, 190, 1], [1180, 140, 0.8], [1400, 300, 0.65]].map(([x, y, sc], i) => (
              <g key={i} className="drift" style={{ animationDuration: `${22 + i * 7}s` }}><g transform={`translate(${x},${y}) scale(${sc})`} fill="#fff" opacity=".92"><ellipse cx="0" cy="0" rx="90" ry="30" /><ellipse cx="-40" cy="-22" rx="46" ry="34" /><ellipse cx="22" cy="-30" rx="54" ry="40" /></g></g>
            ))}
          </g>
          <g className="s-birds" opacity="0">
            {[[0, 210, 0], [0, 290, -9], [0, 150, -15]].map(([, y, d], i) => (
              <g key={i} className="birdfly" style={{ animationDelay: `${d}s`, animationDuration: `${26 + i * 5}s` }}>
                {[0, 1, 2].map((b) => <g key={b} transform={`translate(${b * 46},${y + (b % 2) * 22})`}><path className="flap2" d="M0,0 q9,-11 18,0 q9,-11 18,0" fill="none" stroke="#2b2750" strokeWidth="2.6" strokeLinecap="round" /></g>)}
              </g>
            ))}
          </g>
          <g className="s-backg"><path className="s-back" d="M-400,720 C-150,560 100,600 350,640 C600,680 800,540 1050,580 C1300,620 1500,600 1800,640 C2000,660 2200,600 2400,640 L2400,900 L-400,900Z" fill={CH[0].back} /></g>
          <g className="s-midg">
            <g className="s-mist" opacity="0">{[[300, 660, 380], [900, 690, 460], [1400, 650, 340]].map(([x, y, rx], i) => <ellipse key={i} className="drift" style={{ animationDuration: `${30 + i * 8}s` }} cx={x} cy={y} rx={rx} ry="34" fill="#fff" opacity=".4" />)}</g>
            <g className="s-village">
            <House x={110} w={64} h={48} /><House x={190} w={54} h={64} /><Temple x={330} /><House x={400} w={70} h={44} /><House x={486} w={52} h={56} />
            <House x={1130} w={60} h={52} /><House x={1210} w={72} h={42} /><Temple x={1370} /><House x={1440} w={58} h={60} />
            <Palm x={590} h={210} /><Palm x={1020} h={170} sway={-1.5} /><Palm x={250} h={160} sway={-0.8} /><Palm x={1290} h={190} sway={-2.2} />
            <Tree x={660} r={30} /><Tree x={940} r={26} /><Tree x={80} r={34} /><Tree x={1530} r={32} />
            </g>

            {/* Chapter 6: a blooming garden */}
            <g className="s-garden"><g transform="translate(400,0)">
              {[[170, 170], [1490, 190]].map(([x, h], k) => (
                <g key={k}>
                  <ellipse cx={x} cy="704" rx="60" ry="9" fill="#000" opacity=".16" />
                  <path d={`M${x - 20},706 C${x - 8},${700 - h * 0.5} ${x - 8},${700 - h * 0.8} ${x - 5},${700 - h} L${x + 5},${700 - h} C${x + 9},${700 - h * 0.8} ${x + 9},${700 - h * 0.5} ${x + 20},706 Z`} fill="#6b4a3a" />
                  <path d={`M${x},${700 - h * 0.62} C${x - 30},${700 - h * 0.7} ${x - 52},${700 - h * 0.82} ${x - 62},${700 - h * 0.98} M${x},${700 - h * 0.66} C${x + 30},${700 - h * 0.74} ${x + 52},${700 - h * 0.86} ${x + 64},${700 - h * 1.0}`} stroke="#6b4a3a" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <g className="sway" style={{ animationDelay: `${k * 0.9}s` }}>{[[0, -h - 38, 78], [-66, -h + 6, 58], [66, -h + 6, 58], [-34, -h - 76, 50], [38, -h - 72, 52], [-92, -h - 28, 40], [94, -h - 24, 40]].map(([dx, dy, r], n) => <circle key={n} cx={x + dx} cy={700 + dy} r={r} fill={["#ffc2d9", "#ff9fc3", "#ffd6e6"][n % 3]} />)}</g>
                  {[0, 1, 2, 3].map((n) => <ellipse key={n} className="petal" cx={x - 40 + n * 28} cy={700 - h - 20} rx="5" ry="3" fill="#ffd6e6" style={{ animationDelay: `${n * 1.2 + k}s`, ["--dx" as string]: `${(n % 2 ? 1 : -1) * 36}px` } as React.CSSProperties} />)}
                </g>
              ))}
              {Array.from({ length: 20 }, (_, i) => { const x = 40 + i * 78 + (i % 3) * 14; const h = 70 + ((i * 41) % 90); return (
                <g key={i} className="sway" style={{ animationDelay: `${(i % 7) * 0.35}s` }}><line x1={x} y1="708" x2={x} y2={708 - h} stroke="#2f8f4e" strokeWidth="4" strokeLinecap="round" />
                  {[0, 1, 2, 3, 4].map((n) => <ellipse key={n} cx={x} cy={708 - h - 11} rx="6" ry="12" fill={["#ff6b8f", "#fff", "#ffd36b", "#c9a0ff"][i % 4]} transform={`rotate(${n * 72} ${x} ${708 - h})`} />)}
                  <circle cx={x} cy={708 - h} r="5" fill="#ffb300" /></g>
              ); })}
              {[[300, 560], [900, 520], [1250, 600]].map(([x, y], k) => <g key={k} className="fly" style={{ animationDelay: `${-k * 3}s` }}><circle cx={x} cy={y} r="6" fill="#fff" opacity=".7" /></g>)}
            </g></g>

            {/* Chapter 6: lanterns and fireworks over the garden */}
            <g className="s-hosp"><g transform="translate(400,0)">
              <g>
                <circle cx="1180" cy="520" r="250" fill="#fff" opacity=".14" />
                <rect x="996" y="548" width="126" height="158" rx="12" fill="#fff0f5" /><rect x="1238" y="548" width="126" height="158" rx="12" fill="#fff0f5" />
                <rect x="1100" y="478" width="160" height="228" rx="14" fill="#ffffff" />
                <path d="M1110,478 A70,70 0 0 1 1250,478 Z" fill="#ff9fc3" /><path d="M1130,478 A50,50 0 0 1 1230,478" stroke="#fff" strokeWidth="4" fill="none" opacity=".6" />
                <rect x="1176" y="380" width="8" height="38" fill="#c9a0ff" /><path className="bob" d="M1180,384 C1172,370 1156,376 1160,388 C1163,396 1175,401 1180,406 C1185,401 1197,396 1200,388 C1204,376 1188,370 1180,384Z" fill="#ff6b8f" />
                <circle cx="1180" cy="530" r="30" fill="#fff" stroke="#2fb59a" strokeWidth="5" /><path d="M1180,512 v36 M1162,530 h36" stroke="#2fb59a" strokeWidth="9" strokeLinecap="round" />
                {[[1022, 574], [1060, 574], [1022, 634], [1060, 634], [1264, 574], [1302, 574], [1264, 634], [1302, 634]].map(([x, y], i) => <path key={i} className="tw" style={{ animationDelay: `${(i % 5) * 0.5}s` }} d={`M${x},${Number(y) + 40} v-22 a15,15 0 0 1 30,0 v22 Z`} fill="#ffd36b" />)}
                {[1120, 1210].map((x, i) => <path key={i} className="tw" style={{ animationDelay: `${i * 0.7}s` }} d={`M${x},${602} v-22 a14,14 0 0 1 28,0 v22 Z`} fill="#ffd36b" />)}
                <path d="M1150,706 V646 a30,30 0 0 1 60,0 V706 Z" fill="#c9a0ff" /><path d="M1162,706 V650 a18,18 0 0 1 36,0 V706 Z" fill="#fff3c2" />
                <rect x="1130" y="700" width="100" height="10" rx="3" fill="#e8d6f7" />
                <path d="M1152,712 L1208,712 L1280,800 L1080,800 Z" fill="#f3d3a8" opacity=".9" />
                {[1000, 1034, 1068, 1296, 1330, 1364].map((x, i) => <g key={i}><circle cx={x} cy="702" r="9" fill={["#ff8fb1", "#ffd36b", "#fff"][i % 3]} /><circle cx={x} cy="702" r="3.5" fill="#ffb300" /></g>)}
              </g>
              <path d="M-160,120 C200,260 700,190 1200,300" stroke="#fff" strokeWidth="3" fill="none" opacity=".7" />
              {Array.from({ length: 12 }, (_, i) => { const x = -120 + i * 100; const y = 140 + Math.sin(i * 0.5) * 20 + i * 14; return <g key={i}><line x1={x} y1={y} x2={x} y2={y + 14} stroke="#fff" strokeOpacity=".6" /><circle className="tw" style={{ animationDelay: `${(i % 5) * 0.4}s` }} cx={x} cy={y + 24} r="10" fill={["#ffd36b", "#ff8fb1", "#9ff0d4", "#c9a0ff"][i % 4]} /></g>; })}
              {[[260, 150, "#ffd36b"], [760, 110, "#ff8fb1"], [1240, 160, "#9ff0d4"]].map(([x, y, c], k) => (
                <g key={k} className="burst" style={{ animationDelay: `${k * 0.9}s`, transformOrigin: `${x}px ${y}px` }}>{Array.from({ length: 12 }, (_, n) => <line key={n} x1={x} y1={y} x2={Number(x) + Math.cos((n * Math.PI) / 6) * 58} y2={Number(y) + Math.sin((n * Math.PI) / 6) * 58} stroke={String(c)} strokeWidth="4" strokeLinecap="round" />)}<circle cx={x} cy={y} r="6" fill={String(c)} /></g>
              ))}
            </g></g>
          </g>
          <g className="s-ff" opacity="0">{FIREFLIES.map((f, i) => <g key={i} className="fly" style={{ animationDelay: `${-f.d * 3}s`, animationDuration: `${12 + (i % 5) * 3}s` }}><circle className="tw" cx={f.x} cy={f.y} r="3.2" fill="#ffe98a" style={{ animationDelay: `${f.d}s` }} /><circle cx={f.x} cy={f.y} r="9" fill="#ffe98a" opacity=".25" /></g>)}</g>
          <g className="s-frontg">
            <path className="s-front" d="M-400,900 L-400,704 C-100,650 200,696 500,704 C800,712 1100,660 1400,706 C1700,740 2000,690 2400,712 L2400,900Z" fill={CH[0].front} />
            {/* Chapter 5: a lotus pond */}
            <g className="s-pond" opacity="0"><g transform="translate(440,0)">
              <ellipse cx="1180" cy="800" rx="250" ry="48" fill="#4fb8c4" /><ellipse cx="1180" cy="794" rx="236" ry="38" fill="#7fd6dc" /><ellipse cx="1120" cy="786" rx="90" ry="9" fill="#fff" opacity=".35" />
              {[[1070, 806, 1], [1190, 818, 0.85], [1290, 800, 1.1], [1130, 776, 0.7]].map(([x, y, k], i) => (
                <g key={i} className="bob" style={{ animationDelay: `${i * 0.6}s` }}>
                  <ellipse cx={x} cy={y} rx={34 * Number(k)} ry={10 * Number(k)} fill="#2f9e5b" />
                  {i < 3 && <g transform={`translate(${x},${Number(y) - 8}) scale(${k})`}>{[-50, -25, 0, 25, 50].map((a) => <ellipse key={a} cx="0" cy="-14" rx="8" ry="16" fill={i % 2 ? "#ffc2d9" : "#ff9fc3"} transform={`rotate(${a})`} />)}<circle r="6" fill="#ffd36b" /></g>}
                </g>
              ))}
              <g className="fly"><g transform="translate(1100,700)"><ellipse rx="14" ry="2.5" fill="#4a3fc0" /><ellipse cx="-4" cy="-6" rx="10" ry="4" fill="#fff" opacity=".7" /><ellipse cx="4" cy="-6" rx="10" ry="4" fill="#fff" opacity=".7" /></g></g>
            </g></g>
            {Array.from({ length: 26 }, (_, i) => { const x = -300 + i * 100 + (i % 3) * 22; const y = 730 + ((i * 37) % 120); return <g key={i} className="sway" style={{ animationDelay: `${(i % 6) * 0.4}s` }}><line x1={x} y1={y} x2={x} y2={y + 14} stroke="#ffffff" strokeOpacity=".35" strokeWidth="2" /><circle cx={x} cy={y} r="5" fill={["#ff8fb1", "#ffd36b", "#fff"][i % 3]} opacity=".9" /></g>; })}
          </g>
          <Characters />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/45 to-transparent" aria-hidden />

        {/* Opening headline: fades as the story begins */}
        <div className="s-hero pointer-events-none absolute inset-x-0 top-[92px] px-5 text-center md:top-[96px]">
          <p className="folio hero-fade !text-rose">Vinayak Children &amp; Maternity Hospital · Kodinar</p>
          <h1 className="display mx-auto mt-4 max-w-[14ch] text-[clamp(1.9rem,6.2vw,6rem)] leading-[0.98] text-white">Every life begins with a <em className="text-rose">heartbeat.</em></h1>
          <p className="hero-fade mt-4 text-sm text-white/85">Sit back, the story plays by itself ↓</p>
        </div>

        {/* Chapter captions */}
        <div className="story-cards absolute inset-x-0 bottom-0 px-4 pb-16 md:pb-20">
          <div className="relative mx-auto h-[168px] max-w-[1280px] sm:h-[230px] md:h-[250px]">
            {CH.map((c, i) => (
              <div key={c.label} className="s-cap absolute inset-0 flex items-end" style={{ opacity: i === 0 ? 1 : 0 }}>
                <div className="max-w-[460px] rounded-[2rem] bg-ink/75 p-6 text-white shadow-2xl backdrop-blur-md max-sm:p-5 md:p-7">
                  <p className="folio !text-rose">0{i + 1} · {c.label}</p>
                  <h2 className="display mt-2 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight">{c.title}</h2>
                  <p className="mt-2 hidden text-[15px] text-white/85 sm:block">{c.line} {c.desc}</p><p className="mt-1 text-[15px] text-white/85 sm:hidden">{c.line}</p>
                  <Link href={c.href} className="btn mt-4 !py-2.5 bg-[#1f7a68] text-white hover:bg-[#176553]">{c.cta} <span aria-hidden>→</span></Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chapter dots */}
        <ol className="story-cards absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink/60 px-3 py-2 backdrop-blur" aria-label="Chapters">
          {CH.map((c, i) => (
            <li key={c.label}><button onClick={() => scrollToChapter(i)} aria-label={`Chapter ${i + 1}: ${c.label}`} aria-current={i === 0} className="s-dot group grid h-9 min-w-9 place-items-center aria-[current=true]:min-w-12"><span className="block h-3 w-3 rounded-full bg-white/40 transition-all group-aria-[current=true]:w-8 group-aria-[current=true]:bg-pulse" /></button></li>
          ))}
        </ol>

        {hint && !soundOn && <p className="story-cards pointer-events-none max-md:hidden absolute bottom-[112px] right-3 z-10 animate-pulse md:bottom-[70px] rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-lg md:right-6" role="status">Tap anywhere for sound ♪</p>}
        {/* Controls: auto-play and sound */}
        <div className="story-cards absolute bottom-16 right-3 z-10 flex gap-2 md:bottom-4 md:right-6">
          <button className={ctl} aria-pressed={auto} aria-label={auto ? "Pause the story" : "Play the story"} onClick={() => { autoRef.current = !auto; setAuto(!auto); }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>{auto ? <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></> : <path d="M7 5l12 7-12 7z" />}</svg>
            <span className="hidden sm:inline">{auto ? "Pause" : "Play"}</span>
          </button>
          <button className={ctl} aria-pressed={soundOn} aria-label={soundOn ? "Turn sound off" : "Turn sound on"} onClick={toggleSound}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />{soundOn ? <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" /> : <path d="M17 9l5 6M22 9l-5 6" />}</svg>
            <span className="hidden sm:inline">{soundOn ? "Sound on" : "Sound off"}</span>
          </button>
        </div>
      </div>

      {/* Reduced motion: the same story as plain chapters */}
      <ol className="story-list wrap space-y-10 py-16">
        {CH.map((c, i) => (
          <li key={c.label}><p className="folio text-clay">0{i + 1} · {c.label}</p><h2 className="display mt-2 text-4xl">{c.title}</h2><p className="mt-2 text-lg text-ink-soft">{c.line} {c.desc}</p><Link href={c.href} className="btn btn-clay mt-4">{c.cta}</Link></li>
        ))}
      </ol>
    </section>
  );
}
