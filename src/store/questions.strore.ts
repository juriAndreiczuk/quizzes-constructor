import { create } from 'zustand'
import _chunk from 'lodash/chunk'
import { updateDocument, removeDocument } from '@/services/docs.service'
import { getCollection, addToCollection, updateCollection } from '@/services/collections.service'
import { IQuestionDetails, IQuizDetails, IQuestionsState, IUpdateOperation } from '@/types'

const useQuestionsStore = create<IQuestionsState>(set => ({
  questions: [],
  selectedQuestion: null,

  setSelectedQuestion: (selectedQuestion: IQuestionDetails | null) => set({ selectedQuestion }),

  fetchQuestions: async () => {
    const questions = await getCollection<IQuestionDetails>('questions')
    set({ questions })
  },

  updateQuestion: async (vals: IQuestionDetails) => {
    const { selectedQuestion: question, fetchQuestions } = useQuestionsStore.getState()
    if (question !== null && question.id) {
      await updateCollection('quizzes', 'items', question.quizId, question.id, IUpdateOperation.Remove)
      await updateCollection('quizzes', 'items', vals.quizId, question.id, IUpdateOperation.Add)
      await updateDocument({ ...vals }, 'questions', question.id)
      await fetchQuestions()
    }
  },

  removeQuestion: async () => {
    const { selectedQuestion, fetchQuestions } = useQuestionsStore.getState()
    if (selectedQuestion !== null && selectedQuestion.id) {
      await removeDocument('questions', selectedQuestion.id)
      await updateCollection('quizzes', 'items', selectedQuestion.quizId, selectedQuestion.id, IUpdateOperation.Remove)
    }
    await fetchQuestions()
  },

  createQuestion: async (vals: IQuestionDetails) => {
    const { fetchQuestions } = useQuestionsStore.getState()
    const newQuestion = await addToCollection<IQuestionDetails>('questions', vals, 'question')
    if (newQuestion) {
      await updateCollection('quizzes', 'items', vals.quizId, newQuestion.id, IUpdateOperation.Add)
      await fetchQuestions()
    }
  },

  getQuestionsByQuiz: (quiz: IQuizDetails): IQuestionDetails[] => {
    const { questions } = useQuestionsStore.getState()
    return questions.length ? questions.filter(q => q.quizId === quiz.id) : []
  },

  getQuestionsByIds: async (ids: string[]): Promise<IQuestionDetails[] | []> => {
    const promises = _chunk(ids, 10).map(chunk => getCollection<IQuestionDetails>('questions', chunk))
    const data = await Promise.all(promises)
    const result = data.filter((doc): doc is IQuestionDetails[] => doc !== null)

    return result.flat()
  }
}))

export default useQuestionsStore
