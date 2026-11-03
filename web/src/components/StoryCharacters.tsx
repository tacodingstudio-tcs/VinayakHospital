import { memo, type CSSProperties } from "react";

const ink = "#3a2b3f";
const heart = "M0,-6 C-4,-14 -16,-10 -16,0 C-16,10 -4,16 0,22 C4,16 16,10 16,0 C16,-10 4,-14 0,-6Z";
const star = (cx: number, cy: number, r: number) => Array.from({ length: 10 }, (_, i) => { const a = (Math.PI / 5) * i - Math.PI / 2; const rr = i % 2 ? r * 0.45 : r; return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`; }).join(" ");

type Tone = "a" | "b" | "k" | "bb";
const TONE: Record<Tone, { g: string; sh: string; base: string }> = {
  a: { g: "url(#skinA)", sh: "#b46f4c", base: "#e6a27a" },
  b: { g: "url(#skinB)", sh: "#a9623f", base: "#d58c63" },
  k: { g: "url(#skinK)", sh: "#c0805a", base: "#f0b389" },
  bb: { g: "url(#skinBb)", sh: "#d99a72", base: "#f8c7a0" },
};
type Hair = "long" | "bun" | "man" | "tuft" | "wisp" | "boy" | "pigtails";

// A face with real structure: egg-shaped head, ears, brows, almond eyes with lids and lashes, nose, shaped lips, cheeks.
// Eyes blink and look around, brows lift, lips deepen into a smile: the same animation hooks as before.
function Head({ x, y, s = 1, tilt = 0, tone, hair, look = [0, 1], mouth = "smile", tears = false, sleep = false, wake = false }: {
  x: number; y: number; s?: number; tilt?: number; tone: Tone; hair: Hair; look?: [number, number]; mouth?: "smile" | "laugh" | "soft"; tears?: boolean; sleep?: boolean; wake?: boolean;
}) {
  const t = TONE[tone]; const kid = tone === "k" || tone === "bb"; const er = kid ? 0.98 : 0.92; const ey = kid ? 3 : -2; const hc = "url(#hairG)";
  return (
    <g transform={`translate(${x},${y}) rotate(${tilt}) scale(${s})`}>
      {hair === "long" && (
        <>
          <path d="M-37,-10 C-48,30 -44,60 -34,84 C-30,96 -36,106 -26,114 L26,114 C36,106 30,96 34,84 C44,60 48,30 37,-10 C35,-54 -35,-54 -37,-10Z" fill={hc} />
          <path d="M-30,10 C-34,40 -30,70 -24,100 M-18,20 C-22,52 -16,80 -12,106 M20,16 C26,50 22,80 26,106 M30,8 C36,40 34,70 30,96" stroke="#7a5a70" strokeOpacity=".32" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      {hair === "pigtails" && (
        <>
          <path d="M-29,-22 C-48,-22 -56,8 -50,40 C-48,50 -38,48 -39,38 C-38,18 -32,4 -27,-6Z" fill={hc} />
          <path d="M29,-22 C48,-22 56,8 50,40 C48,50 38,48 39,38 C38,18 32,4 27,-6Z" fill={hc} />
          <path d="M-46,10 C-47,26 -44,38 -42,44 M46,10 C47,26 44,38 42,44" stroke="#7a5a70" strokeOpacity=".4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </>
      )}
      {tone !== "bb" && <><path d="M-10,24 L-10,52 C-10,57 10,57 10,52 L10,24Z" fill={t.g} /><path d="M-10,34 C-5,46 5,46 10,34 L10,24 L-10,24Z" fill="#000" opacity=".13" /></>}
      <ellipse cx="-30" cy="2" rx="5.5" ry="9" fill={t.g} /><ellipse cx="30" cy="2" rx="5.5" ry="9" fill={t.g} />
      <path d="M-30,-8 C-31,-32 -16,-44 0,-44 C16,-44 31,-32 30,-8 C29,16 16,38 0,42 C-16,38 -29,16 -30,-8Z" fill={t.g} stroke={t.sh} strokeOpacity=".55" strokeWidth="1.5" transform={kid ? "scale(1.08,.97)" : undefined} />
      <ellipse cx="0" cy="-26" rx="14" ry="7" fill="#fff" opacity=".2" /><ellipse cx="-17" cy="8" rx="6" ry="4" fill="#fff" opacity=".16" /><ellipse cx="17" cy="8" rx="6" ry="4" fill="#fff" opacity=".16" />
      <path d="M-28,8 C-24,30 -12,38 0,41 C10,38 22,30 28,8 C24,26 12,34 0,36 C-12,34 -24,26 -28,8Z" fill={t.sh} opacity=".18" />
      {/* hair front */}
      {hair === "long" && (
        <>
          <path d="M-36,-10 C-42,-48 -14,-62 8,-60 C32,-58 42,-40 36,-10 C33,-22 28,-30 18,-34 C10,-32 -2,-30 -12,-26 C-22,-22 -30,-16 -36,-10Z" fill={hc} />
          <path d="M-30,-14 C-26,-34 -8,-50 12,-54 M-22,-12 C-18,-30 0,-46 20,-50 M12,-36 C24,-46 34,-40 35,-26" stroke="#7a5a70" strokeOpacity=".4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M-26,-42 C-10,-58 18,-58 30,-44" stroke="#fff" strokeOpacity=".24" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M-33,2 C-37,14 -31,24 -24,21" stroke="#2b1d2e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </>
      )}
      {hair === "bun" && <path d="M-33,-12 C-38,-50 -12,-60 6,-57 C28,-54 38,-38 33,-12 C30,-26 20,-36 4,-38 C-12,-38 -26,-30 -33,-12Z" fill={hc} />}
      {hair === "man" && (
        <>
          <path d="M-33,-14 C-38,-50 -12,-62 8,-60 C30,-58 38,-44 33,-14 C30,-26 22,-34 10,-36 C4,-40 -4,-38 -10,-34 C-20,-30 -28,-22 -33,-14Z" fill={hc} />
          <ellipse cx="2" cy="-52" rx="26" ry="9" fill={hc} />
          <path d="M-31,-14 L-29,4 L-24,-8Z M31,-14 L29,4 L24,-8Z" fill={hc} />
          <path d="M-26,-46 C-10,-58 12,-58 26,-46 M-20,-34 C-8,-44 6,-46 20,-38" stroke="#7a5a70" strokeOpacity=".4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M-22,-50 C-8,-60 14,-60 26,-50" stroke="#fff" strokeOpacity=".22" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M-9,20 C-5,17 -1,18 0,19 C1,18 5,17 9,20 C5,23 -5,23 -9,20Z" fill="#2b1d2e" opacity=".9" />
        </>
      )}
      {hair === "tuft" && (
        <>
          <path d="M-31,-16 C-34,-48 -10,-58 8,-56 C28,-54 34,-40 31,-16 C28,-27 20,-33 10,-35 C2,-31 -6,-31 -14,-27 C-22,-25 -28,-21 -31,-16Z" fill={hc} />
          <path d="M-14,-52 C-17,-62 -8,-64 -5,-56 M1,-56 C-1,-67 10,-68 10,-57 M15,-52 C18,-61 26,-58 23,-49" fill={hc} stroke={hc} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-24,-34 C-12,-48 8,-50 22,-40 M-16,-22 C-6,-32 6,-34 16,-30" stroke="#7a5a70" strokeOpacity=".4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M-20,-48 C-8,-58 12,-56 22,-48" stroke="#fff" strokeOpacity=".24" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        </>
      )}
      {hair === "boy" && (
        <>
          <path d="M-33,-12 C-38,-50 -12,-64 10,-62 C32,-60 40,-44 33,-12 L31,3 L26,-8 C24,-22 18,-32 8,-36 C0,-32 -8,-30 -16,-24 C-22,-20 -26,-12 -27,-6 L-31,3Z" fill={hc} />
          <path d="M-8,-44 C4,-62 28,-58 31,-40 C20,-47 6,-45 -8,-44Z" fill={hc} />
          <path d="M-4,-42 C-8,-34 -12,-30 -18,-26" stroke="#8a6a80" strokeOpacity=".6" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M-2,-40 C8,-52 22,-54 30,-44 M-6,-38 C6,-46 22,-46 31,-34 M-10,-34 C-18,-40 -26,-36 -30,-28 M-14,-46 C-22,-48 -30,-44 -32,-34" stroke="#8a6a80" strokeOpacity=".5" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M-18,-52 C-4,-62 18,-60 28,-50" stroke="#fff" strokeOpacity=".26" strokeWidth="3.6" fill="none" strokeLinecap="round" />
        </>
      )}
      {hair === "pigtails" && (
        <>
          <path d="M-31,-14 C-34,-48 -10,-58 8,-56 C28,-54 34,-40 31,-14 C28,-24 22,-30 12,-32 L-12,-32 C-22,-30 -28,-24 -31,-14Z" fill={hc} />
          <path d="M-22,-32 C-14,-44 -2,-50 10,-52 M-10,-32 C-4,-40 4,-46 16,-48" stroke="#7a5a70" strokeOpacity=".4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M-20,-50 C-8,-58 12,-56 22,-50" stroke="#fff" strokeOpacity=".22" strokeWidth="3" fill="none" strokeLinecap="round" />
          {[-1, 1].map((d) => <g key={d} transform={`translate(${d * 33},-16)`}><path d="M0,0 L-9,-8 L-9,8Z M0,0 L9,-8 L9,8Z" fill="#ff5c97" transform={`scale(${d},1)`} /><circle r="3.6" fill="#ff8fb8" /></g>)}
        </>
      )}
      {hair === "wisp" && <path d="M-12,-40 C-8,-50 4,-50 8,-42 M-2,-44 C2,-52 10,-50 12,-44" stroke="#5a3b3b" strokeWidth="2.4" fill="none" strokeLinecap="round" />}
      {/* brows */}
      <g className="brow" fill="none" stroke={hair === "wisp" ? "#b48566" : "#1c1218"} strokeWidth={kid ? 3 : 3.3} strokeLinecap="round" opacity={hair === "wisp" ? 0.6 : 1}>
        <path d={`M-19,${-12 + (kid ? 3 : 0)} q8,-5 16,-1`} /><path d={`M3,${-13 + (kid ? 3 : 0)} q8,-4 16,1`} />
      </g>
      {/* eyes */}
      {sleep ? (
        <g fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"><path d="M-19,2 q7,6 14,0 M5,2 q7,6 14,0" /><path d="M-19,2 l-3,-2 M19,2 l3,-2" strokeWidth="1.5" /></g>
      ) : (
        <>
          <g className={wake ? "eyeclosed" : undefined} style={wake ? undefined : { display: "none" }}><g fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round"><path d="M-19,2 q7,6 14,0 M5,2 q7,6 14,0" /></g></g>
          <g className={wake ? "eyeopen" : "blink"}>
            {[-12, 12].map((cx) => (
              <g key={cx} transform={`translate(${cx},${ey})`}>
                <path d={`M${-8 * er},0 C${-5 * er},${-5 * er} ${5 * er},${-5 * er} ${8 * er},0 C${5 * er},${4.6 * er} ${-5 * er},${4.6 * er} ${-8 * er},0Z`} fill="#fff" stroke="#3a2b3f" strokeOpacity=".55" strokeWidth=".9" />
                <g className="look">
                  <circle cx={look[0]} cy={look[1] - 0.4} r={4.4 * er} fill="#7a4a2e" stroke="#2a1a10" strokeWidth=".9" />
                  <circle cx={look[0]} cy={look[1] - 0.4} r={2.5 * er} fill="#140c10" />
                  <circle cx={look[0] - 1.5 * er} cy={look[1] - 2.2 * er} r={1.5 * er} fill="#fff" /><circle cx={look[0] + 1.7 * er} cy={look[1] + 1.4 * er} r={0.75 * er} fill="#fff" opacity=".85" />
                </g>
                <path d={`M${-9 * er},0.6 C${-5 * er},${-6.4 * er} ${5 * er},${-6.4 * er} ${9 * er},0.6`} fill="none" stroke="#1c1218" strokeWidth="2.8" strokeLinecap="round" />
                <path d={cx < 0 ? `M${-9 * er},0.4 l-3,-2.6` : `M${9 * er},0.4 l3,-2.6`} stroke="#1c1218" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            ))}
          </g>
        </>
      )}
      {/* nose */}
      <path d="M0,2 C-1,8 -2,11 -4,13.5 C-1,15.5 3,15.5 5,13.5" fill="none" stroke={t.sh} strokeWidth="2.3" strokeLinecap="round" opacity=".85" />
      <ellipse cx="-2.6" cy="14" rx="1.5" ry="1" fill={t.sh} opacity=".7" /><ellipse cx="3.4" cy="14" rx="1.5" ry="1" fill={t.sh} opacity=".7" />
      <ellipse cx="0" cy="11" rx="2.8" ry="1.9" fill="#fff" opacity=".42" />
      {/* cheeks */}
      <g className="blush"><circle cx="-20" cy="15" r="8.5" fill="#ff7f7f" opacity=".68" /><circle cx="20" cy="15" r="8.5" fill="#ff7f7f" opacity=".68" /></g>
      {/* mouth */}
      <g className="grin2">
        {mouth === "laugh" ? (
          <>
            <path d="M-11,23 C-6,37 6,37 11,23 C5,25 -5,25 -11,23Z" fill="#7a2432" />
            <path d="M-8,24 C-3,25.6 3,25.6 8,24 L8,27.4 C3,28.6 -3,28.6 -8,27.4Z" fill="#fff" />
            <ellipse cx="0" cy="32" rx="5.2" ry="3" fill="#ff8a94" />
          </>
        ) : (
          <>
            <path d={mouth === "soft" ? "M-9,25 C-4,28 4,28 9,25" : "M-10,24 C-5,31 5,31 10,24"} fill="none" stroke="#8f2f47" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M-7,28.5 C-3,34 3,34 7,28.5 C3,31 -3,31 -7,28.5Z" fill="#e0607a" /><ellipse cx="0" cy="31" rx="2.6" ry="1" fill="#fff" opacity=".5" />
          </>
        )}
      </g>
      {tears && <><path className="tear" d="M-21,16 q-4,7 0,10 q4,-3 0,-10z" fill="#bfe6ff" stroke="#8fcaf0" strokeWidth="1" /><path className="tear" style={{ animationDelay: "1.4s" }} d="M21,16 q-4,7 0,10 q4,-3 0,-10z" fill="#bfe6ff" stroke="#8fcaf0" strokeWidth="1" /></>}
    </g>
  );
}

// Side view of a face looking down and to the right (toward her belly): profile outline, one eye, ear, flowing hair.
function ProfileHead({ x, y, s = 1, tilt = 0 }: { x: number; y: number; s?: number; tilt?: number }) {
  const t = TONE.a;
  return (
    <g transform={`translate(${x},${y}) rotate(${tilt}) scale(${s})`}>
      <path d="M-33,-2 C-38,-44 -10,-56 8,-53 C26,-51 33,-40 31,-26 C21,-36 4,-38 -8,-32 C-18,-26 -22,-8 -24,12 C-28,40 -34,66 -28,86 C-26,98 -34,104 -24,114 C-44,106 -52,56 -46,12 C-44,2 -38,-2 -33,-2Z" fill="url(#hairG)" />
      <path d="M-30,16 C-36,46 -32,78 -26,106 M-38,12 C-44,42 -40,72 -34,98 M-24,30 C-28,56 -24,84 -18,108" stroke="#7a5a70" strokeOpacity=".34" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M-12,22 L-9,58 L15,58 L13,28Z" fill={t.g} />
      <path d="M-12,30 C-4,42 8,44 14,34 L13,28 L-12,22Z" fill="#000" opacity=".13" />
      <path d="M-30,-6 C-32,-34 -14,-46 4,-46 C20,-46 30,-36 30,-22 C30,-16 28,-12 29,-8 C30,-4 33,2 37,9 C38,12 36,14 31,14 C31,16 32,18 31,19 C33,20 33,22 31,23 C33,24 33,27 30,28 C29,31 28,34 25,37 C22,40 14,40 8,36 C0,32 -12,28 -22,20 C-30,12 -31,2 -30,-6Z" fill={t.g} stroke={t.sh} strokeOpacity=".6" strokeWidth="1.5" />
      <ellipse cx="4" cy="-26" rx="12" ry="6" fill="#fff" opacity=".2" /><ellipse cx="12" cy="12" rx="6" ry="4" fill="#fff" opacity=".16" />
      <path d="M-14,24 C-6,34 6,40 18,38 C12,40 4,36 -2,32 C-8,28 -12,26 -14,24Z" fill={t.sh} opacity=".2" />
      <ellipse cx="-6" cy="6" rx="5" ry="8.5" fill={t.g} stroke={t.sh} strokeOpacity=".35" strokeWidth="1" /><path d="M-7,2 q3,3 0,9" stroke={t.sh} strokeOpacity=".4" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M-30,-8 C-28,-36 -10,-48 6,-48 C22,-48 31,-38 30,-24 C24,-30 16,-32 10,-30 C0,-28 -10,-22 -16,-10 C-20,-2 -26,-2 -30,-8Z" fill="url(#hairG)" />
      <path d="M24,-42 C6,-50 -16,-42 -24,-24 C-28,-12 -26,6 -28,30 M12,-44 C-6,-46 -20,-36 -24,-18" stroke="#7a5a70" strokeOpacity=".42" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M-18,-42 C-6,-52 14,-50 24,-40" stroke="#fff" strokeOpacity=".2" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {[[-12, -36], [-4, -41], [4, -37]].map(([cx, cy], i) => <g key={i}><circle cx={cx} cy={cy} r="4" fill="#fff" /><circle cx={cx} cy={cy} r="1.4" fill="#ffd36b" /></g>)}
      <path className="brow" d="M10,-18 q9,-7 18,-2" fill="none" stroke="#1c1218" strokeWidth="3.6" strokeLinecap="round" />
      <g className="blink" transform="translate(17,-7) scale(1.08) translate(-17,7)">
        <path d="M10,-8 C13,-13 21,-13 25,-7 C21,-3 13,-3 10,-8Z" fill="#fff" stroke="#3a2b3f" strokeOpacity=".55" strokeWidth=".8" />
        <g className="look"><circle cx="20" cy="-6" r="3.8" fill="#5a3a2a" /><circle cx="20" cy="-6" r="2" fill="#1c1218" /><circle cx="18.8" cy="-7.4" r="1.1" fill="#fff" /></g>
        <path d="M9,-7 C13,-14 21,-14 26,-7" fill="none" stroke="#3a2b3f" strokeWidth="2" strokeLinecap="round" />
        <path d="M25,-8 l4,-3 M24,-10 l3,-4 M22,-11 l1.6,-4.4" stroke="#3a2b3f" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <path d="M34,10 C35,12 33,13.5 31,13" fill="none" stroke={t.sh} strokeWidth="2" strokeLinecap="round" opacity=".9" /><ellipse cx="35" cy="8" rx="2" ry="1.4" fill="#fff" opacity=".4" />
      <ellipse cx="31" cy="11" rx="1.9" ry="1.2" fill={t.sh} opacity=".5" />
      <circle className="blush" cx="14" cy="10" r="8.5" fill="#ff7f7f" opacity=".68" />
      <g className="grin2"><path d="M31,21 C27,26 22,26 18,22" fill="none" stroke="#8f2f47" strokeWidth="3.4" strokeLinecap="round" /><path d="M31,24 C30,29 24,30 20,26 C25,28 29,27 31,24Z" fill="#e0607a" /></g>
      <path className="tear" d="M18,4 q-4,7 0,10 q4,-3 0,-10z" fill="#bfe6ff" stroke="#8fcaf0" strokeWidth="1" />
    </g>
  );
}

// A sleeping baby seen from the side, head turned up toward the mobile.
function BabyProfile({ x, y, s = 1, rot = 0, wake = false }: { x: number; y: number; s?: number; rot?: number; wake?: boolean }) {
  const t = TONE.bb;
  return (
    <g transform={`translate(${x},${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-28,-4 C-30,-30 -12,-42 4,-42 C20,-42 29,-30 28,-16 C28,-12 27,-9 28,-6 C29,-3 31,0 33,4 C34,7 32,9 29,9 C29,11 30,12 29,14 C31,15 31,17 29,18 C28,22 25,26 20,29 C12,33 0,32 -10,26 C-22,18 -28,8 -28,-4Z" fill={t.g} stroke={t.sh} strokeOpacity=".6" strokeWidth="1.4" />
      <path d="M-26,6 C-18,24 -4,32 12,31 C0,34 -14,28 -24,16Z" fill={t.sh} opacity=".2" />
      <ellipse cx="-8" cy="4" rx="4.6" ry="7" fill={t.g} stroke={t.sh} strokeOpacity=".4" strokeWidth="1" />
      <path d="M-4,-42 C-2,-50 8,-52 10,-45 C12,-50 20,-48 18,-42 M4,-40 C8,-46 14,-46 15,-41" stroke="#8a5a3c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M11,-13 q7,-4 14,0" fill="none" stroke="#9a6a4a" strokeWidth="2.6" strokeLinecap="round" opacity=".85" />
      <g className={wake ? "eyeclosed" : undefined}><path d="M8,-4 q7,7 14,0" fill="none" stroke="#2a1a22" strokeWidth="2.8" strokeLinecap="round" /><path d="M21,-3 l3,-2 M19,-1 l3,-1" stroke="#2a1a22" strokeWidth="1.6" strokeLinecap="round" /></g>
      {wake && <g className="eyeopen"><path d="M8,-4 C10,-10 20,-10 23,-4 C20,1 10,1 8,-4Z" fill="#fff" stroke="#2a1a22" strokeWidth="1.6" /><circle cx="17" cy="-4" r="3.6" fill="#5a3a2a" /><circle cx="17" cy="-4" r="1.9" fill="#140c10" /><circle cx="15.8" cy="-5.4" r="1.1" fill="#fff" /></g>}
      <circle className="blush" cx="12" cy="9" r="7.5" fill="#ff7f7f" opacity=".7" />
      <path d="M31,5 C33,7 32,8.6 30,8.4" fill="none" stroke={t.sh} strokeWidth="1.3" strokeLinecap="round" opacity=".7" />
      <g className="grin2"><path d="M28,17 C25,21 20,21 17,18" fill="none" stroke="#8f2f47" strokeWidth="3" strokeLinecap="round" /></g>
    </g>
  );
}

function Hand({ x, y, r = 0, tone = "a", s = 1 }: { x: number; y: number; r?: number; tone?: Tone; s?: number }) {
  const t = TONE[tone];
  return (
    <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="10" ry="9" fill={t.g} />
      {[-7.5, -2.6, 2.4, 7.2].map((fx, i) => <rect key={i} x={fx - 2} y={-17 + (i === 0 || i === 3 ? 2 : 0)} width="4.2" height="13" rx="2.1" fill={t.g} stroke={t.sh} strokeOpacity=".25" strokeWidth=".8" />)}
      <ellipse cx="-9.5" cy="2" rx="3.6" ry="7" transform="rotate(-28 -9.5 2)" fill={t.g} stroke={t.sh} strokeOpacity=".25" strokeWidth=".8" />
    </g>
  );
}
// Tapered limb: upper segment thicker than lower, with a soft shadow edge.
function Limb({ pts, w1, w2, tone }: { pts: [number, number, number, number, number, number]; w1: number; w2: number; tone: Tone }) {
  const [x0, y0, x1, y1, x2, y2] = pts; const t = TONE[tone];
  return (
    <g strokeLinecap="round" fill="none">
      <path d={`M${x0},${y0} L${x1},${y1}`} stroke={t.base} strokeWidth={w1} /><path d={`M${x1},${y1} L${x2},${y2}`} stroke={t.base} strokeWidth={w2} />
      <circle cx={x1} cy={y1} r={(w1 + w2) / 4} fill={t.base} stroke="none" />
      <path d={`M${x0 + 3},${y0 + 3} L${x1 + 2},${y1 + 2} L${x2 + 2},${y2 + 2}`} stroke={t.sh} strokeOpacity=".22" strokeWidth="3" />
    </g>
  );
}

function Hearts({ x, y, n = 5, fill = "#ff6b6b", spread = 30 }: { x: number; y: number; n?: number; fill?: string; spread?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, k) => (
        <g key={k} transform={`translate(${x + (k % 2 ? 1 : -1) * (k * 6)},${y}) scale(${0.55 + (k % 3) * 0.15})`}>
          <path className="floatup" d={heart} fill={fill} style={{ animationDelay: `${(k * 5) / n}s`, ["--dx" as string]: `${(k % 2 ? 1 : -1) * (spread + k * 6)}px` } as CSSProperties} />
        </g>
      ))}
    </>
  );
}
function Butterfly({ x, y, c, d = 0 }: { x: number; y: number; c: string; d?: number }) {
  return (
    <g className="fly" style={{ animationDelay: `${d}s` }}>
      <g transform={`translate(${x},${y})`}>
        <g className="flap"><ellipse cx="-9" cy="-4" rx="9" ry="12" fill={c} /><ellipse cx="9" cy="-4" rx="9" ry="12" fill={c} /></g>
        <ellipse cx="0" cy="0" rx="2" ry="9" fill="#3a2b3f" />
      </g>
    </g>
  );
}
const Aura = ({ cy = 520 }: { cy?: number }) => <circle className="aura" cx="800" cy={cy} r="270" fill="url(#auraG)" />;
const Ground = ({ cx = 805, rx = 100 }: { cx?: number; rx?: number }) => <ellipse cx={cx} cy="668" rx={rx} ry="11" fill="#1a1238" opacity=".3" filter="url(#blur6)" />;

