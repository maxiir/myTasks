import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState{
    auth: boolean
    setAuth: (state: boolean) => void
}

export const useAuthStore = create <UserState>()(
    persist((set) => ({
        auth: false,
        setAuth: (state:boolean) => set({auth: state})
    }),
    {
        name: 'UserAuth',
        storage: createJSONStorage(() => localStorage)
    }
    
))