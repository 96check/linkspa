import Link from "next/link";
import { getLinksForCurrentUser } from "@/server/links";
import { SortableLinkList } from "./sortable-link-list";

export default async function LinksPage() {
  const links = await getLinksForCurrentUser();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">My Links</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {links.length === 0
              ? "Add links to your public page"
              : `${links.length} ${links.length === 1 ? "link" : "links"}`}
          </p>
        </div>
        <Link
          href="/dashboard/links/new"
          className="rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 active:scale-95"
        >
          + Add link
        </Link>
      </div>

      {/* Links list */}
      {links.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-white/10 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-gray-500">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-300">
            No links yet
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Add your Instagram, booking page, or website
          </p>
          <Link
            href="/dashboard/links/new"
            className="mt-5 inline-block rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-2 text-sm font-semibold text-black"
          >
            Add your first link
          </Link>
        </div>
      ) : (
        <SortableLinkList initialLinks={links} />
      )}
    </div>
  );
}
