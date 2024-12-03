'use client'

import { useEffect } from 'react'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import QuizzesForm from '@/app/admin/components/QuizzesPanel/QuizzesForm'
import QuizzesList from '@/app/admin/components/QuizzesPanel/QuizzesList'
import QuizzesQuestion from '@/app/admin/components/QuizzesPanel/QuizzesQuestion'

const TeamsPanel = () => {
  const { fetchItems: fetchQuizzes } = useQuizzesCollectionStore()
  const { fetchQuestions, selectedQuestion } = useQuestionsStore()

  useEffect(() => {
    fetchQuizzes()
    fetchQuestions()
  }, [fetchQuizzes, fetchQuestions])

  return (
    <div className='bg-light p-16 rounded-xl mt-32'>
      <h2 className='text-20 font-bold text-main'>Quizzez panel</h2>
      <QuizzesForm />
      <QuizzesList />
      <QuizzesQuestion
        key={selectedQuestion?.question}
      />
    </div>
  )
}

export default TeamsPanel
