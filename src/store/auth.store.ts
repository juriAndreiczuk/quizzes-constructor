import { create } from 'zustand'
import { getDocument } from '@/services/docs.service'
import { onAuthChange } from '@/services/auth.service'
import { IUserDetails, IUserState } from '@/types'

const useAuthStore = create<IUserState>(set => ({
  user: null,
  loading: true,

  setUser: (user: IUserDetails) => set({ user, loading: false }),

  initializeUser: () => {
    set({ loading: true })
    onAuthChange(async data => {
      if (data) {
        const userData = await getDocument<IUserDetails>(data.uid, 'users')
        set({ user: userData, loading: false })
      }
    })
  },

  setLoading: (loading: boolean) => set(() => ({ loading }))
}))

export default useAuthStore
