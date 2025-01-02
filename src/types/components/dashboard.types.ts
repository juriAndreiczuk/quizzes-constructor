import type { IQuestionAnswer, IQuestionKind, IQuestionProgres } from '@/types'

export interface IQuestionButton {
  buttonClick: () => void
  isSelected: boolean
  buttonIndex: number
  answerData: { info: IQuestionAnswer, kind: IQuestionKind }
  isRight: boolean | undefined
}

export interface IQuestionControls {
  pointsAmount: string | number | undefined
  showAlert: boolean | undefined
  isDisabled: boolean | undefined
  onClick: () => void
}

export interface IProgresData {
  name: string
  team: string
  points: number | string
}

export interface IProgresList {
  completedQuestions: IQuestionProgres[]
  filteredQuestions: (txt?: string) => IQuestionProgres[]
}
