"use client"

import * as React from "react"
import { useCustomerStore } from "@/store/customer"
import { useApi } from "@/hooks/apiClient"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  IconMail,
  IconLock,
  IconUser,
  IconCircleCheck,
  IconLoader2,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

interface HelpCenterAuthProps {
  organizationName: string
}

export function HelpCenterAuth({ organizationName }: HelpCenterAuthProps) {
  const [tab, setTab] = React.useState<"signin" | "signup">("signin")
  const [step, setStep] = React.useState<1 | 2>(1)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [fullName, setFullName] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [mockOtp, setMockOtp] = React.useState("")
  const [errorMsg, setErrorMsg] = React.useState("")

  const setAuth = useCustomerStore((state) => state.setAuth)

  const { loading: signinLoading, execute: executeSignIn } = useApi(
    React.useCallback(
      (payload: any) =>
        api.post("/api/auth/agent/signin", payload, {
          headers: { "X-Role": "customer" },
        }).then((res) => res.data),
      []
    )
  )

  const { loading: signupLoading, execute: executeSignUp } = useApi(
    React.useCallback(
      (payload: any) =>
        api.post("/api/auth/agent/signup", payload, {
          headers: { "X-Role": "customer" },
        }).then((res) => res.data),
      []
    )
  )

  const { loading: verifyLoading, execute: executeVerify } = useApi(
    React.useCallback(
      (url: string, payload: any) =>
        api.patch(url, payload, {
          headers: { "X-Role": "customer" },
        }).then((res) => res.data),
      []
    )
  )

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (tab === "signup" && password !== confirmPassword) {
      setErrorMsg("Passwords do not match")
      return
    }

    try {
      if (tab === "signin") {
        const res = await executeSignIn({ email, password })
        if (res && res.success) {
          if (res.otp) {
            setMockOtp(res.otp)
          }
          setStep(2)
        } else {
          setErrorMsg(res?.message || "Invalid credentials")
        }
      } else {
        const res = await executeSignUp({
          name: fullName,
          email,
          password,
          organizationName,
          role: "user",
        })
        if (res && res.success) {
          setStep(2)
        } else {
          setErrorMsg(res?.message || "Registration failed")
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred")
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    const url = tab === "signin" ? "/api/auth/agent/signin" : "/api/auth/agent/signup"
    try {
      const res = await executeVerify(url, { email, otp })
      if (res && res.success) {
        setAuth(res.accessToken, res.user)
      } else {
        setErrorMsg(res?.message || "Invalid verification code")
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred")
    }
  }

  const handleGenerateMockOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setMockOtp(code)
    setOtp(code)
  }

  return (
    <div className="mx-auto w-full max-w-md border border-border/40 bg-card/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-extrabold tracking-tight text-foreground">
          {step === 1 ? "Customer Authentication" : "Verify Email"}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {step === 1
            ? `Connect with ${organizationName} support portal`
            : "Enter the verification code sent to your email"}
        </p>
      </div>

      {step === 1 ? (
        <div className="flex flex-col gap-6">
          <div className="flex border-b border-border/40 p-0.5 bg-muted/30 rounded-lg">
            <button
              onClick={() => {
                setTab("signin")
                setErrorMsg("")
              }}
              className={cn(
                "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all",
                tab === "signin"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Have Account
            </button>
            <button
              onClick={() => {
                setTab("signup")
                setErrorMsg("")
              }}
              className={cn(
                "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all",
                tab === "signup"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              New Account
            </button>
          </div>

          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            {tab === "signup" && (
              <Field>
                <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <IconUser className="size-3.5" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="text-xs py-2 h-9"
                  />
                </InputGroup>
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <IconMail className="size-3.5" />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="text-xs py-2 h-9"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <IconLock className="size-3.5" />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="text-xs py-2 h-9"
                />
              </InputGroup>
            </Field>

            {tab === "signup" && (
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <IconLock className="size-3.5" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="text-xs py-2 h-9"
                  />
                </InputGroup>
              </Field>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-2.5 text-2xs text-destructive">
                {errorMsg}
              </div>
            )}

            <Button
              type="submit"
              disabled={signinLoading || signupLoading}
              className="mt-2 rounded-full bg-linear-to-r from-orange-600 to-amber-500 py-4 font-semibold text-white shadow-md shadow-orange-500/10 hover:from-orange-500 hover:to-amber-400 text-xs h-9"
            >
              {signinLoading || signupLoading ? (
                <>
                  <IconLoader2 className="size-4 animate-spin mr-1.5" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <span>Send OTP</span>
              )}
            </Button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="otp">Verification Code (OTP)</FieldLabel>
              <button
                type="button"
                onClick={handleGenerateMockOtp}
                className="text-3xs font-semibold text-orange-500 hover:underline"
              >
                Generate OTP
              </button>
            </div>
            <div className="flex justify-center py-2">
              <InputOTP id="otp" maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-9 text-xs" />
                  <InputOTPSlot index={1} className="size-9 text-xs" />
                  <InputOTPSlot index={2} className="size-9 text-xs" />
                  <InputOTPSlot index={3} className="size-9 text-xs" />
                  <InputOTPSlot index={4} className="size-9 text-xs" />
                  <InputOTPSlot index={5} className="size-9 text-xs" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </Field>

          {mockOtp && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-2xs text-emerald-500">
              <IconCircleCheck className="size-3.5 shrink-0" />
              <span>
                Mock OTP generated:{" "}
                <strong className="font-mono tracking-widest">{mockOtp}</strong>{" "}
                (Auto-filled)
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-2.5 text-2xs text-destructive">
              {errorMsg}
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStep(1)
                setErrorMsg("")
              }}
              className="rounded-full border-border/80 px-4 font-semibold text-xs h-9"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={verifyLoading}
              className="grow rounded-full bg-linear-to-r from-orange-600 to-amber-500 py-4 font-semibold text-white shadow-md shadow-orange-500/10 hover:from-orange-500 hover:to-amber-400 text-xs h-9"
            >
              {verifyLoading ? (
                <>
                  <IconLoader2 className="size-4 animate-spin mr-1.5" />
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Verify & Sign In</span>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
