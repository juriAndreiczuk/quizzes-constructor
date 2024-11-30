import { create } from 'zustand'
import { getAllDocuments } from '@/services/docs.service'
import { IQuiz, IQuizzesState } from '@/types/quiz.types'

const useQuizzesStore = create<IQuizzesState>(set => ({
  quizzes: [],

  fetchQuizzes: async () => {
    const quizzes = await getAllDocuments<IQuiz>('quizzes')
    set({ quizzes })
  }
}))

export default useQuizzesStore
