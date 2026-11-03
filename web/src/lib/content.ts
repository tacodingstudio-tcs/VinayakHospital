import { site } from "@/content/site";

export async function getContent<T>(path: string): Promise<T | null> {
  try {
    const r = await fetch(`${site.api}/api/content/${path}`, { next: { revalidate: 3600 } });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}

// The old project served images from /images; the new site keeps them in /img.
export const img = (p?: string | null) => (p ? p.replace(/^\/images\//, "/img/") : "/img/pregnancy-journey.jpg");

export type Week = {
  week: number; trimester: string; trimesterRange: string; emotionalLine: string; imagePath: string; imageAlt: string;
  sizeComparison: string; sizeEmoji: string; babyDevelopment: string; maternalChanges: string;
  wellbeingTopics: string[]; careTopics: string[]; questionsForDoctor: string[]; checklist: string[];
};
export type Article = { id: string; slug: string; title: string; category: string; excerpt: string; content: string };
export type WhCategory = { id: string; title: string; description: string; icon: string; isBridge: boolean; bridgeLinks: { label: string; url: string }[]; articles: Article[] };
export type BagCategory = { key: string; title: string; note: string | null; items: { id: string; label: string; helperText: string | null; optional: boolean }[] };
export type Vaccine = { id: string; name: string; ageGroup: string; timingLabel: string; timingInDays: number; description: string };
export type MilestoneGroup = { id: string; label: string; minAgeMonths: number; maxAgeMonths: number; milestones: { id: string; category: string; title: string }[] };
