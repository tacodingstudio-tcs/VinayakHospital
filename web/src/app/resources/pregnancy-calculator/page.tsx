import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator",
  description: "Estimate your due date and current pregnancy week with the Vinayak Children & Maternity Hospital pregnancy calculator.",
  alternates: { canonical: "/resources/pregnancy-calculator" },
};

export default function Page() {
  return (<><PageHero image="/img/pregnancy-journey.jpg" eyebrow="Pregnancy" title={<>When might your little one <em className="text-clay">arrive?</em></>} /><Calculator /></>);
}
