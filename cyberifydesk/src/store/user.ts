import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  _id: string,
  email: string,
  fullName: string,
  role: string,
}

interface UserState {
  accessToken: string,
  user: User,
  setAuth: (accessToken: string, user: User) => void,
  clearAuth: () => void,
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: '',
      user: {
        _id: '',
        email: '',
        fullName: '',
        role: '',
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
          },
        }),
    }),
    {
      name: 'user-auth-storage',
    }
  )
)