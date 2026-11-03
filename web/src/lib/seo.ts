// Search-result title: use the page title as-is, and append the site name only when it still fits in ~60 characters.
export const seoTitle = (t: string, suffix = " | Vinayak Hospital") =>
  t.length + suffix.length <= 60 ? t : { absolute: t.length <= 60 ? t : t.slice(0, 57).replace(/\s+\S*$/, "") + "…" };
