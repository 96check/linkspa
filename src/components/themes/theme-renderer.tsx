import type { Spa, Link } from "@/types/database";
import { parseThemeConfig } from "@/types/theme";
import { ThemeLayout } from "./theme-layout";

interface Props {
  spa: Spa;
  links: Link[];
  themeId: string;
}

export function ThemeRenderer({ spa, links, themeId }: Props) {
  const config = parseThemeConfig(themeId);
  return <ThemeLayout spa={spa} links={links} config={config} />;
}
