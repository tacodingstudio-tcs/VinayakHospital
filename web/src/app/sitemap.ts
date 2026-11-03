import type { MetadataRoute } from "next";
import { departments, doctors, site, tools } from "@/content/site";
import { getPosts } from "@/lib/blog";
import { getContent, type WhCategory } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (p: string) => `${site.url}${p}`;
  const fixed = ["/", "/about", "/doctors", "/services", "/resources", "/gallery", "/blog", "/contact", "/emergency", "/careers", "/privacy", "/terms"];
  const posts = await getPosts();
  const wh = await getContent<{ categories: WhCategory[] }>("womens-health");
  return [
    ...fixed.map((p) => ({ url: u(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...doctors.map((d) => ({ url: u(`/doctors/${d.slug}`), priority: 0.7 })),
    ...departments.map((d) => ({ url: u(`/departments/${d.slug}`), priority: 0.7 })),
    ...tools.map((t) => ({ url: u(t.href), priority: 0.6 })),
    ...Array.from({ length: 40 }, (_, i) => ({ url: u(`/resources/pregnancy/week-${i + 1}`), priority: 0.5 })),
    ...(wh?.categories ?? []).flatMap((c) => c.articles.map((a) => ({ url: u(`/resources/womens-health/${a.slug}`), priority: 0.5 }))),
    ...posts.map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: p.createdAt, priority: 0.6 })),
  ];
}
