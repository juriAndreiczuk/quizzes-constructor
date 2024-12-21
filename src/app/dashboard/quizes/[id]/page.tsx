'use client'

import { useEffect, use } from 'react'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import QuestionsList from '@/app/dashboard/quizes/[id]/components/QuestionsList'

const QuizzesPage = ({ params } : { params: Promise<{ id: string }> }) => {
  const { id } = use<{ id: string }>(params)
  const { fetchItem: fetchQuizz, currentItem: currentQuiz } = useQuizzesCollectionStore()

  useEffect(() => {
    fetchQuizz(id)
  }, [id])

  return (
    <>
      { currentQuiz ? (
        <QuestionsList currentQuiz={currentQuiz} />
      ) : <p className='text-16 text-white font-bold mt-32'>Quiz not founded</p> }
    </>
  )
}

export default QuizzesPage
