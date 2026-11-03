import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Vinayak Children & Maternity Hospital collects, uses and protects your information.", alternates: { canonical: "/privacy" } };

const sections: { h: string; p?: string[]; l?: string[] }[] = [
  { h: "Introduction", p: ["Vinayak Children & Maternity Hospital (\"Hospital\", \"we\", \"our\", or \"us\") is committed to protecting the privacy and confidentiality of every patient, visitor, and website user. This Privacy Policy explains how we collect, use, store, disclose, and safeguard your personal information when you use our website or healthcare services.", "By accessing our website or submitting your personal information, you agree to the practices described in this Privacy Policy."] },
  { h: "Information we collect", p: ["We may collect the following types of information:"], l: ["Full name", "Phone number", "Email address", "Date of birth", "Gender", "Appointment details", "Medical information voluntarily provided", "IP address", "Browser type", "Device information", "Cookies and website usage data"] },
  { h: "How we use your information", p: ["Your information is used only for legitimate healthcare and operational purposes, including:"], l: ["Scheduling appointments", "Providing healthcare services", "Patient communication", "Medical record management", "Responding to enquiries", "Improving our website", "Legal and regulatory compliance", "Hospital administration"] },
  { h: "Medical information", p: ["Medical information shared with Vinayak Children & Maternity Hospital is treated as confidential. We maintain strict administrative, technical and physical safeguards to protect patient health records from unauthorized access.", "Only authorized healthcare professionals and staff members are permitted to access patient information where necessary."] },
  { h: "Cookies", p: ["Our website may use cookies to improve user experience, remember preferences, analyze website traffic, and enhance website performance. You may disable cookies from your browser settings, although some website features may not function properly."] },
  { h: "Data security", p: ["We implement appropriate technical and organizational security measures including secure servers, encryption, restricted access, firewalls, and regular monitoring to protect your personal information against unauthorized access, disclosure, alteration, or destruction."] },
  { h: "Sharing of information", p: ["We do not sell or rent your personal information. Your information may be shared only when:"], l: ["Required by law", "Required for medical treatment", "With your consent", "To comply with government regulations", "To protect legal rights and patient safety"] },
  { h: "Your rights", p: ["You have the right to:"], l: ["Access your personal information", "Request correction of inaccurate information", "Request deletion where legally permitted", "Withdraw consent where applicable", "Raise privacy concerns"] },
  { h: "Third-party services", p: ["Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external websites."] },
  { h: "Children's privacy", p: ["Since we provide pediatric healthcare services, information relating to children is collected only with the consent of parents or legal guardians wherever required."] },
  { h: "Policy updates", p: ["We may update this Privacy Policy periodically. Any changes will be posted on this page."] },
];

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy." />
      <div className="wrap max-w-3xl pb-8">
        {sections.map((s, i) => (
          <section key={s.h} className="border-t border-ink/15 py-8">
            <h2 className="display text-2xl"><span className="text-clay">{String(i + 1).padStart(2, "0")}</span> &nbsp;{s.h}</h2>
            {s.p?.map((t) => <p key={t} className="mt-4 text-ink-soft">{t}</p>)}
            {s.l && <ul className="mt-4 list-disc space-y-1 pl-6 text-ink-soft">{s.l.map((x) => <li key={x}>{x}</li>)}</ul>}
          </section>
        ))}
        <section className="border-t border-ink/15 py-8">
          <h2 className="display text-2xl"><span className="text-clay">{String(sections.length + 1).padStart(2, "0")}</span> &nbsp;Contact us</h2>
          <p className="mt-4 text-ink-soft">If you have any questions regarding this Privacy Policy or your personal information, please contact us.</p>
          <address className="mt-4 not-italic">{site.name}<br />{site.address}<br /><a href={`tel:${site.tel}`} className="underline">{site.phone}</a><br /><a href={`mailto:${site.email}`} className="underline">{site.email}</a></address>
        </section>
      </div>
    </>
  );
}
