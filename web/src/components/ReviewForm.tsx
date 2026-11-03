"use client";
import { useState } from "react";
import { site } from "@/content/site";

export default function ReviewForm() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [rating, setRating] = useState(0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rating) return setState("error");
    const f = new FormData(e.currentTarget);
    setState("busy");
    try {
      const res = await fetch(`${site.api}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: f.get("name"), city: f.get("city"), rating, reviewMessage: f.get("message"), website: f.get("website") }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return <p role="status" className="reveal mt-5 rounded-3xl bg-sage/15 p-6 text-lg">Thank you. Your review has been received and will appear once our team has checked it.</p>;

  return (
    <form onSubmit={submit} className="reveal mt-5 grid gap-x-8 gap-y-4 rounded-3xl border border-ink/10 p-5 md:grid-cols-2 md:p-8" aria-label="Share your experience">
      <h3 className="display md:col-span-2 text-2xl">Share your experience</h3>
      <div>
        <label htmlFor="r-name" className="eyebrow">Your name</label>
        <input id="r-name" name="name" required maxLength={80} className="field" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="r-city" className="eyebrow">City (optional)</label>
        <input id="r-city" name="city" maxLength={60} className="field" />
      </div>
      <fieldset className="md:col-span-2">
        <legend className="eyebrow">Rating</legend>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={rating === n} className={`text-3xl transition-transform hover:scale-110 ${n <= rating ? "text-pulse" : "text-ink/20"}`}>★</button>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <label htmlFor="r-msg" className="eyebrow">Your review</label>
        <textarea id="r-msg" name="message" required rows={3} maxLength={800} className="field" />
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="md:col-span-2 flex items-center gap-4">
        <button className="btn btn-clay" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Submit review"}</button>
        {state === "error" && <p role="alert" className="text-sm text-clay-dark">{rating ? "Could not send. Please try again." : "Please choose a rating."}</p>}
      </div>
    </form>
  );
}
