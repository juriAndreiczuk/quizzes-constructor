export enum UserTypes {
  Admin,
  Player
}

export interface IUserDetails {
  id?: string
  displayName: string
  teamId: string
  userType: string
  points: number
  isBlocked?: boolean
}

export interface IUserState {
  user: IUserDetails | null
  loading: boolean
  setUser: (user: IUserDetails) => void
  setLoading: (loading: boolean) => void
  initializeUser: () => void
}

export interface IUserUpdate extends Pick<IUserDetails, 'displayName' | 'teamId' | 'isBlocked'> {}

export interface IUserCompare {
  userVals: IUserUpdate,
  data: IUserDetails,
  elements: (keyof IUserUpdate)[]
}
