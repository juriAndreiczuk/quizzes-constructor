import useQuestionsStore from '@/store/questions.strore'
import QuestionPanel from '@/app/quizzes/components/QuestionPanel'

import { IQuizDetails } from '@/types/question.types'
import { useEffect } from 'react'

const QuestionsList = ({ currentQuiz }: { currentQuiz: IQuizDetails }) => {
  const { getQuestionsByQuiz, fetchQuestions } = useQuestionsStore()

  useEffect(() => {
    fetchQuestions()
  }, [ currentQuiz ])

  return (
    <div>
      <h1 className='text-34 font-bold text-main'>{ currentQuiz.label }</h1>
      { currentQuiz.items ? getQuestionsByQuiz(currentQuiz).map(question => (
        <QuestionPanel
          key={question.id}
          questionData={question}
        />
      )) : (
        <p>Questions not founded</p>
      ) }
    </div>
  )
}

export default QuestionsList
