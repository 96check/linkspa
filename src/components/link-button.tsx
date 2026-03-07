import { PlatformIcon } from "@/components/platform-icon";
import { LINK_TYPE_META } from "@/types/link";
import type { LinkType } from "@/types/link";
import type { Link } from "@/types/database";

interface Props {
  link: Link;
  themeCls?: string;
}

export function LinkButton({ link, themeCls }: Props) {
  const type = (link.type as LinkType) || "website";
  const meta = LINK_TYPE_META[type] || LINK_TYPE_META.website;
  const label = link.title ?? meta.label ?? "Link";

  const buttonCls = themeCls ?? `${meta.bg} ${meta.text}`;

  return (
    <a
      href={link.url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex w-full items-center gap-3 rounded-2xl px-5 py-4 transition-all active:scale-[0.98] ${buttonCls}`}
    >
      <span className="shrink-0">
        <PlatformIcon type={type} className="h-5 w-5" />
      </span>
      <span className="flex-1 text-center text-sm font-medium leading-snug">
        {label}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0 opacity-50"
        aria-hidden="true"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>
  );
}
