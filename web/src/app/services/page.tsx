import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServicesExplorer from "@/components/ServicesExplorer";
import { departments } from "@/content/site";

export const metadata: Metadata = {
  title: "Services & Departments",
  description: "Pediatric care, gynecology & maternity care, diagnostics and 24/7 emergency services in Kodinar.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  const total = departments.reduce((n, d) => n + d.items.length, 0);
  return (
    <>
      <PageHero eyebrow={`${total} services · ${departments.length} departments`} title={<>Care for every <em>stage.</em></>} intro="Choose a department to see its services. Call us if you are not sure where to start." />
      <ServicesExplorer />
    </>
  );
}
