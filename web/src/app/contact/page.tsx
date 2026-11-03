import type { Metadata } from "next";
import { Suspense } from "react";
import AppointmentForm from "@/components/AppointmentForm";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book an Appointment & Contact",
  description: `Book with our pediatrician or gynecologist in Kodinar, or call ${site.phone}. OPD ${site.opd}. Emergency 24/7.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero image="/img/reception.jpeg" eyebrow="Contact" title={<>Your family&rsquo;s care starts with <em className="text-clay">a conversation.</em></>} />
      <section className="wrap grid gap-5 pb-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="reveal card p-5 md:p-7">
          <Suspense fallback={<div className="min-h-[470px]" aria-hidden />}><AppointmentForm /></Suspense>
        </div>
        <aside className="reveal space-y-6">
          <div>
            <p className="eyebrow">Call or WhatsApp</p>
            <a href={`tel:${site.tel}`} className="display mt-2 block text-4xl">{site.phone}</a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-4">Message on WhatsApp</a>
          </div>
          <div><p className="eyebrow">Hours</p><p className="mt-2">OPD: {site.opd}</p><p>Emergency: {site.emergency}</p></div>
          <div><p className="eyebrow">Visit</p><address className="mt-2 not-italic">{site.address}</address></div>
          <div><p className="eyebrow">Email</p><a href={`mailto:${site.email}`} className="mt-2 block break-all underline underline-offset-4">{site.email}</a></div>
        </aside>
      </section>
      <section className="wrap pb-8">
        <div className="reveal card aspect-[16/9] overflow-hidden bg-cream-2 md:aspect-[21/7]">
          <iframe src={site.mapEmbed} title={`${site.name} location`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
        </div>
        <a href={site.map} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">Get directions <span aria-hidden>→</span></a>
      </section>
    </>
  );
}
