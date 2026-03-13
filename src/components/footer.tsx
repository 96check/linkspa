import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Sign in", href: "/login" },
  { label: "Get Started", href: "/register" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Acceptable Use", href: "/acceptable-use" },
];

const companyLinks = [
  { label: "Contact", href: "mailto:hello@salonlink.com" },
  { label: "Support", href: "mailto:support@salonlink.com" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-500 transition-colors hover:text-gray-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-black">
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-16">
        {/* ── Top section: Brand + Link columns ── */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center text-lg">
              <BrandLogo />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              Social links for your spa, one scan away. Create a stunning page,
              generate a QR code, and let customers discover your business.
            </p>
          </div>

          {/* Link columns */}
          <FooterLinkGroup title="Product" links={productLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} salonlink.io. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with care for spa &amp; salon businesses worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
