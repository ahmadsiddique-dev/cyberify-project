"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp"
import {
  IconMail,
  IconLock,
  IconArrowLeft,
  IconSparkles,
  IconSun,
  IconMoon,
  IconCircleCheck,
  IconLoader2,
  IconCheck,
  IconChevronRight,
  IconChevronLeft
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

export default function Page() {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [generatedOtp, setGeneratedOtp] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors }
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema as any) as any,
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: ""
    }
  })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleGenerateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(code)
    setValue("otp", code, { shouldValidate: true })
  }

  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      const isValid = await trigger("email")
      if (isValid) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      const isValid = await trigger("otp")
      if (isValid) {
        setCurrentStep(3)
      }
    }
  }

  const handlePrevStep = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        router.push("/signin")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300 font-sans flex flex-col justify-center items-center px-4 selection:bg-primary/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-1/4 w-[600px] h-[600px] rounded-full bg-orange-600/10 blur-[150px] dark:bg-orange-600/15" />
        <div className="absolute top-[-100px] right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[130px] dark:bg-amber-500/15" />
      </div>

      <header className="absolute top-0 w-full max-w-7xl h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/signin" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
          <IconArrowLeft className="size-4" />
          <span>Back to Sign In</span>
        </Link>

        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-muted"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <IconSun className="size-5 text-yellow-400" />
            ) : (
              <IconMoon className="size-5 text-orange-950" />
            )}
          </Button>
        )}
      </header>

      <div className="w-full max-w-md rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-8 shadow-2xl relative">
        <div className="flex flex-col items-center text-center mb-6">
          <Image
            src="/logo.png"
            alt="Cyberify Desk Logo"
            width={40}
            height={40}
            className="size-10 object-contain mb-4"
          />
          <h1 className="text-2xl font-extrabold tracking-tight mb-2">Reset Password</h1>
          <p className="text-xs text-muted-foreground">
            Recover your Cyberify Desk account password
          </p>
        </div>

        {!success && (
          <div className="w-full max-w-xs mx-auto mb-8 select-none">
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute left-6 right-6 top-3.5 h-0.5 -translate-y-1/2 z-0">
                <div className="w-full h-full bg-border" />
                <div 
                  className="absolute left-0 top-0 h-full bg-orange-500 transition-all duration-500"
                  style={{ 
                    width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" 
                  }}
                />
              </div>

              <div className="flex flex-col items-center z-10 w-12 relative">
                <div className={cn(
                  "flex size-7 items-center justify-center rounded-full border text-xs transition-all duration-300 bg-background",
                  currentStep > 1 
                    ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20" 
                    : currentStep === 1 
                      ? "border-orange-500 text-orange-500 ring-2 ring-orange-500/20 font-bold" 
                      : "border-border text-muted-foreground"
                )}>
                  {currentStep > 1 ? <IconCheck className="size-4" /> : "1"}
                </div>
                <span className={cn(
                  "absolute top-8 text-2xs font-semibold whitespace-nowrap transition-colors duration-300",
                  currentStep >= 1 ? "text-foreground" : "text-muted-foreground"
                )}>
                  Email
                </span>
              </div>

              <div className="flex flex-col items-center z-10 w-12 relative">
                <div className={cn(
                  "flex size-7 items-center justify-center rounded-full border text-xs transition-all duration-300 bg-background",
                  currentStep > 2 
                    ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20" 
                    : currentStep === 2 
                      ? "border-orange-500 text-orange-500 ring-2 ring-orange-500/20 font-bold" 
                      : "border-border text-muted-foreground"
                )}>
                  {currentStep > 2 ? <IconCheck className="size-4" /> : "2"}
                </div>
                <span className={cn(
                  "absolute top-8 text-2xs font-semibold whitespace-nowrap transition-colors duration-300",
                  currentStep >= 2 ? "text-foreground" : "text-muted-foreground"
                )}>
                  Verify
                </span>
              </div>

              <div className="flex flex-col items-center z-10 w-12 relative">
                <div className={cn(
                  "flex size-7 items-center justify-center rounded-full border text-xs transition-all duration-300 bg-background",
                  currentStep === 3 
                    ? "border-orange-500 text-orange-500 ring-2 ring-orange-500/20 font-bold" 
                    : "border-border text-muted-foreground"
                )}>
                  3
                </div>
                <span className={cn(
                  "absolute top-8 text-2xs font-semibold whitespace-nowrap transition-colors duration-300",
                  currentStep === 3 ? "text-foreground" : "text-muted-foreground"
                )}>
                  New Password
                </span>
              </div>
            </div>
            <div className="h-10" />
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <IconCircleCheck className="size-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Password Reset Successfully</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Your password has been updated. Redirecting to the Sign In workspace...
              </p>
            </div>
            <IconLoader2 className="size-5 animate-spin text-orange-500 mt-2" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FieldGroup className="gap-5">
              {currentStep === 1 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
                    <FieldDescription>
                      Enter the email address associated with your account.
                    </FieldDescription>
                    <FieldError>{errors.email?.message}</FieldError>
                  </Field>
                </div>
              )}

              {currentStep === 2 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Field data-invalid={!!errors.otp}>
                    <div className="flex justify-between items-center mb-1.5">
                      <FieldLabel htmlFor="otp">6-Digit Verification Code (OTP)</FieldLabel>
                      <button
                        type="button"
                        onClick={handleGenerateOtp}
                        className="text-2xs text-orange-500 hover:underline font-semibold"
                      >
                        Generate OTP
                      </button>
                    </div>
                    <Controller
                      control={control}
                      name="otp"
                      render={({ field }) => (
                        <div className="flex justify-center py-2">
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
                        </div>
                      )}
                    />
                    <FieldDescription>
                      Enter the code sent to your email. You can click Generate OTP for a mock code.
                    </FieldDescription>
                    <FieldError>{errors.otp?.message}</FieldError>
                  </Field>

                  {generatedOtp && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-500 flex items-center gap-2">
                      <IconCircleCheck className="size-4 shrink-0" />
                      <span>
                        Mock OTP generated: <strong className="font-mono tracking-widest">{generatedOtp}</strong> (Auto-filled)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Field data-invalid={!!errors.password}>
                    <FieldLabel htmlFor="password">New Password</FieldLabel>
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

                  <Field data-invalid={!!errors.confirmPassword}>
                    <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <IconLock className="size-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        {...register("confirmPassword")}
                        aria-invalid={!!errors.confirmPassword}
                      />
                    </InputGroup>
                    <FieldError>{errors.confirmPassword?.message}</FieldError>
                  </Field>
                </div>
              )}
            </FieldGroup>

            <div className="flex gap-3 mt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="rounded-full border-border/80 px-5 font-semibold"
                >
                  <IconChevronLeft className="size-4 mr-1" />
                  <span>Back</span>
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="grow rounded-full bg-linear-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold shadow-md shadow-orange-500/10 py-5"
                >
                  <span>Continue</span>
                  <IconChevronRight className="size-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="grow rounded-full bg-linear-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold shadow-md shadow-orange-500/10 py-5"
                >
                  {isSubmitting ? (
                    <>
                      <IconLoader2 className="size-4 animate-spin" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </div>

      <footer className="mt-16 text-center text-2xs text-muted-foreground py-6">
        <span>Cyberify AI Support Desk built by Ahmad Siddique</span>
      </footer>
    </div>
  )
}
