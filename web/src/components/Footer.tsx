import Image from "next/image";
import Link from "next/link";
import { departments, nav, site } from "@/content/site";

// Same structure and colours as the original site's footer: plum gradient, curved pink top, short centred tagline,
// four columns, and the floating mother illustration in the corner.
export default function Footer() {
  const links = [{ href: "/", label: "Home" }, ...nav.filter((n) => n.href !== "/resources"), { href: "/emergency", label: "Emergency Info" }, { href: "/careers", label: "Careers" }];
  return (
    <footer className="relative overflow-hidden text-white" style={{ background: "linear-gradient(160deg,#7A1550 0%,#5B0E3E 45%,#4A0B32 100%)" }}>
      <div aria-hidden className="-mb-px h-16" style={{ background: "linear-gradient(180deg,#FBE4EE 0%,#E98FB8 55%,#7A1550 100%)", borderRadius: "0 0 50% 50% / 0 0 28px 28px" }} />

      <div className="px-6 pb-1.5 pt-8 text-center">
        <p className="text-[17px] font-bold">From the first heartbeat to growing years,</p>
        <p className="mt-0.5 text-sm text-[#F8DCE9]">we&rsquo;re here for your family.</p>
      </div>

      <div className="footer-illustration-wrap pointer-events-none absolute right-2 top-[72px] z-[2] hidden w-[130px] lg:block xl:w-[200px]" aria-hidden>
        <span className="footer-illustration-babyglow" />
        <Image src="/img/footer-illustration.png" alt="" width={1052} height={1495} className="footer-illustration relative z-[1] block h-auto w-full" />
      </div>

      <div className="wrap relative z-[3] pb-6 pt-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_0.6fr_1fr_1fr] xl:pr-[190px]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/img/logo.png" alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-full bg-white/95 object-contain p-1" />
              <span className="leading-tight"><span className="display block text-lg">Vinayak Children &amp; Maternity</span><span className="text-sm text-[#F8DCE9]">Hospital</span></span>
            </Link>
            <p className="mt-3 max-w-xs text-[15px] text-[#F8DCE9]">Compassionate healthcare for women and children, close to home.</p>
            <a href={`tel:${site.tel}`} className="mt-4 block max-w-[260px] rounded-2xl border border-white/20 bg-white/10 p-4 transition-colors hover:bg-white/15">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#FFD1E4]"><span className="h-2 w-2 animate-pulse rounded-full bg-pulse" aria-hidden />Emergency</span>
              <span className="display mt-1 block text-2xl">{site.phone}</span>
              <span className="text-xs text-[#F8DCE9]">Available 24/7</span>
            </a>
          </div>

          <div>
            <h2 className="display text-lg">Quick Links</h2>
            <ul className="mt-3 space-y-1.5 text-[15px] text-[#F8DCE9]">
              {links.map((l) => <li key={l.href}><Link className={`inline-block py-0.5 hover:text-white ${l.href === "/emergency" ? "font-bold text-[#FFB3D1]" : ""}`} href={l.href}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="display text-lg">Our Services</h2>
            <ul className="mt-3 space-y-1.5 text-[15px] text-[#F8DCE9]">
              {departments.map((d) => <li key={d.slug}><Link className="inline-block py-0.5 hover:text-white" href={`/departments/${d.slug}`}>{d.name}</Link></li>)}
              <li><Link className="inline-block py-1 font-bold text-[#FFB3D1] hover:text-white" href="/services">View All Services →</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="display text-lg">Contact Us</h2>
            <ul className="mt-3 space-y-3 text-[15px]">
              <li><span className="folio block text-[#FFB3D1]">Visit Us</span><a href={site.map} target="_blank" rel="noopener noreferrer" className="inline-block py-1 text-[#F8DCE9] hover:text-white">{site.address}</a></li>
              <li><span className="folio block text-[#FFB3D1]">Call Us</span><a href={`tel:${site.tel}`} className="inline-block py-1 text-[#F8DCE9] hover:text-white">{site.phone}</a></li>
              <li><span className="folio block text-[#FFB3D1]">Hours</span><span className="text-[#F8DCE9]">OPD: {site.opd}</span></li>
              <li><span className="folio block text-[#FFB3D1]">Email Us</span><a href={`mailto:${site.email}`} className="inline-block py-1 break-all text-[#F8DCE9] hover:text-white">{site.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-sm text-[#F8DCE9]">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="inline-block py-1.5 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="inline-block py-1.5 hover:text-white">Terms of Service</Link>
            <a href="https://www.twishaconsultancyservices.com/" target="_blank" rel="noopener noreferrer" className="inline-block py-1.5 hover:text-white">Powered by Twisha Consultancy Services</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
