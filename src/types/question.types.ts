export interface IQuizDetails {
  id: string
  label: string
  items: string[]
}

export interface IQuestionAnswer {
  answer: string
  right: boolean
}

export interface IQuestionDetails {
  quizId: string
  question: string
  cost: number
  answers: IQuestionAnswer[]
}
