import { z } from "zod"

const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address" })
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
const otpSchema = z
  .string()
  .length(6, { message: "OTP must be exactly 6 digits" })
  .regex(/^\d+$/, { message: "OTP must contain only digits" })
const confirmPasswordSchema = z
  .string()
  .min(1, { message: "Confirm password is required" })

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  otp: otpSchema,
})

export const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    otp: otpSchema,
    organizationName: z
      .string()
      .min(2, { message: "Organization name must be at least 2 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignInFormValues = z.infer<typeof signInSchema>
export type SignUpFormValues = z.infer<typeof signUpSchema>

export const forgotPasswordSchema = z
  .object({
    email: emailSchema,
    otp: otpSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
