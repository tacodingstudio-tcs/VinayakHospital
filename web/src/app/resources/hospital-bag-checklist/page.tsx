import type { Metadata } from "next";
import BagChecklist from "@/components/BagChecklist";
import PageHero from "@/components/PageHero";
import { getContent, type BagCategory } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospital Bag Checklist",
  description: "A practical hospital bag checklist for mothers, babies and companions from Vinayak Children & Maternity Hospital.",
  alternates: { canonical: "/resources/hospital-bag-checklist" },
};

export default async function Page() {
  const cats = (await getContent<BagCategory[]>("hospital-bag")) ?? [];
  return (
    <>
      <PageHero image="/img/birth-journey.jpg" eyebrow="Pregnancy" title={<>Pack once, <em className="text-clay">feel ready.</em></>} intro="Tick items off as you pack. Check with the hospital about what is provided during your stay." />
      {cats.length ? <BagChecklist cats={cats} /> : <p className="wrap pb-8" role="alert">Checklist is temporarily unavailable.</p>}
    </>
  );
}
