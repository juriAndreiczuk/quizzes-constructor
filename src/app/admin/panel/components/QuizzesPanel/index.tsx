'use client'

import { useEffect } from 'react'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import QuizzesForm from '@/app/admin/panel/components/QuizzesPanel/QuizzesForm'
import QuizzesList from '@/app/admin/panel/components/QuizzesPanel/QuizzesList'
import QuizzesQuestion from '@/app/admin/panel/components/QuizzesPanel/QuizzesQuestion'
import ContentCard from '@/app/components/layout/ContentCard'

const TeamsPanel = () => {
  const { fetchItems: fetchQuizzes } = useQuizzesCollectionStore()
  const { fetchQuestions, selectedQuestion } = useQuestionsStore()

  useEffect(() => {
    fetchQuizzes()
    fetchQuestions()
  }, [fetchQuizzes, fetchQuestions])

  return (
    <>
      <ContentCard>
        <h2 className='text-27 font-bold text-light'>Quizzez panel</h2>
        <QuizzesForm />
        <QuizzesList />
      </ContentCard>
      <QuizzesQuestion
        key={selectedQuestion?.question}
      />
    </>
  )
}

export default TeamsPanel
