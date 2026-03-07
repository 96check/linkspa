import { z } from "zod";
import { LINK_TYPES } from "@/types/link";

export const linkSchema = z.object({
  type: z.enum(LINK_TYPES),
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "URL is required").refine((val) => {
    if (val.startsWith("tel:")) return val.length > 4;
    if (val.startsWith("mailto:")) return val.includes("@");
    try { new URL(val); return true; } catch { return false; }
  }, "Must be a valid URL"),
  order: z.number().int().min(0, "Order must be 0 or greater"),
  active: z.boolean(),
});
