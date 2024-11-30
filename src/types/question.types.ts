export interface IQuestionAnswer {
  answer: string
  right: boolean
}

export interface IQuestionDetails {
  question: string
  cost: number
  answers: IQuestionAnswer[]
}
