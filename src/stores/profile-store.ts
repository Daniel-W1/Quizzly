import { Profile } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfileStore {
    profile: Profile | null
    setProfile: (profile: Profile) => void
    getProfile: () => Profile | null
}

export const useProfileStore = create<ProfileStore>()(
    persist(
      (set, get) => ({
        profile: null,
        setProfile: (profile: Profile) => set({ profile }),
        getProfile: () => get().profile
      }),
      {
        name: 'profile-store'
      },
    )
)

