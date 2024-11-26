import { DocumentData } from 'firebase/firestore'

export interface IUserContextProps {
  user: DocumentData | null
  loading: boolean
}

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
