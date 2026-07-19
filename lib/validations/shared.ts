import { z } from "zod";

export const dateStringSchema = z
.string()
.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Expected YYYY-MM-DD.")
.refine ((val) => !isNaN(new Date(val).getTime()), "Invalid date value.")
;

export const optionalDateStringSchema = z
.union([dateStringSchema, z.literal("")])
.optional()
.transform((val) => (val === "" ? undefined : val));

export const optionalUrlSchema = z
.union([z.string().url("Invalid URL format."), z.literal("")])
.optional()
.transform((val) => (val === "" ? undefined : val));

export const optionalStringSchema = z
.string()
.optional()
.transform((val) => (val === "" ? undefined : val));

export function getFieldErrors<T>(
    schema: z.ZodType<T>,
    data: unknown
): Record<string, string> | null {
    const result = schema.safeParse(data);
    if (result.success) 
        return null;

    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
        const key = issue.path.join(".") || "_form";
        if (!errors[key]) 
            errors[key] = issue.message;
    }
     return errors;
}