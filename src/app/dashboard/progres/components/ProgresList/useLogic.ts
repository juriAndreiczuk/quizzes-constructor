import { IUserProgres } from '@/types/user.types'
import { IQuestionDetails } from '@/types/question.types'
import { useEffect, useState } from 'react'
import useQuestionsStore from '@/store/questions.strore'
import useUsersStore from '@/store/users.store'
import { IQuestionProgres } from '@/types/question.types'

const useLogic = () => {
  const { getQuestionsByIds } = useQuestionsStore()
  const { currentUser } = useUsersStore()
  const [completedQuestions, setCompletedQuestions] = useState<IQuestionProgres[]>([])

  const getCompletedQuestions = async () => {
    const userQuestionsIds = currentUser?.progres && Object.keys(currentUser.progres)
  
    if (!userQuestionsIds) {
      setCompletedQuestions([])
      return
    }

    const currentQuestions: IQuestionDetails[] = await getQuestionsByIds(userQuestionsIds)

    const result = currentQuestions
      .map(question => ({
        questionData: question,
        progres: question.id && (currentUser.progres as IUserProgres)[question.id] || [],
      }))

    setCompletedQuestions(result)
  }

  useEffect(() => {
    getCompletedQuestions()
  }, [currentUser])

  return { completedQuestions }
}

export default useLogic
