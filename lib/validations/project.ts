import { z } from "zod";
import {
  dateStringSchema,
  optionalDateStringSchema,
  optionalStringSchema,
  optionalUrlSchema,
} from "./shared";

export const projectStatusEnum = z.enum(["ongoing", "finished", "cancelled"]);

export const projectFormSchema = z
  .object({
    project_title: z.string().min(1, "Project title is required").max(200),
    project_description: z.string().min(1, "Project description is required"),
    project_image: optionalUrlSchema,
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