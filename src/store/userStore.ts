import { create } from 'zustand'
import { getUserData } from '@/services/user.service'
import { onAuthChange } from '@/services/auth.service'
import { IUserDetails, IUserState } from '@/types/user.types'


const useUserStore = create<IUserState>(set => ({
  user: null,
  loading: true,

  setUser: (user: IUserDetails) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: false }),
  initializeUser: () => {
    set({ loading: true })
    onAuthChange(async data => {
      if (data) {
        const userData = await getUserData(data.uid)
        set({ user: userData, loading: false })
      }
    })
  },
  setLoading: (loading: boolean) => set(() => ({ loading }))
}))

export default useUserStore
