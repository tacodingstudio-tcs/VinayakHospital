import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Emergency Information",
  description: `24/7 emergency care at Vinayak Children & Maternity Hospital, Kodinar. Call ${site.phone} or come directly to the hospital.`,
  alternates: { canonical: "/emergency" },
};

const steps = [
  ["Call ahead if you can", "Calling before you arrive helps our team prepare, though don't delay coming in for a true emergency."],
  ["Come directly to the hospital", "Our address and map are below. Emergency care is available 24 hours a day, every day."],
  ["Bring what you can", "ID, any current medications, and medical records help us care for you faster — but never delay for these if time matters."],
];

export default function Emergency() {
  return (
    <>
      <section className="bg-ink pt-[140px] pb-8 text-cream">
        <div className="wrap">
          <p className="eyebrow !text-rose flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-pulse" aria-hidden />24/7 emergency care</p>
          <h1 className="display mt-5 text-[clamp(1.9rem,3.6vw,3rem)]">We&rsquo;re here, <em className="text-rose">day or night.</em></h1>
          <p className="mt-5 max-w-xl text-lg text-cream/75">If this is a life-threatening emergency, please call us immediately or come directly to the hospital.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${site.tel}`} className="btn btn-clay !text-lg">Call {site.phone}</a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">WhatsApp us</a>
          </div>
        </div>
      </section>

      <section className="wrap py-8">
        <h2 className="eyebrow">What to do in an emergency</h2>
        <ol className="mt-5 grid gap-6 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="reveal rounded-3xl bg-cream-2 p-8">
              <span className="display text-5xl text-clay">0{i + 1}</span>
              <h3 className="display mt-5 text-2xl">{t}</h3>
              <p className="mt-3 text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap pb-8">
        <h2 className="eyebrow">Find us</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="reveal card aspect-[4/3] overflow-hidden bg-cream-2">
            <iframe src={site.mapEmbed} title={`${site.name} location`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" />
          </div>
          <dl className="reveal space-y-8">
            <div><dt className="eyebrow">Address</dt><dd className="mt-2">{site.address}</dd></div>
            <div><dt className="eyebrow">Emergency line</dt><dd className="display mt-2 text-3xl"><a href={`tel:${site.tel}`}>{site.phone}</a></dd></div>
            <div><dt className="eyebrow">Hours</dt><dd className="mt-2">General OPD: {site.opd}<br />Emergency care: {site.emergency}</dd></div>
            <div><dd><a href={site.map} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Get directions</a></dd></div>
          </dl>
        </div>
        <p className="mt-12 max-w-2xl text-sm text-ink-soft">This page is for general guidance only. For a medical emergency, please call us or come to the hospital directly rather than relying solely on information from this website.</p>
      </section>
    </>
  );
}
