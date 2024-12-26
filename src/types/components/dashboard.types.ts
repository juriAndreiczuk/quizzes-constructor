import { IQuestionAnswer, IQuestionKind } from '@/types'

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
