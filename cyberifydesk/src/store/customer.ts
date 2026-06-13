import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Customer = {
  _id: string,
  email: string,
  fullName: string,
  role: string,
  organization?: string | null,
}

interface CustomerState {
  accessToken: string,
  user: Customer,
  setAuth: (accessToken: string, user: Customer) => void,
  clearAuth: () => void,
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      accessToken: '',
      user: {
        _id: '',
        email: '',
        fullName: '',
        role: '',
        organization: null,
      },
      setAuth: (accessToken, user) => set({ accessToken, user }),
      clearAuth: () =>
        set({
          accessToken: '',
          user: {
            _id: '',
            email: '',
            fullName: '',
            role: '',
            organization: null,
          },
        }),
    }),
    {
      name: 'customer-auth-storage',
    }
  )
)
