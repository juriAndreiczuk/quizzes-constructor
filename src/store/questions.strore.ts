import { create } from 'zustand'
import { getAllDocuments, updateDocument, removeDocument, updateCollectionItem } from '@/services/docs.service'
import { IQuestionDetails, IQuestionsState } from '@/types/question.types'
import { IUpdateOperation } from '@/types/collection.types'

const useQuestionsStore = create<IQuestionsState>(set => ({
  questions: [],
  selectedQuestion: null,

  setSelectedQuestion: (selectedQuestion: IQuestionDetails | null) => set({ selectedQuestion }),
  fetchQuestions: async () => {
    const questions = await getAllDocuments<IQuestionDetails>('questions')
    set({ questions })
  },
  updateQuestion: async (vals: IQuestionDetails) => {
    const { selectedQuestion: question, fetchQuestions } = useQuestionsStore.getState()
    if (question !== null && question.id) {
      await updateCollectionItem('quizzes', 'items', question.quizId, question.id, IUpdateOperation.Remove)
      await updateCollectionItem('quizzes', 'items', vals.quizId, question.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'questions', question.id)
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
