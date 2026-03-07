import { PLATFORM_ICON_MAP_DARK_BG, PLATFORM_ICON_MAP_LIGHT_BG } from "@/components/icons/platform-icons";

interface Props {
  type: string;
  /** "dark" = nền tối (add link, edit link) → icon sáng. "light" = nền sáng (/username) → icon tối. Mặc định "dark". */
  background?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
}

export function PlatformIcon({ type, background = "dark", className = "h-6 w-6", style }: Props) {
  const map = background === "light" ? PLATFORM_ICON_MAP_LIGHT_BG : PLATFORM_ICON_MAP_DARK_BG;
  const Icon = map[type] ?? map.other;
  return <Icon className={className} style={style} aria-hidden />;
}
