import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import QuickCalc from "@/components/QuickCalc";

// Display face (variable name kept so existing CSS keeps working).
const fraunces = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Nunito({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Kodinar`, template: `%s | ${site.short}` },
  description: "Trusted pediatric, gynecology and maternity care in Kodinar. 24/7 emergency. Book an appointment with Dr Pradhyuman Jadav or Dr Hetal Jadav.",
  openGraph: { type: "website", siteName: site.name, images: ["/img/reception.jpeg"], locale: "en_IN" },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: site.name,
  telephone: site.tel,
  email: site.email,
  foundingDate: String(site.since),
  address: { "@type": "PostalAddress", streetAddress: "Nagarpalika Stadium Road, Chara Japa", addressLocality: "Kodinar", postalCode: "362720", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 20.7903431, longitude: 70.7058077 },
  medicalSpecialty: ["Pediatric", "Gynecologic", "Obstetric"],
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "19:00" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
        <Motion />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <QuickCalc />
      </body>
    </html>
  );
}
