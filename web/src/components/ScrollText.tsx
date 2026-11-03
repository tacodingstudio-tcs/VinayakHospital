"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Words light up one by one as the reader scrolls. Words wrapped like *this* are set in italic accent colour.
// Without motion (or JS) the text simply stays fully visible.
export default function ScrollText({ text, className = "", accent = "text-clay" }: { text: string; className?: string; accent?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const words = ref.current.querySelectorAll(".sw");
    const ctx = gsap.context(() => {
      gsap.fromTo(words, { opacity: 0.72 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 50%", scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => {
        const em = w.startsWith("*");
        return <span key={i} className={`sw inline-block pr-[0.25em] ${em ? `italic ${accent}` : ""}`}>{em ? w.replace(/\*/g, "") : w}</span>;
      })}
    </p>
  );
}
