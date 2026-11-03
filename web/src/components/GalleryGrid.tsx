"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Item = { src: string; alt: string; cat: string };

// Staggered photo wall with a keyboard-accessible full-screen viewer.
export default function GalleryGrid({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, items.length]);

  return (
    <>
      <ul className="wrap grid grid-cols-2 items-start gap-4 pb-8 md:grid-cols-3 md:gap-5">
        {items.map((it, i) => (
          <li key={it.src} className={`reveal ${i % 3 === 1 ? "md:mt-6" : i % 3 === 2 ? "md:mt-5" : ""}`}>
            <button onClick={() => setOpen(i)} className="group block w-full text-left">
              <div className={`relative overflow-hidden bg-cream-2 ${i % 2 ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
                <Image src={it.src} alt={it.alt} fill sizes="(max-width:768px) 50vw, 33vw" priority={i < 2} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <span className="folio mt-3 flex justify-between text-ink-soft"><span>{String(i + 1).padStart(2, "0")}</span><span>{it.cat}</span></span>
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dlg} onClose={() => setOpen(null)} onClick={(e) => { if (e.target === dlg.current) setOpen(null); }} className="m-0 h-full max-h-none w-full max-w-none bg-ink/95 p-0 backdrop:bg-ink" aria-label="Photo viewer">
        {open !== null && (
          <div className="relative flex h-full w-full items-center justify-center p-6 md:p-14">
            <div className="relative h-full w-full"><Image src={items[open].src} alt={items[open].alt} fill sizes="100vw" className="object-contain" /></div>
            <p className="folio absolute bottom-5 left-6 !text-cream">{items[open].cat} · {items[open].alt}</p>
            <button onClick={() => setOpen(null)} className="folio absolute right-5 top-5 border border-cream/60 px-4 py-2 !text-cream">Close</button>
            <button onClick={() => setOpen((open - 1 + items.length) % items.length)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-cream/60 text-cream">←</button>
            <button onClick={() => setOpen((open + 1) % items.length)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center border border-cream/60 text-cream">→</button>
          </div>
        )}
      </dialog>
    </>
  );
}
