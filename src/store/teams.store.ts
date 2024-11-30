import { create } from 'zustand'
import { getAllDocuments, removeDocument } from '@/services/docs.service'
import { createTeam as createTeamApi } from '@/services/teams.service'
import { ITeam, ITeamState } from '@/types/team.types'

const useTeamStore = create<ITeamState>(set => ({
  teams: [],

  fetchTeams: async () => {
    const teams = await getAllDocuments<ITeam>('teams')
    set({ teams })
  },
  removeTeam: async (teamId: string) => {
    await removeDocument('teams', teamId)
    await useTeamStore.getState().fetchTeams()
  },
  createTeam: async (values: ITeam) => {
    await createTeamApi(values)
    await useTeamStore.getState().fetchTeams()
  }
}))

export default useTeamStore
