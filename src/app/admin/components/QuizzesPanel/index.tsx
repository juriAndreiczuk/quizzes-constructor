'use client'

import { useEffect } from 'react'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import QuizzesForm from '@/app/admin/components/QuizzesPanel/QuizzesForm'
import QuizzesList from '@/app/admin/components/QuizzesPanel/QuizzesList'
import QuizzesQuestion from '@/app/admin/components/QuizzesPanel/QuizzesQuestion'
import ContentCard from '@/app/components/layout/ContentCard'

const TeamsPanel = () => {
  const { fetchItems: fetchQuizzes } = useQuizzesCollectionStore()
  const { fetchQuestions, selectedQuestion } = useQuestionsStore()

  useEffect(() => {
    fetchQuizzes()
    fetchQuestions()
  }, [fetchQuizzes, fetchQuestions])

  return (
    <ContentCard>
      <h2 className='text-27 font-bold text-light'>Quizzez panel</h2>
      <QuizzesForm />
      <QuizzesList />
      <QuizzesQuestion
        key={selectedQuestion?.question}
      />
    </ContentCard>
  )
}

export default TeamsPanel
