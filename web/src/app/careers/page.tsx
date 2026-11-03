import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Interested in joining the team at Vinayak Children & Maternity Hospital in Kodinar? Get in touch with us.",
  alternates: { canonical: "/careers" },
};

export default function Careers() {
  return (
    <>
      <PageHero image="/img/child-checkup-2.jpeg" eyebrow="Join our team" title={<>Build a career <em className="text-clay">that cares.</em></>} intro="Vinayak Children & Maternity Hospital has been part of the Kodinar community for over a decade. We're always glad to hear from compassionate healthcare professionals who share our commitment to families." />
      <section className="wrap pb-8">
        <div className="reveal max-w-2xl rounded-3xl bg-cream-2 p-10">
          <h2 className="display text-3xl">No specific openings right now</h2>
          <p className="mt-4 text-ink-soft">We don&rsquo;t have specific positions listed at this time, but we welcome you to reach out and share your background with us. We&rsquo;ll keep it on file and get in touch if a suitable opportunity comes up.</p>
          <a href={`mailto:${site.email}?subject=Career enquiry`} className="btn btn-clay mt-5">Email us your details</a>
        </div>
      </section>
    </>
  );
}
