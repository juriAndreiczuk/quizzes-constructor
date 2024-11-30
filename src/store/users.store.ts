import { create } from 'zustand'
import { IUserDetails, IUserUpdate, IUsersState } from '@/types/user.types'
import { getAllDocuments, updateDocument, updateCollectionItem } from '@/services/docs.service'
import { IUpdateOperation } from '@/types/collection.types'

const useTeamStore = create<IUsersState>(set => ({
  selectedUser: null,
  users: [],

  setSelectedUser: (selectedUser: IUserDetails | null) => set({ selectedUser }),
  fetchUsers: async () => {
    const users = await getAllDocuments<IUserDetails>('users')
    set({ users })
  },
  updateUser: async (vals: IUserUpdate, userData: IUserDetails) => {
    if (userData.id) {
      await updateCollectionItem('teams', 'members', userData.teamId, userData.id, IUpdateOperation.Remove)
      await updateCollectionItem('teams', 'members', vals.teamId, userData.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'users', userData.id)
      await useTeamStore.getState().fetchUsers()
    }
  }
}))

export default useTeamStore
