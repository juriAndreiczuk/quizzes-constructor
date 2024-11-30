'use client'

import useQuizzesStore from '@/store/quizzes.store'
import useQuestionsStore from '@/store/questions.strore'
import { IQuestionDetails, IQuizDetails } from '@/types/question.types'

const QuestionsList = () => {
  const { quizzes } = useQuizzesStore()
  const { questions, setSelectedQuestion } = useQuestionsStore()

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
                      <button onClick={() => setSelectedQuestion(item)}>Edit</button>
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
