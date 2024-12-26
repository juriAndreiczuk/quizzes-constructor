export interface IQuestionAnswer {
  answer: string
  right: boolean
}

export interface IQuestionDetails {
  id?: string
  quizId: string
  question: string
  cost: number
  answers: IQuestionAnswer[]
}

export interface IQuestionProgres {
  questionData: IQuestionDetails
  progres: IQuestionAnswer[] | []
}
