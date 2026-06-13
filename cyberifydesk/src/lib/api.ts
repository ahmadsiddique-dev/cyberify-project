import axios from "axios"
import { useUserStore } from "@/store/user"

export const api = axios.create({
  baseURL: "/",
})

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().clearAuth()
      if (typeof window !== "undefined") {
        window.location.href = "/signin"
      }
    }
    return Promise.reject(error)
  }
)
