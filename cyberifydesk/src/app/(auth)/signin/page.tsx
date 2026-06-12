"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, type SignInFormValues } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  IconMail,
  IconLock,
  IconArrowLeft,
  IconCircleCheck,
  IconLoader2,
} from "@tabler/icons-react"
import { ThemeSwitch } from "@/components/elements/ThemeSwitch"

export default function Page() {
  const [generatedOtp, setGeneratedOtp] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [loginSuccess, setLoginSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema as any) as any,
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  })

  const handleGenerateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(code)
    setValue("otp", code, { shouldValidate: true })
  }

  const onSubmit = (data: SignInFormValues) => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setLoginSuccess(true)
    }, 1500)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans text-foreground transition-colors duration-300 selection:bg-primary/30">
      <div className="pointer-events-none absolute top-0 left-1/2 h-150 w-full max-w-7xl -translate-x-1/2 overflow-hidden">
        <div className="absolute -top-50 left-1/4 h-150 w-150 rounded-full bg-orange-600/10 blur-[150px] dark:bg-orange-600/15" />
        <div className="absolute -top-25 right-1/4 h-125 w-125 rounded-full bg-amber-500/10 blur-[130px] dark:bg-amber-500/15" />
      </div>

      <header className="absolute top-0 flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconArrowLeft className="size-4" />
          <span>Back to Home</span>
        </Link>

        <ThemeSwitch />
      </header>

      <div className="relative w-full max-w-md rounded-2xl border border-border/40 bg-card/30 p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Cyberify Desk Logo"
            width={40}
            height={40}
            className="mb-4 size-10 object-contain"
          />
          <h1 className="mb-2 text-2xl font-extrabold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access your Cyberify Desk helpdesk
          </p>
        </div>

        {loginSuccess ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <IconCircleCheck className="size-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Workspace Authenticated
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Verification succeeded. Redirecting to Ahmad Siddique&apos;s
                workspace...
              </p>
            </div>
            <IconLoader2 className="mt-2 size-5 animate-spin text-orange-500" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FieldGroup className="gap-5">
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <IconMail className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                </InputGroup>
                <FieldError>{errors.email?.message}</FieldError>
              </Field>

              <Field data-invalid={!!errors.password}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-2xs text-orange-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <IconLock className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                </InputGroup>
                <FieldError>{errors.password?.message}</FieldError>
              </Field>

              <Field data-invalid={!!errors.otp}>
                <div className="mb-1.5 flex items-center justify-between">
                  <FieldLabel htmlFor="otp">
                    6-Digit Verification Code (OTP)
                  </FieldLabel>
                  <button
                    type="button"
                    onClick={handleGenerateOtp}
                    className="text-2xs font-semibold text-orange-500 hover:underline"
                  >
                    Generate OTP
                  </button>
                </div>
                <Controller
                  control={control}
                  name="otp"
                  render={({ field }) => (
                    <InputOTP
                      id="otp"
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      aria-invalid={!!errors.otp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
                <FieldDescription>
                  Enter the verification code. You can click Generate OTP for a
                  mock code.
                </FieldDescription>
                <FieldError>{errors.otp?.message}</FieldError>
              </Field>

              {generatedOtp && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-500">
                  <IconCircleCheck className="size-4 shrink-0" />
                  <span>
                    Mock OTP generated:{" "}
                    <strong className="font-mono tracking-widest">
                      {generatedOtp}
                    </strong>{" "}
                    (Auto-filled)
                  </span>
                </div>
              )}
            </FieldGroup>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-linear-to-r from-orange-600 to-amber-500 py-5 font-semibold text-white shadow-md shadow-orange-500/10 hover:from-orange-500 hover:to-amber-400"
            >
              {isSubmitting ? (
                <>
                  <IconLoader2 className="size-4 animate-spin" />
                  <span>Verifying Workspace...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        )}

        <div className="mt-8 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          <span>Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="font-semibold text-orange-500 hover:underline"
          >
            Get Started
          </Link>
        </div>
      </div>

      <footer className="text-2xs mt-16 py-6 text-center text-muted-foreground">
        <span>Cyberify AI Support Desk built by Ahmad Siddique</span>
      </footer>

      {/* TODO: Connect sign-in verification payload to session endpoint */}
      {/* TODO: Replace mock OTP generation with actual SMS/email authentication service */}
    </div>
  )
}
