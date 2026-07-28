import { z } from "zod";

export const cvRequestSchema = z.object({
  requester_name: z
    .string()
    .trim()
    .min(2, {
      error: "Name must contain at least 2 characters.",
    })
    .max(100, {
      error: "Name must not exceed 100 characters.",
    }),

  requester_email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, {
      error: "Email is required.",
    })
    .max(191, {
      error: "Email must not exceed 191 characters.",
    })
    .pipe(
      z.email({
        error: "Enter a valid email address.",
      }),
    ),

  reason: z
    .string()
    .trim()
    .min(3, {
      error: "Please provide a short reason.",
    })
    .max(191, {
      error: "Reason must not exceed 191 characters.",
    }),
});

export type CvRequestInput = z.infer<typeof cvRequestSchema>;

export type CvRequestFieldErrors = Partial<
  Record<keyof CvRequestInput, string[]>
>;

export type CvRequestActionState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: CvRequestFieldErrors;
};