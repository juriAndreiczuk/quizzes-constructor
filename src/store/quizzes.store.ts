import { create } from 'zustand'
import { getAllDocuments, removeDocument } from '@/services/docs.service'
import { IQuizDetails, IQuizzesState } from '@/types/quiz.types'
import { createQuiz as createQuizApi } from '@/services/quizzes.service'

const useQuizzesStore = create<IQuizzesState>(set => ({
  quizzes: [],

  fetchQuizzes: async () => {
    const quizzes = await getAllDocuments<IQuizDetails>('quizzes')
    set({ quizzes })
  },
  createQuiz: async (values: IQuizDetails) => {
    await createQuizApi(values)
    await useQuizzesStore.getState().fetchQuizzes()
  },
  removeQuiz: async (quizId: string) => {
    await removeDocument('quizzes', quizId)
    await useQuizzesStore.getState().fetchQuizzes()
  }
}))

export default useQuizzesStore
