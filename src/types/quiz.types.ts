export interface IQuizDetails {
  id?: string
  label: string
  items: string[]
}

export interface IQuizzesState {
  quizzes: IQuizDetails[]
  fetchQuizzes: () => Promise<void>
  createQuiz: (quiz: IQuizDetails) => Promise<void>
  removeQuiz: (quizId: string) => Promise<void>
}
