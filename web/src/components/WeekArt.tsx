// A unique illustration for each pregnancy week, drawn from that week's own data.
// The baby-size object grows as the weeks go on; colours follow the trimester; stars and hearts drift around it.
const SKY: Record<string, [string, string]> = {
  "First Trimester": ["#ffb199", "#ff6f91"],
  "Second Trimester": ["#9b8cff", "#5b4fd6"],
  "Third Trimester": ["#2fb59a", "#176553"],
};

export default function WeekArt({ week, trimester, size, emoji }: { week: number; trimester: string; size: string; emoji: string }) {
  const [c1, c2] = SKY[trimester] ?? SKY["First Trimester"];
  const id = `wa${week}`;
  const grow = 0.55 + (week / 40) * 1.25; // object scale
  const pct = week / 40;
  const stars = Array.from({ length: 14 }, (_, i) => ({ x: (i * 97 + week * 31) % 560 + 20, y: (i * 53 + week * 17) % 300 + 20, r: 1.5 + ((i + week) % 3), d: (i % 5) * 0.6 }));
  return (
    <svg viewBox="0 0 600 400" role="img" aria-label={`Week ${week}: your baby is about the size of ${size}`} className="h-full w-full">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c1} /><stop offset="1" stopColor={c2} /></linearGradient>
        <radialGradient id={`${id}r`}><stop offset="0" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${id}g)`} />
      {stars.map((s, i) => <circle key={i} className="tw" cx={s.x} cy={s.y} r={s.r} fill="#fff" style={{ animationDelay: `${s.d}s` }} />)}
      <text x="40" y="150" fontSize="150" fontWeight="800" fill="#fff" opacity=".14" style={{ fontFamily: "var(--font-fraunces), sans-serif" }}>{String(week).padStart(2, "0")}</text>
      <circle cx="300" cy="190" r="150" fill={`url(#${id}r)`} className="aura" />
      <g className="bob"><circle cx="300" cy="190" r={70 + grow * 22} fill="#fff" opacity=".22" /><circle cx="300" cy="190" r={52 + grow * 18} fill="#fff" opacity=".28" /></g>
      <text x="300" y={190 + 24 * grow} textAnchor="middle" fontSize={56 * grow} className="bob">{emoji}</text>
      {[0, 1, 2].map((k) => <path key={k} className="floatup" d="M0,-6 C-4,-14 -16,-10 -16,0 C-16,10 -4,16 0,22 C4,16 16,10 16,0 C16,-10 4,-14 0,-6Z" fill="#fff" opacity=".8" transform={`translate(${190 + k * 110},300) scale(.55)`} style={{ animationDelay: `${k * 1.4}s`, ["--dx" as string]: `${(k - 1) * 30}px` } as React.CSSProperties} />)}
      <rect x="40" y="352" width="520" height="8" rx="4" fill="#fff" opacity=".25" /><rect x="40" y="352" width={520 * pct} height="8" rx="4" fill="#fff" />
      <text x="40" y="338" fontSize="16" fontWeight="700" fill="#fff">Week {week} of 40</text>
      <text x="560" y="338" textAnchor="end" fontSize="16" fill="#fff" opacity=".9">size of {size}</text>
    </svg>
  );
}
