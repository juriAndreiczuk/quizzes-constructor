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
  id?: string
  quizId: string
  question: string
  cost: number
  answers: IQuestionAnswer[]
}

export interface IQuestionsState {
  questions: IQuestionDetails[]
  selectedQuestion: IQuestionDetails | null
  setSelectedQuestion: (question: IQuestionDetails | null) => void
  fetchQuestions: () => Promise<void>,
  updateQuestion: (vals: IQuestionDetails, questionData: IQuestionDetails) => Promise<void>
  removeQuestion: () => Promise<void>
}
