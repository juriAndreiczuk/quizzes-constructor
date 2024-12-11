export interface IQuizDetails {
  id?: string
  label: string,
  description?: string,
  items: string[]
}

export interface IQuestionAnswer {
  answer: string
  right: boolean
}

export enum IQuestionKind {
  Swither,
  Radio,
  Checkbox
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
  updateQuestion: (vals: IQuestionDetails) => Promise<void>
  removeQuestion: () => Promise<void>
  createQuestion: (vals: IQuestionDetails) => Promise<void>
  getQuestionsByQuiz: (vals: IQuizDetails) => IQuestionDetails[]
}
