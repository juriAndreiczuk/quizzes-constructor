export interface IQuiz {
  id: string
  label: string
  items: string[]
}

export interface IQuizzesState {
  quizzes: IQuiz[]
  fetchQuizzes: () => Promise<void>
}
