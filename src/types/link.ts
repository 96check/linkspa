export const LINK_TYPES = [
  // Social
  "instagram",
  "tiktok",
  "facebook",
  "twitter",
  "youtube",
  "snapchat",
  "pinterest",
  "linkedin",
  "threads",
  "reddit",
  // Messaging
  "whatsapp",
  "telegram",
  "messenger",
  "viber",
  // Business
  "google_maps",
  "yelp",
  "booking",
  "email",
  // Payment
  "paypal",
  "cashapp",
  // General
  "website",
  "other",
] as const;

export type LinkType = (typeof LINK_TYPES)[number];

export interface LinkMeta {
  label: string;
  category: "social" | "messaging" | "business" | "payment" | "general";
  bg: string;
  text: string;
  gradient: string;
  glow: string;
  /** Official brand color as CSS background value (hex or linear-gradient) */
  brandBg: string;
  /** Text color for brand button: "white" | "black" */
  brandText: "white" | "black";
  /** Optional accent gradient for border (e.g. TikTok cyan–pink) */
  brandAccent?: string;
  baseUrl?: string;
  displayPrefix?: string;
  inputPlaceholder: string;
  defaultTitle: string;
  inputType?: "text" | "url" | "tel" | "email";
}

export const LINK_TYPE_META: Record<LinkType, LinkMeta> = {
  // ── Social ──
  instagram: {
    label: "Instagram",
    category: "social",
    bg: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    text: "text-white",
    gradient: "from-[#DD2A7B] to-[#8134AF]",
    glow: "shadow-[#DD2A7B]/30",
    brandBg: "linear-gradient(45deg, #F58529 0%, #DD2A7B 30%, #8134AF 60%, #515BD4 100%)",
    brandText: "white",
    baseUrl: "https://instagram.com/",
    displayPrefix: "instagram.com/",
    inputPlaceholder: "your_username",
    defaultTitle: "Follow on Instagram",
  },
  tiktok: {
    label: "TikTok",
    category: "social",
    bg: "bg-black",
    text: "text-white",
    gradient: "from-[#000000] to-[#25F4EE]",
    glow: "shadow-[#25F4EE]/20",
    brandBg: "#000000",
    brandText: "white",
    /** TikTok accent gradient for border/glow: cyan #25F4EE → pink #FE2C55 */
    brandAccent: "linear-gradient(180deg, #25F4EE 0%, #FE2C55 100%)",
    baseUrl: "https://tiktok.com/@",
    displayPrefix: "tiktok.com/@",
    inputPlaceholder: "username",
    defaultTitle: "Follow on TikTok",
  },
  facebook: {
    label: "Facebook",
    category: "social",
    bg: "bg-[#1877F2]",
    text: "text-white",
    gradient: "from-[#1877F2] to-[#1565D8]",
    glow: "shadow-[#1877F2]/30",
    brandBg: "#1877F2",
    brandText: "white",
    baseUrl: "https://facebook.com/",
    displayPrefix: "facebook.com/",
    inputPlaceholder: "your.page",
    defaultTitle: "Visit our Facebook",
  },
  twitter: {
    label: "X",
    category: "social",
    bg: "bg-black",
    text: "text-white",
    gradient: "from-[#000000] to-[#1a1a1a]",
    glow: "shadow-black/20",
    brandBg: "#000000",
    brandText: "white",
    baseUrl: "https://x.com/",
    displayPrefix: "x.com/",
    inputPlaceholder: "username",
    defaultTitle: "Follow on X",
  },
  youtube: {
    label: "YouTube",
    category: "social",
    bg: "bg-[#FF0000]",
    text: "text-white",
    gradient: "from-[#FF0000] to-[#CC0000]",
    glow: "shadow-[#FF0000]/30",
    brandBg: "#FF0000",
    brandText: "white",
    baseUrl: "https://youtube.com/@",
    displayPrefix: "youtube.com/@",
    inputPlaceholder: "channel",
    defaultTitle: "Subscribe on YouTube",
  },
  snapchat: {
    label: "Snapchat",
    category: "social",
    bg: "bg-[#FFFC00]",
    text: "text-black",
    gradient: "from-[#FFFC00] to-[#FFD700]",
    glow: "shadow-[#FFFC00]/30",
    brandBg: "#FFFC00",
    brandText: "black",
    baseUrl: "https://snapchat.com/add/",
    displayPrefix: "snapchat.com/add/",
    inputPlaceholder: "username",
    defaultTitle: "Add on Snapchat",
  },
  pinterest: {
    label: "Pinterest",
    category: "social",
    bg: "bg-[#E60023]",
    text: "text-white",
    gradient: "from-[#E60023] to-[#BD001A]",
    glow: "shadow-[#E60023]/30",
    brandBg: "#E60023",
    brandText: "white",
    baseUrl: "https://pinterest.com/",
    displayPrefix: "pinterest.com/",
    inputPlaceholder: "username",
    defaultTitle: "Follow on Pinterest",
  },
  linkedin: {
    label: "LinkedIn",
    category: "social",
    bg: "bg-[#0A66C2]",
    text: "text-white",
    gradient: "from-[#0A66C2] to-[#084E96]",
    glow: "shadow-[#0A66C2]/30",
    brandBg: "#0A66C2",
    brandText: "white",
    baseUrl: "https://linkedin.com/in/",
    displayPrefix: "linkedin.com/in/",
    inputPlaceholder: "username",
    defaultTitle: "Connect on LinkedIn",
  },
  threads: {
    label: "Threads",
    category: "social",
    bg: "bg-black",
    text: "text-white",
    gradient: "from-[#000000] to-[#1a1a1a]",
    glow: "shadow-black/20",
    brandBg: "#000000",
    brandText: "white",
    baseUrl: "https://threads.net/@",
    displayPrefix: "threads.net/@",
    inputPlaceholder: "username",
    defaultTitle: "Follow on Threads",
  },
  reddit: {
    label: "Reddit",
    category: "social",
    bg: "bg-[#FF4500]",
    text: "text-white",
    gradient: "from-[#FF4500] to-[#D63B00]",
    glow: "shadow-[#FF4500]/30",
    brandBg: "#FF4500",
    brandText: "white",
    baseUrl: "https://reddit.com/user/",
    displayPrefix: "reddit.com/user/",
    inputPlaceholder: "username",
    defaultTitle: "Follow on Reddit",
  },
  // ── Messaging ──
  whatsapp: {
    label: "WhatsApp",
    category: "messaging",
    bg: "bg-[#25D366]",
    text: "text-white",
    gradient: "from-[#25D366] to-[#128C7E]",
    glow: "shadow-[#25D366]/30",
    brandBg: "#25D366",
    brandText: "white",
    baseUrl: "https://wa.me/",
    displayPrefix: "wa.me/",
    inputPlaceholder: "84901234567",
    defaultTitle: "Chat on WhatsApp",
    inputType: "tel",
  },
  telegram: {
    label: "Telegram",
    category: "messaging",
    bg: "bg-[#229ED9]",
    text: "text-white",
    gradient: "from-[#229ED9] to-[#1A85B8]",
    glow: "shadow-[#229ED9]/30",
    brandBg: "#229ED9",
    brandText: "white",
    baseUrl: "https://t.me/",
    displayPrefix: "t.me/",
    inputPlaceholder: "username",
    defaultTitle: "Message on Telegram",
  },
  messenger: {
    label: "Messenger",
    category: "messaging",
    bg: "bg-gradient-to-r from-[#0084FF] to-[#A033FF]",
    text: "text-white",
    gradient: "from-[#0084FF] to-[#A033FF]",
    glow: "shadow-[#0084FF]/30",
    brandBg: "linear-gradient(135deg, #0084FF 0%, #A033FF 100%)",
    brandText: "white",
    baseUrl: "https://m.me/",
    displayPrefix: "m.me/",
    inputPlaceholder: "your.page",
    defaultTitle: "Message on Messenger",
  },
  viber: {
    label: "Viber",
    category: "messaging",
    bg: "bg-[#665CAC]",
    text: "text-white",
    gradient: "from-[#665CAC] to-[#7B519D]",
    glow: "shadow-[#665CAC]/30",
    brandBg: "#665CAC",
    brandText: "white",
    inputPlaceholder: "https://viber.com/...",
    defaultTitle: "Chat on Viber",
    inputType: "url",
  },
  // ── Business ──
  google_maps: {
    label: "Google Maps",
    category: "business",
    bg: "bg-[#4285F4]",
    text: "text-white",
    gradient: "from-[#34A853] to-[#4285F4]",
    glow: "shadow-[#4285F4]/30",
    brandBg: "#4285F4",
    brandText: "white",
    inputPlaceholder: "https://maps.google.com/...",
    defaultTitle: "Find us on Google Maps",
    inputType: "url",
  },
  yelp: {
    label: "Yelp",
    category: "business",
    bg: "bg-[#D32323]",
    text: "text-white",
    gradient: "from-[#D32323] to-[#AF0606]",
    glow: "shadow-[#D32323]/30",
    brandBg: "#D32323",
    brandText: "white",
    inputPlaceholder: "https://yelp.com/biz/...",
    defaultTitle: "Review us on Yelp",
    inputType: "url",
  },
  booking: {
    label: "Booking",
    category: "business",
    bg: "bg-gradient-to-r from-[#00b09b] to-[#96c93d]",
    text: "text-white",
    gradient: "from-[#00b09b] to-[#96c93d]",
    glow: "shadow-[#00b09b]/30",
    brandBg: "linear-gradient(135deg, #00b09b, #96c93d)",
    brandText: "white",
    inputPlaceholder: "https://your-booking-link.com",
    defaultTitle: "Book an appointment",
    inputType: "url",
  },
  email: {
    label: "Email",
    category: "business",
    bg: "bg-[#555555]",
    text: "text-white",
    gradient: "from-[#555555] to-[#333333]",
    glow: "shadow-[#555555]/20",
    brandBg: "linear-gradient(135deg, #00b09b, #96c93d)",
    brandText: "white",
    baseUrl: "mailto:",
    displayPrefix: "mailto:",
    inputPlaceholder: "hello@example.com",
    defaultTitle: "Email us",
    inputType: "email",
  },
  // ── Payment ──
  paypal: {
    label: "PayPal",
    category: "payment",
    bg: "bg-[#003087]",
    text: "text-white",
    gradient: "from-[#003087] to-[#009CDE]",
    glow: "shadow-[#003087]/30",
    brandBg: "#003087",
    brandText: "white",
    baseUrl: "https://paypal.me/",
    displayPrefix: "paypal.me/",
    inputPlaceholder: "username",
    defaultTitle: "Pay with PayPal",
  },
  cashapp: {
    label: "Cash App",
    category: "payment",
    bg: "bg-[#00D64B]",
    text: "text-white",
    gradient: "from-[#00D64B] to-[#00C244]",
    glow: "shadow-[#00D64B]/30",
    brandBg: "#00D64B",
    brandText: "white",
    baseUrl: "https://cash.app/$",
    displayPrefix: "cash.app/$",
    inputPlaceholder: "username",
    defaultTitle: "Send via Cash App",
  },
  // ── General ──
  website: {
    label: "Website",
    category: "general",
    bg: "bg-gradient-to-r from-[#00b09b] to-[#96c93d]",
    text: "text-white",
    gradient: "from-[#00b09b] to-[#96c93d]",
    glow: "shadow-[#00b09b]/30",
    brandBg: "linear-gradient(135deg, #00b09b, #96c93d)",
    brandText: "white",
    inputPlaceholder: "https://your-website.com",
    defaultTitle: "Visit our website",
    inputType: "url",
  },
  other: {
    label: "Other",
    category: "general",
    bg: "bg-gradient-to-r from-[#00b09b] to-[#96c93d]",
    text: "text-white",
    gradient: "from-[#00b09b] to-[#96c93d]",
    glow: "shadow-[#00b09b]/30",
    brandBg: "linear-gradient(135deg, #00b09b, #96c93d)",
    brandText: "white",
    inputPlaceholder: "https://...",
    defaultTitle: "Visit link",
    inputType: "url",
  },
};

export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "social", label: "Social" },
  { key: "messaging", label: "Messaging" },
  { key: "business", label: "Business" },
  { key: "payment", label: "Payment" },
  { key: "general", label: "General" },
] as const;

/** Extract the handle/value from a full URL given a platform's baseUrl */
export function extractHandle(url: string, platform: LinkType): string {
  if (!url) return "";
  const meta = LINK_TYPE_META[platform];
  if (meta.baseUrl && url.startsWith(meta.baseUrl)) {
    return url.slice(meta.baseUrl.length);
  }
  return url;
}

/** Build the full URL from handle + platform prefix */
export function buildUrl(handle: string, platform: LinkType): string {
  const meta = LINK_TYPE_META[platform];
  if (meta.baseUrl) return `${meta.baseUrl}${handle}`;
  return handle;
}
