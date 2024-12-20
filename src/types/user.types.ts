import { IQuestionAnswer } from '@/types/question.types'

export enum UserTypes {
  Admin,
  Player
}

export interface IUserProgres {
  [key: string]: IQuestionAnswer[]
}

export interface IUserDetails {
  id?: string
  displayName: string
  teamId: string
  userType: string
  points: number
  isBlocked?: boolean
  progres?: IUserProgres
}

export interface IUserState {
  user: IUserDetails | null
  loading: boolean
  setUser: (user: IUserDetails) => void
  setLoading: (loading: boolean) => void
  initializeUser: () => void
}

export interface IUserUpdate extends Pick<IUserDetails, 'displayName' | 'teamId' | 'isBlocked'> {}

export interface IUsersState {
  users: IUserDetails[]
  selectedUser: IUserDetails | null
  currentUser: IUserDetails | null
  setSelectedUser: (user: IUserDetails | null) => void
  setCurrentUser: (user: IUserDetails | null) => void
  fetchUsers: () => Promise<void>
  fetchCurrentUser: () => Promise<void>
  updateUser: (vals: IUserUpdate, userData: IUserDetails) => Promise<void>
  updateUserProgres: (vals: IUserProgres, answerPoints: number) => Promise<void>
}

export interface ITeam {
  name: string,
  id?: string,
  members?: []
}

export interface ITeamRarting {
  team: ITeam
  points: number
}
