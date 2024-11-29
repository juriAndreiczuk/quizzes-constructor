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
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options?: {
    id: string
    name: string
  }[]
}

export enum AuthTokens {
  'ID_TOKEN' = 'idToken',
  'USER_ROLE' = 'userRole'
}

export interface IFormField {
  name: string
  label: string
  type: string
  options?: { id: string; name: string }[]
}

export interface IFormContent {
  fields: {
    [key: string]: IFormField
  }
  button: string
}
