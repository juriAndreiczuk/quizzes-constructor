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

export enum AuthTokens {
  'ID_TOKEN' = 'idToken'
}
