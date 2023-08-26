import { create } from "zustand";

const useStore = create((set)=>({
    user:{},
    setUser:(user:any)=>set((state:any)=>({user : user}))
}))

export default useStore