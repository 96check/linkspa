import { z } from "zod";

export const slugSchema = z
  .string()
  .min(3, "Slug must be at least 3 characters")
  .max(30, "Slug must be at most 30 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Only lowercase letters, numbers, and hyphens. Cannot start or end with a hyphen."
  );
