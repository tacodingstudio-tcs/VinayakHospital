import { site } from "@/content/site";
import ReviewForm from "./ReviewForm";

type Review = { fullName: string; city?: string | null; rating: number; reviewMessage: string };

async function getReviews(): Promise<Review[]> {
  try {
    const r = await fetch(`${site.api}/api/reviews`, { next: { revalidate: 120 } });
    return r.ok ? await r.json() : [];
  } catch {
    return [];
  }
}

export default async function Reviews() {
  const reviews = await getReviews();
  return (
    <section className="wrap pb-8 md:pb-6" aria-labelledby="reviews-h">
      <p className="eyebrow reveal">Kind words</p>
      <h2 id="reviews-h" className="display reveal mt-3 text-[clamp(1.9rem,3.6vw,3rem)]">What families <em className="text-clay">say.</em></h2>
      {reviews.length > 0 ? (
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.slice(0, 6).map((r, i) => (
            <li key={i} className="reveal card p-5">
              <p className="text-pulse" role="img" aria-label={`${r.rating} out of 5 stars`}>{"★".repeat(r.rating)}<span className="text-ink/15">{"★".repeat(5 - r.rating)}</span></p>
              <blockquote className="display mt-4 text-xl leading-snug">&ldquo;{r.reviewMessage}&rdquo;</blockquote>
              <p className="mt-5 text-sm font-bold">{r.fullName}{r.city ? <span className="font-normal text-ink-soft"> · {r.city}</span> : null}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="reveal mt-5 max-w-xl text-lg text-ink-soft">Reviews appear here once our team has read them. Yours could be the first.</p>
      )}
      <ReviewForm />
    </section>
  );
}
