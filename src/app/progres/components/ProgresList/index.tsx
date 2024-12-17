'use client'

import useQuestionsStore from '@/store/questions.strore'
import { useEffect, useState } from 'react'
import useUsersStore from '@/store/users.store'
import { IQuestionDetails } from '@/types/question.types'

const ProgresList = () => {
  const { getQuestionsByIds } = useQuestionsStore()
  const { currentUser } = useUsersStore()
  const [userQuestions, setUserQuestions] = useState<IQuestionDetails[] | []>([])

  const getUserQuestions = async () => {
    const userQuestionsIds = currentUser?.progres && Object.keys(currentUser.progres)
    const currentQuestions = userQuestionsIds ? await getQuestionsByIds(userQuestionsIds) : []

    setUserQuestions(currentQuestions)
  }

  useEffect(() => {
    getUserQuestions()
  }, [currentUser])

  return (
    userQuestions && JSON.stringify(userQuestions)
  )

}

export default ProgresList
