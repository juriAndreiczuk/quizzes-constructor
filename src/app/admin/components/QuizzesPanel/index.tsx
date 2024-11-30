'use client'

import { useEffect } from 'react'
import useQuizzesStore from '@/store/quizzes.store'
import useQuestionsStore from '@/store/questions.strore'
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
      Quizzez panel
      <QuizzesList />
      <QuizzesQuestion
        key={selectedQuestion?.question}
      />
    </div>
  )
}

export default TeamsPanel
