"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Frame that clips its content while the content drifts slower than the page. Put a `fill` <Image> inside.
export default function Parallax({ children, className = "", amount = 11 }: { children: React.ReactNode; className?: string; amount?: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !frame.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(inner.current, { yPercent: -amount }, { yPercent: amount, ease: "none", scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true } });
    }, frame);
    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-x-0 -top-[12%] h-[124%]">{children}</div>
    </div>
  );
}
