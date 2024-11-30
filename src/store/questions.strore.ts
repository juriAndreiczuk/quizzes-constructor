import { create } from 'zustand'
import { getAllDocuments, updateDocument, removeDocument } from '@/services/docs.service'
import { IQuestionDetails, IQuestionsState } from '@/types/question.types'

const useQuestionsStore = create<IQuestionsState>(set => ({
  questions: [],
  selectedQuestion: null,

  setSelectedQuestion: (selectedQuestion: IQuestionDetails | null) => set({ selectedQuestion }),
  fetchQuestions: async () => {
    const questions = await getAllDocuments<IQuestionDetails>('questions')
    set({ questions })
  },
  updateQuestion: async (vals: IQuestionDetails) => {
    const { selectedQuestion, fetchQuestions } = useQuestionsStore.getState()
    if (selectedQuestion !== null && selectedQuestion.id) {
      await updateDocument({ ...vals }, 'questions', selectedQuestion.id)
      await fetchQuestions()
    }
  },
  removeQuestion: async () => {
    const { selectedQuestion, fetchQuestions } = useQuestionsStore.getState()
    if (selectedQuestion !== null && selectedQuestion.id) {
      await removeDocument('questions', selectedQuestion.id)
    }
    await fetchQuestions()
  },
}))

export default useQuestionsStore
