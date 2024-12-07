import useQuestionsStore from '@/store/questions.strore'
import { IQuizDetails } from '@/types/question.types'
import { useEffect } from 'react'

const QuizzQuestions = ({ currentQuiz }: { currentQuiz: IQuizDetails }) => {
  const { getQuestionsByQuiz, fetchQuestions } = useQuestionsStore()
  
  useEffect(() => {
    fetchQuestions()
  }, [ currentQuiz ])

  return (
    <div>{ JSON.stringify(getQuestionsByQuiz(currentQuiz)) }</div>
  )
}

export default QuizzQuestions
