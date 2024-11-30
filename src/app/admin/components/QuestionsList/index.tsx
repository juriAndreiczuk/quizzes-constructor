'use client'

import useCollection from '@/app/hooks/useCollection'
import { getAllDocuments } from '@/services/docs.service'
import { IQuestionDetails } from '@/types/question.types'

const QuestionsList = () => {
  const questionsService = (): Promise<IQuestionDetails[]> => getAllDocuments<IQuestionDetails>('questions')
  const questions = useCollection(questionsService) as IQuestionDetails[]

  return (
    <ul>
      { questions && questions.map(q => (
        <li key={q.question}>
          {q.question}
          <ul>
            { q.answers && q.answers.length && (
              q.answers.map(answer => (
                <li key={answer.answer}>
                  {answer.answer}
                  { answer.right ? ' (right)' : '' }
                </li>
              ))
            )}
          </ul>
        </li>
      )) }
    </ul>
  )
}

export default QuestionsList
