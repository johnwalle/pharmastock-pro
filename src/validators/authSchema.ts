import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Full name must include both first and last name",
    }),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    }),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

