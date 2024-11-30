import { create } from 'zustand'
import {
  getAllDocuments, createDocument,
  updateDocument, removeDocument, updateCollectionItems
} from '@/services/docs.service'
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
      await updateCollectionItems('quizzes', 'items', question.quizId, question.id, IUpdateOperation.Remove)
      await updateCollectionItems('quizzes', 'items', vals.quizId, question.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'questions', question.id)
      await fetchQuestions()
    }
  },
  removeQuestion: async () => {
    const { selectedQuestion, fetchQuestions } = useQuestionsStore.getState()
    if (selectedQuestion !== null && selectedQuestion.id) {
      await removeDocument('questions', selectedQuestion.id)
      await updateCollectionItems('quizzes', 'items', selectedQuestion.quizId, selectedQuestion.id, IUpdateOperation.Remove)
    }
    await fetchQuestions()
  },
  createQuestion: async (vals: IQuestionDetails) => {
    const { fetchQuestions } = useQuestionsStore.getState()
    const newQuestion = await createDocument<IQuestionDetails>('questions', vals, 'question')
    if (newQuestion) {
      await updateCollectionItems('quizzes', 'items', vals.quizId, newQuestion.id, IUpdateOperation.Add)
      await fetchQuestions()
    }
  }
}))

export default useQuestionsStore
