import { IQuestionDetails, IQuestionProgres, IProgresData } from '@/types'
import { useEffect, useState } from 'react'
import useQuestionsStore from '@/store/questions.strore'
import useUsersStore from '@/store/users.store'
import { useTeamsCollectionStore } from '@/store/collections.store'

const useLogic = (): {
  completedQuestions: IQuestionProgres[]
  filteredQuestions: (txt?: string) => IQuestionProgres[]
  userData: IProgresData
} => {
  const { getQuestionsByIds } = useQuestionsStore()
  const { currentUser } = useUsersStore()
  const [completedQuestions, setCompletedQuestions] = useState<IQuestionProgres[]>([])
  const { items: teams } = useTeamsCollectionStore()

  const userData = {
    points: currentUser?.points ?? 0,
    name: currentUser?.displayName ?? '',
    team: teams.filter(team => team.id === currentUser?.teamId)[0]?.name
  }

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
        progres: (question.id && currentUser.progres && currentUser.progres[question.id]) || [],
      }))

    setCompletedQuestions(result)
  }

  const filteredQuestions = (txt?: string): IQuestionProgres[] => {
    if (!txt) return completedQuestions

    return completedQuestions.filter(({ questionData }) => questionData.question
      .toLowerCase()
      .includes(txt.toLowerCase()))
  }

  useEffect(() => {
    getCompletedQuestions()
  }, [currentUser])

  return { completedQuestions, filteredQuestions, userData }
}

export default useLogic
