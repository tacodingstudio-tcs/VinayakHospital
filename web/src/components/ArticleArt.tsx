// A unique drawn cover for each health article: category colours + icon, with shapes varied by the title.
const THEME: Record<string, { c: [string, string]; icon: React.ReactNode }> = {
  pregnancy: { c: ["#ff9a76", "#e8504a"], icon: <><path d="M-18,30 C-34,-6 -14,-34 2,-30 C18,-26 22,-6 12,10 C22,18 20,30 8,34 Z" /><circle cx="-2" cy="-40" r="9" /></> },
  period: { c: ["#ff7aa8", "#c2185b"], icon: <path d="M0,-34 C16,-12 28,-2 28,14 A28,28 0 0 1 -28,14 C-28,-2 -16,-12 0,-34 Z" /> },
  reproductive: { c: ["#8b7bff", "#4a3fc0"], icon: <><circle cx="0" cy="0" r="22" /><circle cx="0" cy="0" r="9" fill="#fff" opacity=".6" /><path d="M0,-22 L0,-36 M22,0 L36,0 M0,22 L0,36 M-22,0 L-36,0" strokeWidth="5" stroke="#fff" /></> },
  postpartum: { c: ["#ffb27a", "#e0702e"], icon: <><path d="M0,30 C-40,6 -30,-26 -6,-22 C-2,-21 0,-16 0,-16 C0,-16 2,-21 6,-22 C30,-26 40,6 0,30 Z" /></> },
  wellness: { c: ["#2fb59a", "#176553"], icon: <><path d="M0,34 C-30,22 -34,-14 0,-34 C34,-14 30,22 0,34 Z" /><path d="M0,30 L0,-18" stroke="#fff" strokeWidth="4" opacity=".7" /></> },
  child: { c: ["#ffb347", "#e8504a"], icon: <><circle cx="0" cy="-4" r="26" /><circle cx="-9" cy="-8" r="3.5" fill="#e8504a" /><circle cx="9" cy="-8" r="3.5" fill="#e8504a" /><path d="M-10,4 q10,10 20,0" stroke="#e8504a" strokeWidth="4" fill="none" strokeLinecap="round" /><circle cx="0" cy="-34" r="7" /></> },
  menopause: { c: ["#6c8cff", "#2a3f9e"], icon: <><circle cx="-6" cy="0" r="26" /><circle cx="6" cy="-6" r="24" fill="#2a3f9e" opacity=".55" /></> },
};
const pick = (tag: string) => /child|newborn|vaccin|pediatr|baby/i.test(tag) ? "child" : /period|menstru/i.test(tag) ? "period" : /reproduct|fertil/i.test(tag) ? "reproductive" : /postpartum/i.test(tag) ? "postpartum" : /wellness/i.test(tag) ? "wellness" : /menopause|midlife/i.test(tag) ? "menopause" : "pregnancy";
const hash = (s: string) => Array.from(s).reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export default function ArticleArt({ tag, title }: { tag: string; title: string }) {
  const t = THEME[pick(tag)]; const h = hash(title); const id = `aa${h}`;
  const dots = Array.from({ length: 9 }, (_, i) => ({ x: ((h >> i) * 37 + i * 61) % 600, y: ((h >> (i + 2)) * 29 + i * 43) % 300, r: 3 + ((h >> i) & 3) * 2 }));
  return (
    <svg viewBox="0 0 600 340" aria-hidden focusable="false" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={t.c[0]} /><stop offset="1" stopColor={t.c[1]} /></linearGradient></defs>
      <rect width="600" height="340" fill={`url(#${id})`} />
      <circle cx={80 + (h % 120)} cy={60 + (h % 60)} r={90 + (h % 40)} fill="#fff" opacity=".12" />
      <circle cx={470 - (h % 100)} cy={290 - (h % 50)} r={110} fill="#fff" opacity=".1" />
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#fff" opacity=".35" />)}
      <g transform={`translate(${h % 2 ? 330 : 270},170)`} fill="#fff"><circle r="84" fill="#fff" opacity=".22" /><g transform="scale(1.5)" fill="#fff">{t.icon}</g></g>
    </svg>
  );
}
