import * as Yup from 'yup'
import { IQuestionAnswer, IQuestionKind } from '@/types/question.types'
import { IAuthLogin, AuthMode, IAuthRegister, IFormContent } from '@/types/auth.types'

export interface IQuestionButton {
    buttonClick: () => void,
    isSelected: boolean,
    buttonIndex: number,
    answerData: { info: IQuestionAnswer, kind: IQuestionKind },
    isRight: boolean | undefined
}

export interface IQuestionControls {
  pointsAmount: string | number | undefined,
  showAlert: boolean | undefined,
  isDisabled: boolean | undefined
  onClick: () => void
}

export interface IButton { 
  children: React.ReactNode,
  btnLink?: string,
  btnMod?: 'primary' | 'accent' | 'primary-small' | 'accent-small',
  btnDisabled?: boolean,
  buttonClick?: () => void
}

export interface IAuthForm {
  mode: AuthMode,
  startValues: IAuthLogin | IAuthRegister,
  formContent: IFormContent,
  validation: Yup.Schema
}

export interface ITabs {
  children: React.ReactNode[],
  tabsLabels: string[]
}

export interface IPanelItem<T>   {
  listLabel: string
  listID: string | undefined
  listItems: T[]
  listSubitems: string[] | undefined
  listItemSelect: (val: T) => void
  listRemove: (val: string) => void
}
