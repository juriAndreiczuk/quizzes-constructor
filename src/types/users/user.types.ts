import type { IQuestionAnswer } from '@/types'

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
