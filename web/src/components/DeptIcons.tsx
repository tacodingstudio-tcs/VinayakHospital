// Small animated illustrations for the three departments.
export function DeptIcon({ slug }: { slug: string }) {
  if (slug === "pediatric-care")
    return (
      <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden focusable="false">
        <circle cx="100" cy="150" r="70" fill="#fff" opacity=".18" />
        <g className="bob">
          <circle cx="58" cy="86" r="13" fill="#f6c19a" /><circle cx="142" cy="86" r="13" fill="#f6c19a" />
          <circle cx="100" cy="82" r="48" fill="#ffd9b8" />
          <path d="M84,40 C90,28 112,28 116,42 C106,38 96,38 84,40Z" fill="#2b1d2e" />
          <circle cx="84" cy="82" r="5" fill="#3a2b3f" /><circle cx="116" cy="82" r="5" fill="#3a2b3f" />
          <circle cx="70" cy="98" r="8" fill="#ff9d8a" opacity=".55" /><circle cx="130" cy="98" r="8" fill="#ff9d8a" opacity=".55" />
          <path d="M88,100 q12,12 24,0" stroke="#3a2b3f" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        <path className="tw" d="M164,34 l4,10 l10,4 l-10,4 l-4,10 l-4,-10 l-10,-4 l10,-4Z" fill="#fff" />
        <path className="tw" style={{ animationDelay: "1s" }} d="M32,44 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3Z" fill="#fff" />
      </svg>
    );
  if (slug === "gynecology-maternity-care")
    return (
      <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden focusable="false">
        <circle cx="100" cy="150" r="70" fill="#fff" opacity=".18" />
        <g className="glow"><path d="M100,128 C40,92 40,40 76,38 C92,37 100,48 100,48 C100,48 108,37 124,38 C160,40 160,92 100,128Z" fill="#fff" /></g>
        <path d="M100,104 C72,86 74,62 90,62 C96,62 100,68 100,68 C100,68 104,62 110,62 C126,62 128,86 100,104Z" fill="#ff6b6b" />
        <circle className="ring" cx="100" cy="80" r="30" fill="none" stroke="#fff" strokeWidth="3" />
      </svg>
    );
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden focusable="false">
      <circle cx="100" cy="150" r="70" fill="#fff" opacity=".18" />
      <rect x="66" y="26" width="68" height="68" rx="20" fill="#fff" />
      <path d="M100,40 L100,80 M80,60 L120,60" stroke="#ff6b6b" strokeWidth="14" strokeLinecap="round" />
      <path d="M20,124 L70,124 L82,104 L98,144 L112,114 L124,124 L180,124" pathLength={1} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="pulse-draw" />
    </svg>
  );
}
