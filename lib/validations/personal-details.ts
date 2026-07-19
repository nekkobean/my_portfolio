import { z } from "zod";
import { optionalStringSchema } from "./shared";

export const personalDetailsFormSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(100),
  middle_name: optionalStringSchema,
  last_name: z.string().min(1, "Last name is required").max(100),
  languages: z.string().min(1, "Languages are required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone_number: optionalStringSchema,
  what_i_do: optionalStringSchema,
});

export type PersonalDetailsFormValues = z.infer<typeof personalDetailsFormSchema>;