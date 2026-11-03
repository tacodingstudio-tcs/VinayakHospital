import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, type Article } from "@/lib/content";
import { seoTitle } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const a = await getContent<Article>(`womens-health/${params.slug}`);
  return a ? { title: seoTitle(a.title), description: a.excerpt, alternates: { canonical: `/resources/womens-health/${a.slug}` } } : {};
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const a = await getContent<Article>(`womens-health/${params.slug}`);
  if (!a) notFound();
  return (
    <article className="wrap max-w-3xl pt-[130px] pb-8">
      <Link href="/resources/womens-health" className="eyebrow">← Women&rsquo;s health library</Link>
      <h1 className="display mt-6 text-[clamp(1.9rem,3.6vw,3rem)]">{a.title}</h1>
      <p className="mt-6 text-xl text-ink-soft">{a.excerpt}</p>
      {/* Content is first-party text served by our own API, not user input. */}
      <div className="mt-6 space-y-5 text-lg leading-relaxed [&_li]:ml-6 [&_li]:list-disc [&_h2]:display [&_h2]:mt-6 [&_h2]:text-3xl [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold" dangerouslySetInnerHTML={{ __html: a.content }} />
      <p className="mt-12 rounded-2xl bg-cream-2 p-6 text-sm text-ink-soft">General information only, not medical advice. Please speak to your gynecologist about your own health.</p>
      <Link href="/contact?doctor=Dr%20Hetal%20Jadav" className="btn btn-clay mt-5">Book with Dr Hetal Jadav</Link>
    </article>
  );
}
