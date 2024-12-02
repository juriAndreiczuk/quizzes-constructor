'use client'

import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import { IQuestionDetails, IQuizDetails } from '@/types/question.types'

const QuestionsList = () => {
  const { items: quizzes, removeItem: removeQuiz } = useQuizzesCollectionStore()
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
            {!getQuestions(quiz).length && (
              <button
                onClick={() => { quiz.id && removeQuiz(quiz.id) }}
              >
                Delete
              </button>
            )}
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
