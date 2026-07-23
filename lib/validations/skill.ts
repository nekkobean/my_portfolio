import { z } from "zod";
import { optionalStringSchema } from "./shared";

export const skillCategoryEnum = z.enum(["hard", "soft", "core"]);

export const skillFormSchema = z.object({
  skill_name: z.string().min(1, "Skill name is required").max(150),
  skill_category: skillCategoryEnum,
  skill_description: optionalStringSchema,
  proficiency_level: z
    .union([z.string(), z.literal("")])
    .optional()
    .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
    .refine(
      (val) => val === undefined || (Number.isInteger(val) && val >= 0 && val <= 10),
      { message: "Proficiency must be a whole number between 0 and 10" }
    ),
});

export type SkillFormValues = z.infer<typeof skillFormSchema>;