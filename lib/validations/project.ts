import { z } from "zod";
import {
  dateStringSchema,
  optionalDateStringSchema,
  optionalStringSchema,
  optionalUrlSchema,
} from "./shared";

export const projectStatusEnum = z.enum(["ongoing", "finished", "cancelled"]);

// Accepts either a full URL (https://...) or a filename/relative path
// pointing at an image already in the /public folder (e.g. "name.png", "/name.png").
const optionalImageSchema = z
  .string()
  .trim()
  .refine(
    (val) =>
      val === "" ||
      /^https?:\/\/.+/i.test(val) ||
      /^\/?[\w-]+(\/[\w-]+)*\.(png|jpe?g|svg|webp|gif|avif)$/i.test(val),
    { message: "Enter a valid image URL or a filename (e.g. project.png)" }
  )
  .optional();

export const projectFormSchema = z
  .object({
    project_title: z.string().min(1, "Project title is required").max(200),
    project_description: z.string().min(1, "Project description is required"),
    project_image: optionalImageSchema,
    project_type: optionalStringSchema,
    role: optionalStringSchema,
    technologies_used: z.string().min(1, "Technologies used is required"),
    project_link: optionalUrlSchema,
    repository_link: optionalUrlSchema,
    start_date: dateStringSchema,
    end_date: optionalDateStringSchema,
    project_status: projectStatusEnum,
    is_ongoing: z.boolean(),
  })
  .refine(
    (data) => !data.end_date || new Date(data.end_date) >= new Date(data.start_date),
    { message: "End date must be after the start date", path: ["end_date"] }
  );

export type ProjectFormValues = z.infer<typeof projectFormSchema>;