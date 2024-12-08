'use client'

import { useEffect, use } from 'react'
import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile/index'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import QuestionsList from '@/app/quizzes/components/QuestionsList'

const QuizzesPage = ({ params } : { params: Promise<{ id: string }> }) => {
  const { id } = use<{ id: string }>(params)
  const { fetchItem: fetchQuizz, currentItem: currentQuiz } = useQuizzesCollectionStore()

  useEffect(() => {
    fetchQuizz(id)
  }, [id])

  return (
    <StatusChecker>
      <UserProfile />
      { currentQuiz ? (
        <QuestionsList currentQuiz={currentQuiz} />
      ) : 'quiz not founded' }
    </StatusChecker>
  )
}

export default QuizzesPage
