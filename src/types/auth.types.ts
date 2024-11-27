import { IUserDetails } from './user.types'

export enum AuthMode {
  Login,
  Registration
}

export interface IAuthLogin {
  email: string
  password: string
}

export interface IAuthRegister extends IAuthLogin, Omit<IUserDetails, 'points'> {}


export interface IAuthInput {
  label: string
  name: string
  teamId?: string
  type: string
  options?: {
    id: string
    name: string
  }[]
}

export enum AuthTokens {
  'ID_TOKEN' = 'idToken'
}


