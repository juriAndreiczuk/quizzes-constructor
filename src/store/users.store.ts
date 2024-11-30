import { create } from 'zustand'
import { IUserDetails, IUserUpdate, IUsersState } from '@/types/user.types'
import { getAllDocuments, updateDocument } from '@/services/docs.service'
import { updateTeamMembers } from '@/services/teams.service'
import { IUpdateOperation } from '@/types/team.types'

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
      await updateTeamMembers(userData.teamId, userData.id, IUpdateOperation.Remove)
      await updateTeamMembers(vals.teamId, userData.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'users', userData.id)
      await useTeamStore.getState().fetchUsers()
    }
  }
}))

export default useTeamStore
