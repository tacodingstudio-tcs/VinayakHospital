import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms for using the Vinayak Children & Maternity Hospital website and services.", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Hospital legal information" title="Terms of service." intro="Welcome to Vinayak Children & Maternity Hospital. These Terms of Service explain the rules, responsibilities, and conditions for using our website, booking appointments, receiving healthcare services, and communicating with our medical team." />
      <div className="wrap max-w-3xl pb-8">
        <dl className="grid grid-cols-3 gap-4 border-y border-ink/15 py-6 text-sm">
          <div><dt className="eyebrow">Effective</dt><dd className="mt-1">01 January 2026</dd></div>
          <div><dt className="eyebrow">Last updated</dt><dd className="mt-1">01 January 2026</dd></div>
          <div><dt className="eyebrow">Version</dt><dd className="mt-1">1.0</dd></div>
        </dl>
        <section className="py-6">
          <h2 className="display text-2xl"><span className="text-clay">01</span> &nbsp;Acceptance of terms</h2>
          <p className="mt-4 text-ink-soft">By accessing or using the Vinayak Children &amp; Maternity Hospital website, booking appointments, requesting medical services, or communicating with our healthcare professionals, you agree to comply with these Terms of Service.</p>
          <p className="mt-4 text-ink-soft">If you do not agree with any part of these Terms, please discontinue the use of our website and services.</p>
        </section>
      </div>
    </>
  );
}
