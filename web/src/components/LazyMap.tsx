"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

// The same Google map, but it is only fetched when it is about to scroll into view (or when tapped),
// so Google's scripts do not load with the rest of the page.
export default function LazyMap({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = box.current; if (!el || on) return;
    if (!("IntersectionObserver" in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, [on]);

  return (
    <div ref={box} className={`relative bg-gradient-to-br from-[#d9efe9] to-[#bfe3da] ${className}`}>
      {on ? (
        <iframe src={site.mapEmbed} title={`${site.name} location`} referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-4 text-center">
          <div>
            <p className="display text-xl text-[#176553]">{site.short}</p>
            <p className="mt-1 text-sm text-ink-soft">{site.address}</p>
            <button onClick={() => setOn(true)} className="btn btn-clay mt-3 !py-2 !text-sm">Show map</button>
          </div>
        </div>
      )}
    </div>
  );
}
