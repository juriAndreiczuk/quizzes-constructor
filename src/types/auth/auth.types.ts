import { IUserDetails } from '@/types'

export interface IAuthLogin {
  email: string
  password: string
}

export interface IAuthRegister extends IAuthLogin, Omit<IUserDetails, 'points'> {}
