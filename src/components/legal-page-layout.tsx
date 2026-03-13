import Link from "next/link";
import Footer from "@/components/footer";
import { BrandLogo } from "@/components/brand-logo";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 selection:text-orange-200">
      {/* ── Navigation ── */}
      <nav className="border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center text-xl"
          >
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 transition-all hover:bg-white/[0.04] hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all hover:shadow-xl hover:shadow-orange-500/30"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Page header ── */}
      <div className="mx-auto max-w-4xl px-6 pb-8 pt-16">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Last updated: {lastUpdated}
        </p>
        <div className="mt-8 border-t border-white/[0.06]" />
      </div>

      {/* ── Legal content ── */}
      <article className="legal-content mx-auto max-w-4xl px-6 pb-20">
        {children}
      </article>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
