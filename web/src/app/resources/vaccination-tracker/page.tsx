import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VaccinationTracker from "@/components/VaccinationTracker";
import { getContent, type Vaccine } from "@/lib/content";

export const metadata: Metadata = {
  title: "Child Vaccination Tracker",
  description: "Keep your child's vaccination information organized with the Vinayak Children & Maternity Hospital vaccination tracker.",
  alternates: { canonical: "/resources/vaccination-tracker" },
};

export default async function Page() {
  const schedule = (await getContent<Vaccine[]>("vaccination")) ?? [];
  return (
    <>
      <PageHero image="/img/child-checkup-2.jpeg" eyebrow="Child health" title={<>Every dose, <em className="text-clay">on record.</em></>} intro="Add your child's date of birth to see an approximate schedule and mark vaccines as given." />
      <section className="wrap pb-6" aria-labelledby="vi-h">
        <h2 id="vi-h" className="display text-2xl md:text-3xl">Good to know about vaccination</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Why vaccinate", "Vaccines help protect your child from serious preventable illnesses, and following the schedule helps protect other children too."],
            ["Keep the vaccination card", "Ask for the card or record at every visit and bring it each time. It shows what was given and what is due next."],
            ["Before the visit", "Tell the doctor if your child is unwell, has had a reaction before, or has any allergies, so the doctor can advise on timing."],
            ["After the vaccine", "Mild soreness at the injection site, a low fever or fussiness for a day or two is common. Offer feeds and rest, and ask your doctor what is safe to give."],
            ["When to call the doctor", `Call us on ${"+91 90708 09010"} or come in if your child has a high fever, will not stop crying, is very sleepy or unusually weak, or you are worried for any reason.`],
            ["If a dose is missed", "Do not skip it. Talk to your pediatrician, who can tell you when to catch up. You usually do not need to restart the whole series."],
          ].map(([t, d]) => <div key={t} className="card p-4"><h3 className="display text-lg">{t}</h3><p className="mt-1 text-[15px] text-ink-soft">{d}</p></div>)}
        </div>
      </section>
      {schedule.length > 0 && (
        <section className="wrap pb-6" aria-labelledby="vg-h">
          <h2 id="vg-h" className="display text-2xl md:text-3xl">Important vaccines at a glance</h2>
          <p className="mt-1 max-w-2xl text-ink-soft">A general reference by age. Timing and the vaccines used can vary, so always confirm with your pediatrician.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from(new Set(schedule.map((v) => v.ageGroup))).map((g) => {
              const vs = schedule.filter((v) => v.ageGroup === g);
              return (
                <div key={g} className="card p-4">
                  <p className="folio text-clay">{g} · {vs[0].timingLabel}</p>
                  <ul className="mt-2 space-y-1.5">{vs.map((v) => <li key={v.id} className="flex gap-2 text-[15px]"><span className="text-clay" aria-hidden>•</span><span><span className="font-bold">{v.name}</span>{vs.length === 1 || v.timingLabel !== vs[0].timingLabel ? <span className="text-ink-soft"> · {v.timingLabel}</span> : null}</span></li>)}</ul>
                </div>
              );
            })}
          </div>
        </section>
      )}
      {schedule.length ? <VaccinationTracker schedule={schedule} /> : <p className="wrap pb-8" role="alert">Schedule is temporarily unavailable.</p>}
    </>
  );
}
