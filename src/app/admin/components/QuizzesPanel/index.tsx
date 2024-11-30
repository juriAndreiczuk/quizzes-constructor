'use client'

import { useEffect } from 'react'
import useQuizzesStore from '@/store/quizzes.store'
import useQuestionsStore from '@/store/questions.strore'
import QuizzesForm from '@/app/admin/components/QuizzesPanel/QuizzesForm'
import QuizzesList from '@/app/admin/components/QuizzesPanel/QuizzesList'
import QuizzesQuestion from '@/app/admin/components/QuizzesPanel/QuizzesQuestion'

const TeamsPanel = () => {
  const { fetchQuizzes } = useQuizzesStore()
  const { fetchQuestions, selectedQuestion } = useQuestionsStore()

  useEffect(() => {
    fetchQuizzes()
    fetchQuestions()
  }, [fetchQuizzes, fetchQuestions])

  return (
    <div>
      <hr />
      <h1>Quizzez panel</h1>
      <QuizzesForm />
      <QuizzesList />
      <QuizzesQuestion
        key={selectedQuestion?.question}
      />
    </div>
  )
}

export default TeamsPanel
