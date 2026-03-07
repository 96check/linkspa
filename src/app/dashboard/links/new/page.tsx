import Link from "next/link";
import { createLink } from "@/server/actions/links";
import { LinkForm } from "../link-form";

export default function NewLinkPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/links"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-gray-400 transition-colors hover:bg-white/[0.1] hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div>
          <h1 className="text-lg font-bold text-white">Add a link</h1>
          <p className="text-xs text-gray-500">
            This will appear on your public page
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm">
        <LinkForm action={createLink} />
      </div>
    </div>
  );
}
