export interface ThemeConfig {
  bgPrimary: string;
  bgSecondary: string;
  accentPrimary: string;
  accentSecondary: string;
  /** Hex colour for the circle behind the logo image (fills transparent areas) */
  logoBg: string;
  /** Hex colour for the content card background */
  cardBg: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  config: ThemeConfig;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "midnight",
    name: "Midnight",
    description: "Dark & warm",
    config: { bgPrimary: "#1e293b", bgSecondary: "#0f172a", accentPrimary: "#f97316", accentSecondary: "#fbbf24", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
  {
    id: "rose",
    name: "Rose",
    description: "Soft & elegant",
    config: { bgPrimary: "#ff758c", bgSecondary: "#ff7eb3", accentPrimary: "#ff758c", accentSecondary: "#ff7eb3", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm & vibrant",
    config: { bgPrimary: "#f97316", bgSecondary: "#ef4444", accentPrimary: "#f97316", accentSecondary: "#ef4444", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Cool & calm",
    config: { bgPrimary: "#0ea5e9", bgSecondary: "#6366f1", accentPrimary: "#0ea5e9", accentSecondary: "#6366f1", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
  {
    id: "forest",
    name: "Forest",
    description: "Natural & fresh",
    config: { bgPrimary: "#10b981", bgSecondary: "#059669", accentPrimary: "#10b981", accentSecondary: "#059669", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
  {
    id: "royal",
    name: "Royal",
    description: "Bold & luxurious",
    config: { bgPrimary: "#8b5cf6", bgSecondary: "#6d28d9", accentPrimary: "#8b5cf6", accentSecondary: "#6d28d9", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
  {
    id: "gold",
    name: "Gold",
    description: "Premium & rich",
    config: { bgPrimary: "#f59e0b", bgSecondary: "#d97706", accentPrimary: "#f59e0b", accentSecondary: "#d97706", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
  {
    id: "coral",
    name: "Coral",
    description: "Playful & modern",
    config: { bgPrimary: "#fb7185", bgSecondary: "#f472b6", accentPrimary: "#fb7185", accentSecondary: "#f472b6", logoBg: "#ffffff", cardBg: "#ffffff" },
  },
];

const DEFAULT_CONFIG: ThemeConfig = THEME_PRESETS[0].config;

export function parseThemeConfig(raw: string | null | undefined): ThemeConfig {
  if (!raw) return DEFAULT_CONFIG;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.bgPrimary && parsed.bgSecondary && parsed.accentPrimary && parsed.accentSecondary) {
      // Backfill logoBg: handle old "white"/"black" string values and missing field
      let logoBg = parsed.logoBg;
      if (!logoBg || logoBg === "white") logoBg = "#ffffff";
      else if (logoBg === "black") logoBg = "#000000";

      // Backfill cardBg for configs saved before this field existed
      const cardBg = parsed.cardBg && parsed.cardBg.startsWith("#") ? parsed.cardBg : "#ffffff";

      return { ...parsed, logoBg, cardBg } as ThemeConfig;
    }
  } catch {
    // Not JSON — might be a preset ID
  }

  const preset = THEME_PRESETS.find((p) => p.id === raw);
  if (preset) return preset.config;

  return DEFAULT_CONFIG;
}

export function serializeThemeConfig(config: ThemeConfig): string {
  return JSON.stringify(config);
}

/**
 * Returns the preset ID if the config matches a known preset exactly,
 * or null if it's a custom config.
 */
export function configToPresetId(config: ThemeConfig): string | null {
  const match = THEME_PRESETS.find(
    (p) =>
      p.config.bgPrimary === config.bgPrimary &&
      p.config.bgSecondary === config.bgSecondary &&
      p.config.accentPrimary === config.accentPrimary &&
      p.config.accentSecondary === config.accentSecondary &&
      p.config.logoBg === config.logoBg &&
      p.config.cardBg === config.cardBg,
  );
  return match?.id ?? null;
}

/**
 * Serialize for DB storage: preset ID if matching, JSON otherwise.
 */
export function serializeForStorage(config: ThemeConfig): string {
  return configToPresetId(config) ?? JSON.stringify(config);
}

/**
 * Compare two configs for equality.
 */
export function configsEqual(a: ThemeConfig, b: ThemeConfig): boolean {
  return (
    a.bgPrimary === b.bgPrimary &&
    a.bgSecondary === b.bgSecondary &&
    a.accentPrimary === b.accentPrimary &&
    a.accentSecondary === b.accentSecondary &&
    a.logoBg === b.logoBg &&
    a.cardBg === b.cardBg
  );
}

/** @deprecated Alias for backward compat */
export const THEMES = THEME_PRESETS;

export function getThemeById(id: string): ThemePreset {
  return THEME_PRESETS.find((p) => p.id === id) ?? THEME_PRESETS[0];
}
