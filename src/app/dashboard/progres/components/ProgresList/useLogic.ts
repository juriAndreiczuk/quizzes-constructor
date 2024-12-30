import { IQuestionDetails, IQuestionProgres } from '@/types'
import { useEffect, useState } from 'react'
import useQuestionsStore from '@/store/questions.strore'
import useUsersStore from '@/store/users.store'
import { useTeamsCollectionStore } from '@/store/collections.store'

const useLogic = () => {
  const { getQuestionsByIds } = useQuestionsStore()
  const { currentUser } = useUsersStore()
  const [completedQuestions, setCompletedQuestions] = useState<IQuestionProgres[]>([])
  const { items: teams } = useTeamsCollectionStore()

  const points = currentUser?.points ?? 0
  const userTeam = teams.filter(team => team.id === currentUser?.teamId)[0]

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

  return { completedQuestions, filteredQuestions, points, userTeam }
}

export default useLogic
