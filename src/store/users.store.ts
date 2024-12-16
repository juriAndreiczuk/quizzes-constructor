import { create } from 'zustand'
import { IUserDetails, IUserProgres, IUserUpdate, IUsersState } from '@/types/user.types'
import { IQuestionAnswer } from '@/types/question.types'
import { getAllDocuments, updateDocument, updateCollectionItems, getDocumentData } from '@/services/docs.service'
import { IUpdateOperation } from '@/types/collection.types'

const useTeamStore = create<IUsersState>(set => ({
  selectedUser: null,
  users: [],
  currentUser: null,

  setSelectedUser: (selectedUser: IUserDetails | null) => set({ selectedUser }),

  setCurrentUser: (currentUser: IUserDetails | null) => set({ currentUser }),

  fetchCurrentUser: async () => {
    const { currentUser } = useTeamStore.getState()
    if (!currentUser || !currentUser.id) return

    const userData = await getDocumentData<IUserDetails>(currentUser.id, 'users')
    set({ currentUser: userData })
  },

  fetchUsers: async () => {
    const users = await getAllDocuments<IUserDetails>('users')
    set({ users })
  },

  updateUser: async (vals: IUserUpdate, userData: IUserDetails) => {
    if (userData.id) {
      await updateCollectionItems('teams', 'members', userData.teamId, userData.id, IUpdateOperation.Remove)
      await updateCollectionItems('teams', 'members', vals.teamId, userData.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'users', userData.id)
      await useTeamStore.getState().fetchUsers()
    }
  },

  updateUserProgres: async (vals: IUserProgres, answerPoints: number) => {
    const { currentUser, fetchCurrentUser } = useTeamStore.getState()
    if (!currentUser || !currentUser.id) return

      const progres = (currentUser.progres || {}) as { [key: string]: IQuestionAnswer[] }
      progres[vals.questionID] = vals.answers      

      const points = currentUser.points + answerPoints

      await updateDocument({ progres, points }, 'users', currentUser.id)
      await fetchCurrentUser()
  }
}))

export default useTeamStore
