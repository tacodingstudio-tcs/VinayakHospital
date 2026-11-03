import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cover, getPost } from "@/lib/blog";
import { seoTitle } from "@/lib/seo";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getPost(params.slug);
  return p ? { title: seoTitle(p.title), description: p.summary, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: "article", images: [cover(p.coverImage)] } } : {};
}

export default async function Post({ params }: { params: { slug: string } }) {
  const p = await getPost(params.slug);
  if (!p) notFound();
  const paras = (p.content ?? "").split(/\r?\n\s*\r?\n/).map((s) => s.trim()).filter(Boolean);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.summary, datePublished: p.createdAt, dateModified: p.updatedAt ?? p.createdAt, image: `${site.url}${cover(p.coverImage)}`, publisher: { "@type": "Organization", name: site.name } };
  return (
    <article className="pt-[130px] pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="wrap max-w-3xl">
        <Link href="/blog" className="eyebrow">← Health library</Link>
        <p className="eyebrow mt-5 !text-ink-soft">{p.category} · {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        <h1 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)]">{p.title}</h1>
        <p className="mt-6 text-xl text-ink-soft">{p.summary}</p>
      </div>
      <div className="wrap mt-12 max-w-5xl"><div className="img-frame relative aspect-[16/8] rounded-[28px] bg-cream-2"><Image src={cover(p.coverImage)} alt="" fill priority sizes="(max-width:1024px) 100vw, 1000px" className="object-cover" /><span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Illustration</span></div></div>
      <div className="wrap mt-12 max-w-3xl space-y-6 text-lg leading-relaxed">
        {paras.map((t, i) => <p key={i}>{t}</p>)}
        <p className="rounded-2xl bg-cream-2 p-6 text-sm text-ink-soft">General information only, not medical advice. Please speak to your doctor about your own situation.</p>
        <Link href="/contact" className="btn btn-clay">Book an appointment</Link>
      </div>
    </article>
  );
}
