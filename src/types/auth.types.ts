import { User } from 'firebase/auth'

export interface IUser extends User {
  name?: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserRegister extends IUserLogin {
  displayName: string
}

export interface IAuthContextProps {
  user: IUser | null
  loading: boolean
}

export enum AuthMode {
  Login,
  Registration
}

export enum AuthTokens {
  'ID_TOKEN' = 'idToken'
}
