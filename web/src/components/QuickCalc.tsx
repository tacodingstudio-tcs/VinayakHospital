"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const cls = "flex items-center gap-2 rounded-full bg-[#1f7a68] px-4 py-3 text-sm font-bold text-white shadow-xl transition-transform hover:scale-105";
const svg = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

// Floating shortcuts to two popular tools. Each hides on its own page and in the admin, and on the homepage
// they appear only after the opening story has scrolled out of view.
export default function QuickCalc() {
  const path = usePathname();
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(path !== "/" || window.scrollY > window.innerHeight * 0.8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);
  if (!past || path.startsWith("/admin")) return null;
  const onCalc = path.startsWith("/resources/pregnancy-calculator");
  const onVacc = path.startsWith("/resources/vaccination-tracker");
  return (
    <div className="fixed bottom-4 left-3 z-30 flex flex-col items-start gap-2 md:left-6">
      {!onVacc && (
        <Link href="/resources/vaccination-tracker" className={cls} aria-label="Child vaccination tracker, free tool">
          <svg {...svg}><path d="M15 3l6 6M17 5l-9 9-3 3v3h3l3-3 9-9M12 8l4 4M8 12l4 4" /></svg>
          <span className="hidden sm:inline">Vaccination tracker</span><span className="sm:hidden">Vaccines</span>
        </Link>
      )}
      {!onCalc && (
        <Link href="/resources/pregnancy-calculator" className={cls} aria-label="Pregnancy due date calculator, free tool">
          <svg {...svg}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
          <span className="hidden sm:inline">Due date calculator</span><span className="sm:hidden">Due date</span>
        </Link>
      )}
    </div>
  );
}
