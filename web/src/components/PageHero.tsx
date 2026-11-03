// Illustrated page opener: a small painted landscape (sky, sun or moon, drifting clouds, hills) under the headline.
const SCENES = [
  { sky: ["#14123f", "#34307a"], orb: "#fff1c1", back: "#2a2870", front: "#1d1b4a", stars: true },
  { sky: ["#2b2a6b", "#c4607a"], orb: "#ffd8a8", back: "#7c3f77", front: "#4a2a62", stars: true },
  { sky: ["#5b2a86", "#ff8a6b"], orb: "#ffe07a", back: "#b8506e", front: "#6d3470", stars: false },
  { sky: ["#12395a", "#3aa7a0"], orb: "#fff3a6", back: "#2d8a86", front: "#1c5f66", stars: false },
];
const hash = (s: string) => Array.from(s).reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string; image?: string; dark?: boolean }) {
  const k = hash(eyebrow) % SCENES.length;
  const sc = SCENES[k];
  const id = `ph${k}`;
  return (
    <section className="hero-dark relative isolate mb-5 flex min-h-[300px] items-end overflow-hidden text-cream" style={{ height: "34svh" }}>
      <svg className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sc.sky[0]} /><stop offset="1" stopColor={sc.sky[1]} /></linearGradient>
          <radialGradient id={`${id}o`}><stop offset="0" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="1600" height="600" fill={`url(#${id})`} />
        {sc.stars && Array.from({ length: 40 }, (_, i) => <circle key={i} className="tw" cx={(i * 211) % 1600} cy={(i * 97) % 380} r={1 + (i % 3) * 0.7} fill="#fff" style={{ animationDelay: `${(i % 7) * 0.45}s` }} />)}
        <g transform={`translate(${1120 + k * 90},${150 + (k % 2) * 40})`}><circle r="200" fill={`url(#${id}o)`} /><circle r="58" fill={sc.orb} /></g>
        {[[260, 160, 1], [820, 110, 0.7], [1400, 230, 0.85]].map(([x, y, s], i) => (
          <g key={i} className="drift" style={{ animationDuration: `${20 + i * 6}s` }}><g transform={`translate(${x},${y}) scale(${s})`} fill="#fff" opacity={sc.stars ? 0.14 : 0.35}><ellipse rx="90" ry="28" /><ellipse cx="-38" cy="-22" rx="44" ry="32" /><ellipse cx="22" cy="-28" rx="52" ry="38" /></g></g>
        ))}
        <path d="M-100,470 C150,380 380,420 620,450 C860,480 1060,380 1300,420 C1450,445 1560,470 1700,440 L1700,600 L-100,600Z" fill={sc.back} />
        <path d="M-100,540 C200,500 480,540 780,536 C1080,532 1320,500 1700,540 L1700,600 L-100,600Z" fill={sc.front} />
        {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={60 + i * 118} cy={555 + (i % 3) * 8} r="5" fill={["#ff8fb1", "#ffd36b", "#fff"][i % 3]} opacity=".85" />)}
        <path className="bob" d="M1230,300 C1226,290 1210,292 1210,306 C1210,318 1226,326 1230,334 C1234,326 1250,318 1250,306 C1250,292 1234,290 1230,300Z" fill="#ff6b6b" opacity=".9" />
        <path className="bob" style={{ animationDelay: "1s" }} d="M1380,380 C1377,372 1366,374 1366,383 C1366,391 1377,396 1380,402 C1383,396 1394,391 1394,383 C1394,374 1383,372 1380,380Z" fill="#ffc7a1" opacity=".9" />
        <path d="M0,600 L0,572 C400,548 1000,590 1600,556 L1600,600Z" fill="#fff7ee" />
      </svg>
      <div className="wrap w-full pb-6 pt-28 md:pb-6">
        <p className="folio hero-fade !text-rose">{eyebrow}</p>
        <h1 className="display hero-fade mt-4 max-w-[22ch] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">{title}</h1>
        {intro && <p className="hero-fade mt-5 max-w-2xl text-lg leading-relaxed text-cream/90">{intro}</p>}
      </div>
    </section>
  );
}
