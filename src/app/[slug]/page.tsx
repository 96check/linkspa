import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpaBySlug, getLinksBySpaId } from "@/server/spa";
import { env } from "@/lib/env";
import { ThemeRenderer } from "@/components/themes/theme-renderer";
import type { Link } from "@/types/database";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const spa = await getSpaBySlug(params.slug);
  if (!spa) return {};

  const title = spa.spa_name ?? spa.slug;
  const description = `Visit ${title} — official links and booking page.`;
  const canonicalUrl = `${env.NEXT_PUBLIC_APP_URL}/${spa.slug}`;

  return {
    title,
    description,
    openGraph: { title, description, url: canonicalUrl, type: "website" },
    alternates: { canonical: canonicalUrl },
  };
}

function sortLinks(links: Link[]): Link[] {
  return [...links].sort((a, b) => {
    if (a.type === "booking" && b.type !== "booking") return -1;
    if (a.type !== "booking" && b.type === "booking") return 1;
    return a.order - b.order;
  });
}

export default async function SpaPage({ params }: PageProps) {
  const spa = await getSpaBySlug(params.slug);
  if (!spa) notFound();

  const links = await getLinksBySpaId(spa.id);
  const sorted = sortLinks(links);

  return (
    <ThemeRenderer
      spa={spa}
      links={sorted}
      themeId={spa.theme ?? "midnight"}
    />
  );
}
