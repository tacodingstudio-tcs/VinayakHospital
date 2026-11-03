"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { doctors, site } from "@/content/site";

type Errors = Record<string, string[]>;

export default function AppointmentForm() {
  const params = useSearchParams();
  const pre = params.get("doctor") ?? "";
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const today = new Date().toISOString().slice(0, 10);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("busy");
    setErrors({});
    try {
      const res = await fetch(`${site.api}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: f.get("fullName"), mobileNumber: f.get("mobile"), email: f.get("email"),
          doctorName: f.get("doctor"), appointmentDate: f.get("date"), message: f.get("message"), website: f.get("website"),
        }),
      });
      if (res.ok) return setState("done");
      const data = await res.json().catch(() => ({}));
      setErrors(res.status === 429 ? { form: ["Too many requests. Please call us instead."] } : (data.errors ?? { form: ["Something went wrong. Please try again or call us."] }));
      setState("error");
    } catch {
      setErrors({ form: ["Could not reach the server. Please call us on " + site.phone + "."] });
      setState("error");
    }
  }

  const err = (k: string) => errors[k] ?? errors[k[0].toUpperCase() + k.slice(1)];
  const E = ({ k }: { k: string }) => (err(k) ? <p role="alert" className="mt-1 text-sm text-clay-dark">{err(k)![0]}</p> : null);

  if (state === "done")
    return (
      <div role="status" className="rounded-3xl bg-sage/15 p-10">
        <p className="display text-4xl">Request received.</p>
        <p className="mt-4 text-lg text-ink-soft">Thank you. Our team will contact you shortly to confirm your appointment. For anything urgent, call <a className="underline" href={`tel:${site.tel}`}>{site.phone}</a>.</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-10 gap-y-7 md:grid-cols-2" aria-label="Book an appointment">
      <div>
        <label htmlFor="a-name" className="eyebrow">Full name *</label>
        <input id="a-name" name="fullName" required autoComplete="name" className="field" aria-invalid={!!err("fullName")} />
        <E k="fullName" />
      </div>
      <div>
        <label htmlFor="a-mobile" className="eyebrow">Mobile number *</label>
        <input id="a-mobile" name="mobile" required inputMode="numeric" autoComplete="tel-national" placeholder="10-digit number" className="field" aria-invalid={!!err("mobileNumber")} />
        <E k="mobileNumber" />
      </div>
      <div>
        <label htmlFor="a-email" className="eyebrow">Email (optional)</label>
        <input id="a-email" name="email" type="email" autoComplete="email" className="field" />
        <E k="email" />
      </div>
      <div>
        <label htmlFor="a-date" className="eyebrow">Preferred date *</label>
        <input id="a-date" name="date" type="date" min={today} required className="field" />
        <E k="appointmentDate" />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="a-doc" className="eyebrow">Doctor *</label>
        <select id="a-doc" name="doctor" required defaultValue={doctors.some((d) => d.name === pre) ? pre : ""} className="field">
          <option value="" disabled>Choose a doctor</option>
          {doctors.map((d) => <option key={d.slug} value={d.name}>{d.name} — {d.specialty}</option>)}
        </select>
        <E k="doctorName" />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="a-msg" className="eyebrow">Message (optional)</label>
        <textarea id="a-msg" name="message" rows={3} maxLength={600} className="field" />
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="md:col-span-2">
        <button className="btn btn-clay" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Request appointment"} <span aria-hidden>→</span></button>
        {errors.form && <p role="alert" className="mt-4 text-clay-dark">{errors.form[0]}</p>}
        <p className="mt-4 text-sm text-ink-soft">This is a request, not a confirmed slot. We will call you to confirm.</p>
      </div>
    </form>
  );
}
