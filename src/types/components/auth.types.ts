import * as Yup from 'yup'
import type { IAuthLogin, IAuthRegister, AuthMode, IFormContent } from '@/types'

export interface IAuthForm {
  mode: AuthMode,
  startValues: IAuthLogin | IAuthRegister,
  formContent: IFormContent,
  validation: Yup.Schema
}

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
