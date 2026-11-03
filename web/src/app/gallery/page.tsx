import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A glimpse inside Vinayak Children & Maternity Hospital in Kodinar: maternity, newborn, pediatric, laboratory, NICU and emergency care.",
  alternates: { canonical: "/gallery" },
};

const items = [
  { src: "/img/reception.jpeg", alt: "Reception", cat: "Welcome" },
  { src: "/img/child-checkup-1.jpeg", alt: "A child's check-up with the pediatrician", cat: "Pediatric" },
  { src: "/img/newborn-care.jpeg", alt: "Newborn care", cat: "Newborn" },
  { src: "/img/doctor-profile.jpeg", alt: "Doctor consultation", cat: "Doctor" },
  { src: "/img/operation-theatre.jpeg", alt: "Operation theatre", cat: "Operation theatre" },
  { src: "/img/Laboratory.jpg", alt: "Medical laboratory", cat: "Laboratory" },
  { src: "/img/child-checkup-2.jpeg", alt: "Child consultation", cat: "Consultation" },
  { src: "/img/EMERGENCY.jpg", alt: "Emergency care", cat: "Emergency" },
];

export default function Gallery() {
  return (
    <>
      <PageHero image="/img/operation-theatre.jpeg" eyebrow="Gallery" title={<>Inside <em>Vinayak.</em></>} intro="A glimpse into our facilities and the care we give every day. Select a photo to view it full screen." />
      <GalleryGrid items={items} />
    </>
  );
}
