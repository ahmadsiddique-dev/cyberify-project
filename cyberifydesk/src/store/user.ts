import { create } from 'zustand'

//     accessToken: accessToken,
//     user: {
//       _id: user._id,
//       email: user.email,
//       fullName: user.fullName,
//       role: user.role,
//     }

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
}

export const useUserStore = create<UserState>()((set) => ({
  accessToken: '',
  user: {
    _id: '',
    email: '',
    fullName: '',
    role: '',
  },
  setAuth: (accessToken, user) => set({ accessToken, user }),
}))