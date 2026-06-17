import axios from "axios"
import { useUserStore } from "@/store/user"
import { useCustomerStore } from "@/store/customer"

export const api = axios.create({
  baseURL: "/",
})

api.interceptors.request.use((config) => {
  const headers = config.headers
  const isCustomer = headers && (
    headers["X-Role"] === "customer" || 
    headers["x-role"] === "customer" ||
    (typeof headers.get === "function" && headers.get("x-role") === "customer")
  )
  const token = isCustomer
    ? useCustomerStore.getState().accessToken
    : useUserStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const headers = error.config?.headers
      const isCustomer = headers && (
        headers["X-Role"] === "customer" || 
        headers["x-role"] === "customer" ||
        (typeof headers.get === "function" && headers.get("x-role") === "customer")
      )
      if (isCustomer) {
        useCustomerStore.getState().clearAuth()
      } else {
        useUserStore.getState().clearAuth()
        const isAuthRequest = error.config?.url?.includes("/api/auth/signin") || error.config?.url?.includes("/api/auth/signup")
        const isAuthPath = typeof window !== "undefined" && ["/signin", "/signup", "/forgot-password"].some((p) => window.location.pathname.endsWith(p))
        if (typeof window !== "undefined" && !isAuthRequest && !isAuthPath) {
          window.location.href = "/signin"
        }
      }
    }
    return Promise.reject(error)
  }
)
