'use client'

import { useQuizzesCollectionStore } from '@/store/collections.store'
import { useEffect, use } from 'react'

const QuizzesPage = ({ params } : { params: Promise<{ id: string }> }) => {
  const { id } = use<{ id: string }>(params)

  const { fetchItem: fetchQuizz, currentItem: currentQuiz } = useQuizzesCollectionStore()
  
  useEffect(() => {
    fetchQuizz(id)
  }, [id])

  return currentQuiz && (
    <div>
      { currentQuiz?.label }
    </div>
  )
}

export default QuizzesPage
