import { create } from 'zustand'
import { IUserDetails, IUserUpdate, IUserCompare } from '@/types/user.types'
import { getAllDocuments, removeDocument, updateDocument } from '@/services/docs.service'
import { createTeam as createTeamApi, updateTeamMembers } from '@/services/teams.service'
import { IUpdateOperation, ITeam, ITeamState } from '@/types/team.types'

const useTeamStore = create<ITeamState>(set => ({
  selectedUser: null,
  teams: [],
  users: [],
  setTeams: (teams: ITeam[]) => set({ teams }),
  setUsers: (users: IUserDetails[]) => set({ users }),
  setSelectedUser: (selectedUser: IUserDetails | null) => set({ selectedUser }),

  fetchTeams: async () => {
    const teams = await getAllDocuments<ITeam>('teams')
    set({ teams })
  },
  fetchUsers: async () => {
    const users = await getAllDocuments<IUserDetails>('users')
    set({ users })
  },

  removeTeam: async (teamId: string) => {
    await removeDocument('teams', teamId)
    await useTeamStore.getState().fetchTeams()
  },
  createTeam: async (values: ITeam) => {
    await createTeamApi(values)
    await useTeamStore.getState().fetchTeams()
  },
  updateUser: async (vals: IUserUpdate, userData: IUserDetails) => {
    const hasUserChanged = ({ userVals, data, elements } : IUserCompare)
    : boolean => elements.some(elt => userVals[elt] !== data[elt])

    if (
      hasUserChanged({ userVals: vals, data: userData, elements: ['displayName', 'teamId', 'isBlocked'] })
      && userData.id
    ) {
      await updateTeamMembers(userData.teamId, userData.id, IUpdateOperation.Remove)
      await updateTeamMembers(vals.teamId, userData.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'users', userData.id)

      await useTeamStore.getState().fetchTeams()
      await useTeamStore.getState().fetchUsers()
    }
  }
}))

export default useTeamStore
