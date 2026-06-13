import axios from "axios"
import { useUserStore } from "@/store/user"
import { useCustomerStore } from "@/store/customer"

export const api = axios.create({
  baseURL: "/",
})

api.interceptors.request.use((config) => {
  const isCustomer = config.headers?.["X-Role"] === "customer"
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
      const isCustomer = error.config?.headers?.["X-Role"] === "customer"
      if (isCustomer) {
        useCustomerStore.getState().clearAuth()
      } else {
        useUserStore.getState().clearAuth()
        if (typeof window !== "undefined") {
          window.location.href = "/signin"
        }
      }
    }
    return Promise.reject(error)
  }
)
