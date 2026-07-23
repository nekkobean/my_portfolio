import { z } from "zod";
import { dateStringSchema, optionalDateStringSchema, optionalStringSchema } from "./shared";

export const educationLevelEnum = z.enum([
  "primary",
  "secondary",
  "tertiary",
  "masteral",
  "doctorate",
]);

export const educationFormSchema = z
  .object({
    level: educationLevelEnum,
    school_name: z.string().min(1, "School name is required").max(200),
    school_address: z.string().min(1, "School address is required").max(300),
    year_attended: dateStringSchema,
    year_graduated: optionalDateStringSchema,
    course: optionalStringSchema,
    description: optionalStringSchema,
  })
  .refine(
    (data) =>
      !data.year_graduated ||
      new Date(data.year_graduated) >= new Date(data.year_attended),
    {
      message: "Graduation date must be after the year attended",
      path: ["year_graduated"],
    }
  );

export type EducationFormValues = z.infer<typeof educationFormSchema>;