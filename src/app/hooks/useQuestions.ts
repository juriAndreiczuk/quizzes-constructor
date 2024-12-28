import useQuestionsStore from '@/store/questions.strore'
import useUsersStore from '@/store/users.store'
import { IQuizDetails } from '@/types'
import { useEffect } from 'react'

const useQuestions = (currentQuiz: IQuizDetails) => {
  const { getQuestionsByQuiz, fetchQuestions } = useQuestionsStore()
  const { currentUser } = useUsersStore()

  const allQuestions = getQuestionsByQuiz(currentQuiz)

  const newQuestions = !currentUser?.progres
    ? allQuestions : allQuestions.filter(item => item.id && !currentUser.progres?.[item.id])

  const currentIndex = allQuestions.length - newQuestions.length
  const currentProgres = ((currentIndex / allQuestions.length) * 100).toFixed(0)

  useEffect(() => {
    fetchQuestions()
  }, [currentQuiz])

  return { allQuestions, newQuestions, currentIndex, currentProgres }
}

export default useQuestions
