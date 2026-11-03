import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { cover, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Health Library & Blog",
  description: "Health articles on pregnancy, newborn care and child health from the doctors at Vinayak Children & Maternity Hospital.",
  alternates: { canonical: "/blog" },
};

export default async function Blog({ searchParams }: { searchParams: { category?: string } }) {
  const all = await getPosts();
  const cats = Array.from(new Set(all.map((p) => p.category)));
  const cat = searchParams.category;
  const posts = cat ? all.filter((p) => p.category === cat) : all;
  return (
    <>
      <PageHero image="/img/newborn-care.jpeg" eyebrow="Health library" title={<>Read, learn, <em className="text-clay">ask.</em></>} intro="Practical articles from our team. General information, not a substitute for a consultation." />
      <div className="wrap pb-8">
        {cats.length > 1 && (
          <nav aria-label="Categories" className="mb-6 flex flex-wrap gap-2">
            <Link href="/blog" aria-current={!cat ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${!cat ? "bg-ink text-cream" : "border border-ink/20"}`}>All</Link>
            {cats.map((c) => <Link key={c} href={`/blog?category=${encodeURIComponent(c)}`} aria-current={cat === c ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${cat === c ? "bg-ink text-cream" : "border border-ink/20"}`}>{c}</Link>)}
          </nav>
        )}
        {posts.length === 0 ? <p className="text-ink-soft">No articles yet. Please check back soon.</p> : (
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.slug} className={`reveal ${i === 0 && posts.length > 2 ? "lg:col-span-2" : ""}`}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-cream-2"><Image src={cover(p.coverImage)} alt="" fill priority={i < 2} sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 640px" className="object-cover" /><span className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Illustration</span></div>
                  <p className="eyebrow mt-5">{p.category} · {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  <h2 className="display mt-2 text-3xl transition-colors group-hover:text-clay">{p.title}</h2>
                  <p className="mt-3 text-ink-soft">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
