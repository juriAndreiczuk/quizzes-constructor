export enum UserTypes {
  Admin,
  Player
}

export interface IUserDetails {
  displayName: string
  teamId: string
  userType: string
  points: number
}

export interface IUserState {
  user: IUserDetails | null
  loading: boolean
  setUser: (user: IUserDetails) => void
  setLoading: (loading: boolean) => void
  initializeUser: () => void
}