function Characters() {
  const T = (dy: number) => `translate(0,${dy}) translate(800,664) scale(.84) translate(-800,-664)`;
  return (
    <>
      <defs>
        <linearGradient id="skinA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6c8a2" /><stop offset="1" stopColor="#dd9569" /></linearGradient>
        <linearGradient id="skinB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e7a77c" /><stop offset="1" stopColor="#c47f56" /></linearGradient>
        <linearGradient id="skinK" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbd3b0" /><stop offset="1" stopColor="#e9a97f" /></linearGradient>
        <linearGradient id="skinBb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe0c4" /><stop offset="1" stopColor="#f3b894" /></linearGradient>
        <linearGradient id="hairG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4d3346" /><stop offset="1" stopColor="#1c1120" /></linearGradient>
        <linearGradient id="dressA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9f86" /><stop offset="1" stopColor="#e2564a" /></linearGradient>
        <linearGradient id="dressT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5ddccf" /><stop offset="1" stopColor="#1a9d92" /></linearGradient>
        <linearGradient id="dressY" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd470" /><stop offset="1" stopColor="#f0a52e" /></linearGradient>
        <linearGradient id="dressP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff8f7c" /><stop offset="1" stopColor="#df5a4a" /></linearGradient>
        <linearGradient id="shirtG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9fd2f3" /><stop offset="1" stopColor="#5a9fd4" /></linearGradient>
        <linearGradient id="pantG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#43508f" /><stop offset="1" stopColor="#262d5c" /></linearGradient>
        <linearGradient id="dressK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffa6c6" /><stop offset="1" stopColor="#ee5f8e" /></linearGradient>
        <linearGradient id="boyTee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6aa8ff" /><stop offset="1" stopColor="#3b6fe0" /></linearGradient>
        <linearGradient id="swaddleG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#f5d9bf" /></linearGradient>
        <filter id="blur6" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>

      {/* 0 · expecting mother: a heartbeat you can see */}
      <g className="s-char" data-i="0"><g transform={T(28)}>
        <Aura />
        <g className="shoot"><line x1="1120" y1="150" x2="1160" y2="126" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></g>
        <Ground rx={105} />
        <g className="breathe">
          <path d="M766,374 C760,430 770,478 762,540 C756,590 744,632 730,664 L890,664 C880,628 914,588 912,528 C910,478 880,446 850,426 C848,402 840,384 830,374 Z" fill="url(#dressA)" />
          <path d="M792,520 C788,570 780,622 772,662 M832,548 C830,594 826,628 822,662 M866,572 C868,606 874,634 880,662" stroke="#a52f27" strokeOpacity=".28" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M770,436 C800,452 842,448 862,432" stroke="#c4413a" strokeWidth="7" fill="none" strokeLinecap="round" opacity=".7" />
          <ellipse cx="868" cy="500" rx="26" ry="52" fill="#fff" opacity=".14" transform="rotate(-12 868 500)" />
          <ellipse cx="806" cy="666" rx="46" ry="8" fill="#2b1d2e" opacity=".35" /><ellipse cx="862" cy="668" rx="24" ry="6" fill="#2b1d2e" opacity=".3" />
          <g className="nod"><ProfileHead x={806} y={334} s={1.06} tilt={7} /></g>
          <circle cx="862" cy="505" r="72" fill="url(#glowG)" className="lub" />
          <g className="lub"><ellipse cx="872" cy="516" rx="24" ry="15" transform="rotate(-20 872 516)" fill="url(#skinBb)" /><circle cx="848" cy="500" r="16" fill="url(#skinBb)" /><path d="M842,499 q4,3 8,0" stroke="#b9774f" strokeWidth="1.8" fill="none" strokeLinecap="round" /><path d="M844,507 q4,3 8,0" stroke="#b9774f" strokeWidth="1.6" fill="none" strokeLinecap="round" /></g>
          <g className="kick"><circle cx="886" cy="498" r="6" fill="url(#skinBb)" /></g>
          <g className="armstroke"><Limb pts={[808, 396, 842, 452, 884, 488]} w1={18} w2={14} tone="a" /><path d="M794,384 C812,378 830,388 834,404 L822,436 L800,424Z" fill="#f0705f" /><path d="M800,424 L822,436" stroke="#b83a2e" strokeOpacity=".35" strokeWidth="2" /></g>
        </g>
        {[0, 1.3].map((d) => <circle key={d} className="ring" cx="862" cy="505" r="34" fill="none" stroke="#ffc7a1" strokeWidth="3" style={{ animationDelay: `${d}s`, animationDuration: "2.6s" }} />)}
        <Hearts x={862} y={470} n={5} fill="#ff8f8f" />
      </g></g>

      {/* 1 · birth: mother rocks her baby, who opens their eyes */}
      <g className="s-char" data-i="1" style={{ opacity: 0 }}><g transform={T(28)}>
        <Aura cy={470} />
        <Ground rx={120} />
        <g className="rock">
          <path d="M676,664 C672,540 712,464 800,452 C888,464 928,540 924,664 Z" fill="url(#dressT)" />
          <path d="M720,520 C716,580 712,630 706,664 M880,520 C884,580 888,630 894,664" stroke="#0e6f66" strokeOpacity=".3" strokeWidth="3" fill="none" />
          <path d="M770,452 C790,476 812,476 832,452 C822,462 780,462 770,452Z" fill="url(#skinA)" />
          <g className="nod"><Head x={800} y={388} s={1.1} tilt={-4} tone="a" hair="long" look={[-2, 4]} mouth="smile" tears /></g>
          <g transform="rotate(-10 800 540)">
            <ellipse cx="800" cy="544" rx="96" ry="52" fill="url(#swaddleG)" />
            <path d="M736,522 C760,562 840,582 884,550 M752,504 C790,542 850,550 888,522 M770,560 C810,578 850,572 880,556" stroke="#f3b99a" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M750,570 C800,586 860,578 890,548" stroke="#c9906c" strokeOpacity=".25" strokeWidth="6" fill="none" strokeLinecap="round" />
            <BabyProfile x={736} y={520} s={0.86} rot={-48} wake />
            <g className="kick"><ellipse cx="778" cy="500" rx="9" ry="10" fill="url(#skinBb)" /><path d="M772,494 l-1,-5 M777,492 l0,-5 M782,494 l1,-5" stroke="#e7a883" strokeWidth="2.4" strokeLinecap="round" /></g>
          </g>
          <path d="M846,584 L868,575" stroke="#e6a27a" strokeWidth="15" strokeLinecap="round" /><Hand x={872} y={573} r={58} s={0.95} tone="a" />
          <path d="M704,568 C728,614 794,620 846,584" stroke="#18a094" strokeWidth="32" fill="none" strokeLinecap="round" />
          <path d="M708,572 C732,620 796,626 848,590" stroke="#0e6f66" strokeOpacity=".25" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M792,608 L778,604" stroke="#e6a27a" strokeWidth="15" strokeLinecap="round" /><Hand x={770} y={603} r={-84} s={0.95} tone="a" />
          <path d="M894,540 C902,592 852,622 792,608" stroke="#18a094" strokeWidth="30" fill="none" strokeLinecap="round" />
          <path d="M890,546 C898,594 850,626 790,612" stroke="#0e6f66" strokeOpacity=".25" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
        <Hearts x={760} y={470} n={6} />
        {[[690, 340], [930, 400]].map(([x, y], k) => <path key={k} className="tw" style={{ animationDelay: `${k * 0.8}s` }} d={`M${x},${y - 12} L${x + 3},${y - 3} L${x + 12},${y} L${x + 3},${y + 3} L${x},${y + 12} L${x - 3},${y + 3} L${x - 12},${y} L${x - 3},${y - 3} Z`} fill="#fff7c2" />)}
      </g></g>

      {/* 2 · lullaby: star mobile swings, notes and dreams float up */}
      <g className="s-char" data-i="2" style={{ opacity: 0 }}><g transform={T(22)}>
        <Aura cy={500} />
        <Ground cx={800} rx={170} />
        <path d="M800,236 L800,306 M716,306 L884,306" stroke="#8a6b4a" strokeWidth="5" fill="none" strokeLinecap="round" />
        {[[728, 346], [800, 376], [872, 346]].map(([x, y], k) => (
          <g key={k} className="swing" style={{ transformOrigin: `${x}px 306px`, animationDelay: `${k * 0.6}s` }}>
            <line x1={x} y1="306" x2={x} y2={y - 20} stroke="#8a6b4a" strokeWidth="2" />
            <polygon points={star(x, y, 22)} fill="#ffd36b" stroke="#ffb347" strokeWidth="2" strokeLinejoin="round" />
          </g>
        ))}
        <g className="cradle">
        <rect x="640" y="462" width="320" height="16" rx="8" fill="#c98f5a" />
        {Array.from({ length: 9 }, (_, k) => <rect key={k} x={656 + k * 36} y="470" width="8" height="96" rx="4" fill="#e3b07d" />)}
        <rect x="640" y="552" width="320" height="26" rx="12" fill="#c98f5a" />
        <rect x="652" y="578" width="16" height="90" rx="8" fill="#c98f5a" /><rect x="932" y="578" width="16" height="90" rx="8" fill="#c98f5a" />
        <rect x="662" y="534" width="276" height="26" rx="13" fill="#fff" />
        <g className="breathe">
          <ellipse cx="732" cy="548" rx="52" ry="15" fill="#fff" /><ellipse cx="732" cy="552" rx="46" ry="9" fill="#e9dfd2" opacity=".6" />
          <BabyProfile x={728} y={520} s={0.9} rot={-62} />
          <path d="M752,538 C790,500 896,500 938,540 L938,556 L740,556 Z" fill="#7bd0c4" />
          <path d="M760,540 C800,514 880,514 930,544" stroke="#4fb3a6" strokeOpacity=".5" strokeWidth="3" fill="none" />
          {[790, 836, 884].map((x) => <circle key={x} cx={x} cy="534" r="5" fill="#fff" opacity=".7" />)}
        </g>
        </g>
        {["z", "z", "Z"].map((z, k) => <text key={k} className="zz" x={770 + k * 26} y={500 - k * 6} fontSize={22 + k * 8} fontWeight="700" fill="#fff" style={{ animationDelay: `${k * 1.3}s`, fontFamily: "var(--font-fraunces), sans-serif" }}>{z}</text>)}
        {["♪", "♫", "♪"].map((n, k) => <text key={k} className="floatup" x={650 + k * 150} y={300} fontSize="34" fill="#fff7c2" style={{ animationDelay: `${k * 1.7}s`, ["--dx" as string]: `${k % 2 ? 40 : -40}px` } as CSSProperties}>{n}</text>)}
      </g></g>

      {/* 3 · childhood: pure joy, a skip in every step */}
      <g className="s-char" data-i="3" style={{ opacity: 0 }}><g transform={T(30)}>
        <Aura cy={440} />
        <Ground rx={80} />
        <Butterfly x={640} y={420} c="#ff8fb1" /><Butterfly x={940} y={380} c="#ffd36b" d={-4} />
        <g className="hop">
          <g className="bob">
            <path d="M746,408 C730,350 764,330 736,290" stroke="#5b5878" strokeWidth="2" fill="none" />
            <ellipse cx="730" cy="236" rx="44" ry="54" fill="#ff6b6b" /><ellipse cx="716" cy="216" rx="10" ry="18" fill="#fff" opacity=".5" />
            <path d="M724,288 l6,10 l6,-10 Z" fill="#e24d4d" />
          </g>
          <g className="legL"><path d="M782,560 L784,646 L802,646 L804,560Z" fill="url(#skinK)" /><path d="M776,648 C776,640 806,640 810,648 L812,660 C800,664 782,664 774,660Z" fill="#ff6b6b" /><path d="M774,658 L812,658" stroke="#fff" strokeWidth="3" /></g>
          <g className="legR"><path d="M798,560 L800,646 L818,646 L820,560Z" fill="url(#skinK)" /><path d="M792,648 C792,640 822,640 826,648 L828,660 C816,664 798,664 790,660Z" fill="#ff6b6b" /><path d="M790,658 L828,658" stroke="#fff" strokeWidth="3" /></g>
          <path d="M764,470 C762,520 764,556 772,574 L828,574 C836,556 838,520 836,470 C826,458 774,458 764,470Z" fill="url(#boyTee)" />
          <path d="M768,504 C792,512 810,512 834,504 M770,530 C794,538 812,538 832,530" stroke="#fff" strokeOpacity=".5" strokeWidth="5" fill="none" />
          <path d="M784,466 L800,486 L816,466 L808,460 L800,470 L792,460Z" fill="#f4f9fe" stroke="#a7c9e6" strokeWidth="1" /><circle cx="800" cy="494" r="2.4" fill="#f4f9fe" /><circle cx="800" cy="508" r="2.4" fill="#f4f9fe" />
          <path d="M770,544 L830,544 L834,584 L800,584 L766,584Z" fill="#4f7cff" /><path d="M800,556 L800,584" stroke="#2f56d0" strokeWidth="2" /><rect x="808" y="552" width="14" height="12" rx="3" fill="none" stroke="#2f56d0" strokeWidth="2" />
          <Limb pts={[768, 484, 742, 452, 746, 416]} w1={15} w2={12} tone="k" /><Hand x={746} y={408} r={0} s={0.85} tone="k" />
          <g className="wave"><Limb pts={[832, 486, 858, 482, 872, 452]} w1={15} w2={12} tone="k" /><Hand x={873} y={443} r={10} s={0.85} tone="k" /></g>
          <Head x={800} y={424} s={1.42} tone="k" hair="boy" look={[1, 0]} mouth="laugh" />
        </g>
        <Hearts x={800} y={380} n={3} fill="#ffd36b" spread={50} />
      </g></g>

      {/* 4 · her turn: flowers, petals and a quiet smile */}
      <g className="s-char" data-i="4" style={{ opacity: 0 }}><g transform={T(28)}>
        <Aura />
        <Ground rx={105} />
        <Butterfly x={930} y={440} c="#fff" /><Butterfly x={660} y={380} c="#ff8fb1" d={-6} />
        <g className="breathe">
          <path d="M774,372 C766,430 750,520 718,666 L884,666 C862,560 848,430 832,372 Z" fill="url(#dressY)" />
          <path d="M770,470 C792,484 812,484 838,470" stroke="#ff7a66" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M786,500 C780,560 770,620 758,664 M820,500 C826,560 832,620 842,664" stroke="#b86d12" strokeOpacity=".3" strokeWidth="3" fill="none" />
          <path d="M788,372 L802,398 L818,372Z" fill="url(#skinB)" />
          <g className="sway"><g className="nod"><Head x={802} y={332} s={1} tilt={-2} tone="b" hair="long" look={[1, 1]} mouth="smile" /></g></g>
          <Limb pts={[780, 392, 764, 450, 794, 488]} w1={15} w2={12} tone="b" />
          <g className="wave">
            <path d="M800,494 L780,442 M800,494 L800,428 M800,494 L822,442" stroke="#3aa76d" strokeWidth="4" strokeLinecap="round" />
            <circle cx="778" cy="434" r="15" fill="#ff8fb1" /><circle cx="800" cy="420" r="16" fill="#fff" /><circle cx="824" cy="434" r="15" fill="#ffd36b" />
            <circle cx="778" cy="434" r="5" fill="#ffd36b" /><circle cx="800" cy="420" r="5" fill="#ff8fb1" /><circle cx="824" cy="434" r="5" fill="#ff7a66" />
            <path d="M774,490 L826,490 L800,538 Z" fill="#ff7a66" />
          </g>
          <Limb pts={[826, 392, 846, 450, 808, 490]} w1={15} w2={12} tone="b" /><Hand x={800} y={494} r={0} s={0.8} tone="b" />
        </g>
        {[0, 1, 2, 3, 4].map((k) => <ellipse key={k} className="petal" cx={740 + k * 36} cy="260" rx="6" ry="3.5" fill={k % 2 ? "#ff8fb1" : "#fff"} style={{ animationDelay: `${k * 1.3}s`, ["--dx" as string]: `${(k % 2 ? 1 : -1) * 50}px` } as CSSProperties} />)}
        <Hearts x={800} y={400} n={3} fill="#ff8fb1" />
      </g></g>

      {/* 5 · together: a hug of a family */}
      <g className="s-char" data-i="5" style={{ opacity: 0 }}><g transform={T(26)}>
        <Aura cy={500} />
        <Ground rx={190} cx={800} />
        <g className="breathe">
          {/* mother */}
          <g transform="translate(-6,0)">
            <path d="M682,392 C668,470 654,580 634,672 L776,672 C758,580 744,470 730,392 Z" fill="url(#dressT)" />
            <path d="M700,480 C694,560 686,620 676,670 M740,480 C746,560 752,620 762,670" stroke="#0e6f66" strokeOpacity=".3" strokeWidth="3" fill="none" />
            <path d="M694,392 L706,414 L720,392Z" fill="url(#skinA)" />
            <g className="nod"><Head x={706} y={366} s={0.96} tilt={5} tone="a" hair="long" look={[2, 2]} mouth="smile" /></g>
          </g>
          {/* father: collared shirt tucked into a belt, long trouser legs, leather shoes */}
          <g transform="translate(10,0)">
            <path d="M866,562 L934,562 L939,688 L906,688 L900,626 L894,688 L861,688Z" fill="url(#pantG)" />
            <path d="M881,576 L876,684 M919,576 L924,684" stroke="#1a1f45" strokeOpacity=".5" strokeWidth="2.2" fill="none" />
            <path d="M861,682 L894,682 M906,682 L939,682" stroke="#1a1f45" strokeOpacity=".6" strokeWidth="3" />
            <path d="M856,688 C856,697 896,699 898,688Z M902,688 C902,697 942,699 944,688Z" fill="#241c28" />
            <path d="M864,398 C858,440 862,520 868,562 L932,562 C938,520 942,440 936,398 C926,388 874,388 864,398Z" fill="url(#shirtG)" />
            {[874, 884, 894, 906, 916, 926].map((x) => <path key={x} d={`M${x},404 L${x + (x < 900 ? -1 : 1)},558`} stroke="#fff" strokeOpacity=".26" strokeWidth="1.6" />)}
            <path d="M868,548 C882,558 918,558 932,548 L932,562 L868,562Z" fill="#7fb6de" />
            <path d="M876,470 C874,500 872,530 870,552 M924,470 C926,500 928,530 930,552" stroke="#2f6aa0" strokeOpacity=".25" strokeWidth="2.6" fill="none" />
            <rect x="862" y="558" width="76" height="10" rx="3" fill="#6b4226" /><rect x="893" y="559" width="14" height="8" rx="2" fill="#d9b25b" stroke="#a98530" strokeWidth="1" />
            <path d="M886,392 L900,418 L880,408Z M914,392 L900,418 L920,408Z" fill="#f4f9fe" stroke="#a7c9e6" strokeWidth="1" />
            <path d="M900,418 L900,558" stroke="#2f6aa0" strokeOpacity=".4" strokeWidth="2" />
            {[436, 468, 500, 532].map((cy) => <circle key={cy} cx="900" cy={cy} r="2.8" fill="#f4f9fe" stroke="#2f6aa0" strokeWidth=".8" />)}
            <path d="M874,446 L894,446 L894,470 L884,476 L874,470Z" fill="none" stroke="#2f6aa0" strokeOpacity=".55" strokeWidth="1.6" />
            <g className="nod"><Head x={901} y={358} s={1.02} tilt={-4} tone="b" hair="man" look={[-2, 2]} mouth="smile" /></g>
          </g>
          {/* child (girl), holding both parents' hands */}
          <g>
            <path d="M792,624 L792,676 L801,676 L801,624Z M806,624 L806,676 L815,676 L815,624Z" fill="url(#skinK)" />
            <path d="M791,654 L791,678 L802,678 L802,654Z M805,654 L805,678 L816,678 L816,654Z" fill="#fff" />
            <path d="M786,678 C786,672 804,672 804,678 L805,686 L784,686Z M804,678 C804,672 822,672 822,678 L824,686 L803,686Z" fill="#e0457e" />
            <path d="M780,528 C778,548 780,560 776,572 C770,596 764,618 758,634 C776,646 824,646 842,634 C836,618 830,596 824,572 C820,560 822,548 820,528 C810,518 790,518 780,528Z" fill="url(#dressK)" />
            <path d="M758,634 C766,642 774,642 780,636 C786,644 794,644 800,638 C806,644 814,644 820,636 C826,642 834,642 842,634" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round" />
            <rect x="779" y="554" width="42" height="7" rx="3" fill="#fff" opacity=".85" /><path d="M800,557 l-8,-7 v14z M800,557 l8,-7 v14z" fill="#fff" opacity=".9" />
            {[[784, 586], [806, 596], [792, 612], [818, 610], [774, 622], [830, 624]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="#fff" opacity=".7" />)}
            <circle cx="784" cy="538" r="7" fill="url(#dressK)" /><circle cx="816" cy="538" r="7" fill="url(#dressK)" />
            <Limb pts={[786, 540, 778, 556, 776, 566]} w1={10} w2={9} tone="k" />
            <Limb pts={[816, 540, 824, 556, 826, 566]} w1={10} w2={9} tone="k" />
            <g className="nod"><Head x={800} y={496} s={0.95} tilt={2} tone="k" hair="pigtails" look={[0, -1]} mouth="laugh" /></g>
          </g>
          {/* arms and hands, drawn last so they overlap the bodies */}
          <Limb pts={[728, 424, 742, 498, 772, 560]} w1={14} w2={11} tone="a" />
          <path d="M728,426 L737,470" stroke="#33c9bb" strokeWidth="19" strokeLinecap="round" />
          <Limb pts={[886, 426, 866, 498, 832, 560]} w1={15} w2={11} tone="b" />
          <path d="M886,428 L871,486" stroke="#7fb8e6" strokeWidth="22" strokeLinecap="round" /><path d="M862,486 L880,492" stroke="#e8f3fc" strokeWidth="9" strokeLinecap="round" />
          <Hand x={775} y={566} r={180} s={0.62} tone="k" /><Hand x={826} y={568} r={180} s={0.62} tone="k" />
          <Hand x={771} y={566} r={176} s={0.86} tone="a" /><Hand x={832} y={568} r={184} s={0.88} tone="b" />
          {/* outer arms */}
          <Limb pts={[682, 426, 666, 498, 662, 562]} w1={14} w2={11} tone="a" />
          <path d="M682,428 L671,472" stroke="#33c9bb" strokeWidth="19" strokeLinecap="round" />
          <Hand x={662} y={570} r={180} s={0.86} tone="a" />
          <Limb pts={[946, 428, 960, 498, 956, 562]} w1={15} w2={11} tone="b" />
          <path d="M946,430 L957,486" stroke="#7fb8e6" strokeWidth="22" strokeLinecap="round" /><path d="M950,488 L966,486" stroke="#e8f3fc" strokeWidth="9" strokeLinecap="round" />
          <Hand x={956} y={570} r={180} s={0.88} tone="b" />
        </g>
        <Hearts x={800} y={420} n={7} spread={60} />
      </g></g>
    </>
  );
}

export default memo(Characters);
