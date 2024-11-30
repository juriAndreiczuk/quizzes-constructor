import { create } from 'zustand'
import { getAllDocuments } from '@/services/docs.service'
import { IQuiz, IQuizzesState } from '@/types/quiz.types'
import { createQuiz as createQuizApi } from '@/services/quizzes.service'

const useQuizzesStore = create<IQuizzesState>(set => ({
  quizzes: [],

  fetchQuizzes: async () => {
    const quizzes = await getAllDocuments<IQuiz>('quizzes')
    set({ quizzes })
  },
  createQuiz: async (values: IQuiz) => {
    await createQuizApi(values)
    await useQuizzesStore.getState().fetchQuizzes()
  }
}))

export default useQuizzesStore
