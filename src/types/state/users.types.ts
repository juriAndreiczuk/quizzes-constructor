import { IUserDetails, IUserProgres } from '@/types'

export interface IUserUpdate extends Pick<IUserDetails, 'displayName' | 'teamId' | 'isBlocked'> {}

export interface IUserListState {
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

export interface IUserState {
  user: IUserDetails | null
  loading: boolean
  setUser: (user: IUserDetails) => void
  setLoading: (loading: boolean) => void
  initializeUser: () => void
}
