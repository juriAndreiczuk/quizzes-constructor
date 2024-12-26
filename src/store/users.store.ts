import { create } from 'zustand'
import {
  IUserUpdate, IUserListState, IUserDetails,
  IQuestionAnswer, IUpdateOperation, IUserProgres
} from '@/types'
import { updateDocument, getDocument } from '@/services/docs.service'
import { getCollection, updateCollection } from '@/services/collections.service'

const useTeamStore = create<IUserListState>(set => ({
  selectedUser: null,
  users: [],
  currentUser: null,

  setSelectedUser: (selectedUser: IUserDetails | null) => set({ selectedUser }),

  setCurrentUser: (currentUser: IUserDetails | null) => set({ currentUser }),

  fetchCurrentUser: async () => {
    const { currentUser } = useTeamStore.getState()
    if (!currentUser || !currentUser.id) return

    const userData = await getDocument<IUserDetails>(currentUser.id, 'users')
    set({ currentUser: userData })
  },

  fetchUsers: async () => {
    const users = await getCollection<IUserDetails>('users')
    set({ users })
  },

  updateUser: async (vals: IUserUpdate, userData: IUserDetails) => {
    if (userData.id) {
      await updateCollection('teams', 'members', userData.teamId, userData.id, IUpdateOperation.Remove)
      await updateCollection('teams', 'members', vals.teamId, userData.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'users', userData.id)
      await useTeamStore.getState().fetchUsers()
    }
  },

  updateUserProgres: async (vals: IUserProgres, answerPoints: number) => {
    const { currentUser, fetchCurrentUser } = useTeamStore.getState()
    if (!currentUser || !currentUser.id) return

      let progres = (currentUser.progres || {}) as { [key: string]: IQuestionAnswer[] }
      progres = { ...progres, ...vals }

      const points = currentUser.points + answerPoints
      await updateDocument({ progres, points }, 'users', currentUser.id)
      await fetchCurrentUser()
  }
}))

export default useTeamStore
