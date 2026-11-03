"use client";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/content/site";

type Row = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
type Tab = "appointments" | "reviews" | "leads" | "blog";
const when = (s: string) => new Date(s).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("appointments");
  const [rows, setRows] = useState<Row[]>([]);
  const [msg, setMsg] = useState("");
  const [edit, setEdit] = useState<Row | null>(null);

  useEffect(() => { try { setToken(sessionStorage.getItem("vinayak.admin")); } catch { /* ignore */ } setReady(true); }, []);

  const call = useCallback(async (path: string, init?: RequestInit) => {
    const r = await fetch(`${site.api}/api/admin${path}`, { ...init, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(init?.headers ?? {}) } });
    if (r.status === 401) { sessionStorage.removeItem("vinayak.admin"); setToken(null); throw new Error("Session expired. Please sign in again."); }
    return r;
  }, [token]);

  const load = useCallback(async () => {
    if (!token) return;
    try { const r = await call(`/${tab}`); setRows(r.ok ? await r.json() : []); } catch (e) { setMsg((e as Error).message); }
  }, [call, tab, token]);
  useEffect(() => { load(); }, [load]);

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMsg("");
    const password = String(new FormData(e.currentTarget).get("password") || "");
    try {
      const r = await fetch(`${site.api}/api/admin/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (r.status === 429) return setMsg("Too many attempts. Please wait a few minutes.");
      if (!r.ok) return setMsg("Incorrect password.");
      const { token: t } = await r.json(); sessionStorage.setItem("vinayak.admin", t); setToken(t);
    } catch { setMsg("Could not reach the server."); }
  }

  async function act(fn: () => Promise<Response>, ok: string) {
    try { const r = await fn(); setMsg(r.ok ? ok : "That did not work. Please check the fields."); if (r.ok) { setEdit(null); load(); } } catch (e) { setMsg((e as Error).message); }
  }

  if (!ready) return null;
  if (!token)
    return (
      <section className="wrap max-w-md pt-[150px] pb-8">
        <h1 className="display text-5xl">Admin</h1>
        <form onSubmit={login} className="mt-5 space-y-6" aria-label="Admin sign in">
          <div><label htmlFor="pw" className="eyebrow">Password</label><input id="pw" name="password" type="password" required autoComplete="current-password" className="field" /></div>
          <button className="btn btn-clay">Sign in</button>
          {msg && <p role="alert" className="text-clay-dark">{msg}</p>}
        </form>
      </section>
    );

  return (
    <section className="wrap pt-[130px] pb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="display text-5xl">Admin</h1>
        <button className="underline" onClick={() => { sessionStorage.removeItem("vinayak.admin"); setToken(null); }}>Sign out</button>
      </div>
      <div role="tablist" className="mt-5 flex flex-wrap gap-2">
        {(["appointments", "reviews", "leads", "blog"] as Tab[]).map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => { setTab(t); setEdit(null); setMsg(""); }} className={`rounded-full px-5 py-2.5 text-sm font-semibold capitalize ${tab === t ? "bg-ink text-cream" : "border border-ink/20"}`}>{t === "leads" ? "Pregnancy leads" : t}</button>)}
      </div>
      {msg && <p role="status" className="mt-6 rounded-xl bg-cream-2 p-4">{msg}</p>}

      <div className="mt-5 overflow-x-auto">
        {tab === "appointments" && <table className="w-full min-w-[720px] text-left text-sm"><thead><tr className="eyebrow"><th className="py-3">Received</th><th>Name</th><th>Mobile</th><th>Doctor</th><th>Date</th><th>Message</th></tr></thead><tbody>
          {rows.map((a) => <tr key={a.id} className="border-t border-ink/10 align-top"><td className="py-3">{when(a.createdAt)}</td><td>{a.fullName}</td><td><a href={`tel:${a.mobileNumber}`} className="underline">{a.mobileNumber}</a></td><td>{a.doctorName}</td><td>{new Date(a.appointmentDate).toLocaleDateString("en-IN")}</td><td>{a.message}</td></tr>)}</tbody></table>}

        {tab === "leads" && <table className="w-full min-w-[640px] text-left text-sm"><thead><tr className="eyebrow"><th className="py-3">Received</th><th>Name</th><th>Mobile</th><th>Email</th><th>Due date</th></tr></thead><tbody>
          {rows.map((a) => <tr key={a.id} className="border-t border-ink/10"><td className="py-3">{when(a.createdAt)}</td><td>{a.name}</td><td>{a.mobile}</td><td>{a.email}</td><td>{new Date(a.estimatedDueDate).toLocaleDateString("en-IN")}</td></tr>)}</tbody></table>}

        {tab === "reviews" && <ul className="divide-y divide-ink/10">{rows.map((r) => (
          <li key={r.id} className="flex flex-wrap items-start justify-between gap-4 py-5">
            <div className="max-w-2xl"><p className="font-semibold">{r.fullName}{r.city ? ` · ${r.city}` : ""} <span className="text-pulse">{"★".repeat(r.rating)}</span> <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${r.isApproved ? "bg-sage/20" : "bg-clay/20"}`}>{r.isApproved ? "Published" : "Pending"}</span></p><p className="mt-1 text-ink-soft">{r.reviewMessage}</p></div>
            <div className="flex gap-2">
              <button className="btn btn-ghost !py-2" onClick={() => act(() => call(`/reviews/${r.id}/approve?approved=${!r.isApproved}`, { method: "POST" }), r.isApproved ? "Review hidden." : "Review published.")}>{r.isApproved ? "Hide" : "Publish"}</button>
              <button className="btn btn-ghost !py-2" onClick={() => { if (confirm("Delete this review permanently?")) act(() => call(`/reviews/${r.id}`, { method: "DELETE" }), "Review deleted."); }}>Delete</button>
            </div>
          </li>))}</ul>}

        {tab === "blog" && (edit ? (
          <form className="grid max-w-3xl gap-5" onSubmit={(e) => {
            e.preventDefault(); const f = new FormData(e.currentTarget);
            const body = JSON.stringify({ title: f.get("title"), slug: String(f.get("slug") || "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"), category: f.get("category"), summary: f.get("summary"), content: f.get("content"), coverImage: f.get("cover") || null, isPublished: f.get("pub") === "on" });
            act(() => call(edit.id ? `/blog/${edit.id}` : "/blog", { method: edit.id ? "PUT" : "POST", body }), "Post saved.");
          }}>
            {([["title", "Title"], ["slug", "Slug (web address)"], ["category", "Category"], ["cover", "Cover image path (optional, e.g. /img/newborn-care.jpeg)"]] as const).map(([n, l]) => <div key={n}><label htmlFor={`b-${n}`} className="eyebrow">{l}</label><input id={`b-${n}`} name={n} required={n !== "cover"} defaultValue={n === "cover" ? edit.coverImage ?? "" : edit[n] ?? ""} className="field" /></div>)}
            <div><label htmlFor="b-summary" className="eyebrow">Summary</label><textarea id="b-summary" name="summary" required rows={2} defaultValue={edit.summary ?? ""} className="field" /></div>
            <div><label htmlFor="b-content" className="eyebrow">Content (blank line between paragraphs)</label><textarea id="b-content" name="content" required rows={12} defaultValue={edit.content ?? ""} className="field" /></div>
            <label className="flex items-center gap-3"><input type="checkbox" name="pub" defaultChecked={edit.isPublished ?? true} className="h-5 w-5 accent-[var(--clay)]" /> Published</label>
            <div className="flex gap-3"><button className="btn btn-clay">Save post</button><button type="button" className="btn btn-ghost" onClick={() => setEdit(null)}>Cancel</button></div>
          </form>
        ) : (
          <div>
            <button className="btn btn-clay mb-6" onClick={() => setEdit({})}>New post</button>
            <ul className="divide-y divide-ink/10">{rows.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-4 py-4"><div><p className="display text-2xl">{p.title}</p><p className="text-sm text-ink-soft">{p.category} · {p.isPublished ? "Published" : "Draft"} · /blog/{p.slug}</p></div>
                <div className="flex gap-2"><button className="btn btn-ghost !py-2" onClick={() => setEdit(p)}>Edit</button><button className="btn btn-ghost !py-2" onClick={() => { if (confirm("Delete this post permanently?")) act(() => call(`/blog/${p.id}`, { method: "DELETE" }), "Post deleted."); }}>Delete</button></div></li>))}</ul>
          </div>
        ))}
        {rows.length === 0 && tab !== "blog" && <p className="py-8 text-ink-soft">Nothing here yet.</p>}
      </div>
    </section>
  );
}
