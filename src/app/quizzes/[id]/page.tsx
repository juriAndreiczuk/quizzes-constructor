'use client'

import { useEffect, use } from 'react'
import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile/index'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import QuizzQuestions from '@/app/quizzes/QuizzQuestions'

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
        <QuizzQuestions currentQuiz={currentQuiz} />
      ) : 'quiz not found' }
    </StatusChecker>
  )
}

export default QuizzesPage
