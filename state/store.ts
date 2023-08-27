import { create } from "zustand";

interface UserState {
    user: any
    setUser: (user:any) => void
  }
  
  const useUserStore = create<UserState>()((set) => ({
    user: 0,
    setUser: (user) => set((state) => ({ user:user})),
  }))


export default useUserStore