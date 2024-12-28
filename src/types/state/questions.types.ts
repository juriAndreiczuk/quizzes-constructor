import type { IQuizDetails, IQuestionDetails } from '@/types'

export interface IQuestionsState {
  questions: IQuestionDetails[]
  selectedQuestion: IQuestionDetails | null
  setSelectedQuestion: (question: IQuestionDetails | null) => void
  fetchQuestions: () => Promise<void>,
  updateQuestion: (vals: IQuestionDetails) => Promise<void>
  removeQuestion: () => Promise<void>
  createQuestion: (vals: IQuestionDetails) => Promise<void>
  getQuestionsByQuiz: (vals: IQuizDetails) => IQuestionDetails[]
  getQuestionsByIds: (ids: string[]) => Promise<IQuestionDetails[] | []>
}
