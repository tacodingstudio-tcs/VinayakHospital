import { site } from "@/content/site";

export type Post = { slug: string; title: string; category: string; summary: string; coverImage?: string | null; createdAt: string; content?: string; updatedAt?: string };

export async function getPosts(): Promise<Post[]> {
  try {
    const r = await fetch(`${site.api}/api/blog`, { next: { revalidate: 120 } });
    return r.ok ? await r.json() : [];
  } catch { return []; }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const r = await fetch(`${site.api}/api/blog/${encodeURIComponent(slug)}`, { next: { revalidate: 120 } });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}

// Only local, optimised images are used; old cartoon GIF covers fall back to a real photo.
export const cover = (c?: string | null) => (c && /^\/img\/.+\.(jpe?g|png|webp)$/i.test(c) ? c : "/img/newborn-care.jpeg");
