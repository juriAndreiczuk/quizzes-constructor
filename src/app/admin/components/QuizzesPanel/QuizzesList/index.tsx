'use client'

import useCollection from '@/app/hooks/useCollection'
import { getAllDocuments } from '@/services/docs.service'
import { IQuestionDetails, IQuizDetails } from '@/types/question.types'

const QuestionsList = () => {
  const quizzesService = (): Promise<IQuizDetails[]> => getAllDocuments<IQuizDetails>('quizzes')
  const quizzes = useCollection(quizzesService) as IQuizDetails[]

  const questionsService = (): Promise<IQuestionDetails[]> => getAllDocuments<IQuestionDetails>('questions')
  const questions = useCollection(questionsService) as IQuestionDetails[]

  const getQuestions = (quiz: IQuizDetails): IQuestionDetails[] => (
    questions.length ? questions.filter(q => q.quizId === quiz.id) : []
  )

  return (
    <div>
      <ul>
        { quizzes && quizzes.map(quiz => (
          <li key={quiz.id}>
            {quiz.label}
            { quiz.items && quiz.items.length && (
              <ul>
                {getQuestions(quiz)
                  .map(item => (
                    <li key={item.question}>
                      {item.question}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        )) }
      </ul>
    </div>
  )
}

export default QuestionsList
