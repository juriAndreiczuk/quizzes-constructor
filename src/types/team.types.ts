import { IUserDetails, IUserUpdate } from '@/types/user.types'

export interface ITeam {
  name: string,
  id?: string,
  members?: []
}

export enum IUpdateOperation {
  Add,
  Remove
}

export interface ITeamState {
  teams: ITeam[]
  users: IUserDetails[]
  createTeam: (team: ITeam) => Promise<void>
  selectedUser: IUserDetails | null
  setTeams: (teams: ITeam[]) => void
  setUsers: (users: IUserDetails[]) => void
  setSelectedUser: (user: IUserDetails | null) => void
  fetchTeams: () => Promise<void>
  fetchUsers: () => Promise<void>
  removeTeam: (teamId: string) => Promise<void>
  updateUser: (vals: IUserUpdate, userData: IUserDetails) => Promise<void>
}
