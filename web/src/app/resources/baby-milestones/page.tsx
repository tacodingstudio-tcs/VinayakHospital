import type { Metadata } from "next";
import Milestones from "@/components/Milestones";
import PageHero from "@/components/PageHero";
import { getContent, type MilestoneGroup } from "@/lib/content";

export const metadata: Metadata = {
  title: "Baby Milestones & Child Development",
  description: "Explore age-based developmental milestones for babies and children and learn how parents can support development.",
  alternates: { canonical: "/resources/baby-milestones" },
};

export default async function Page() {
  const data = await getContent<{ groups: MilestoneGroup[] }>("milestones");
  return (
    <>
      <PageHero image="/img/newborn-care.jpeg" eyebrow="Child health" title={<>Small steps, <em className="text-clay">big moments.</em></>} intro="Choose an age to see what many children are doing around then." />
      {data?.groups.length ? <Milestones groups={data.groups} /> : <p className="wrap pb-8" role="alert">Content is temporarily unavailable.</p>}
    </>
  );
}
