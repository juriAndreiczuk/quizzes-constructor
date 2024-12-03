'use client'

import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import { IQuestionDetails, IQuizDetails } from '@/types/question.types'
import Button from '@/app/components/ui/Button'

const QuestionsList = () => {
  const { items: quizzes, removeItem: removeQuiz } = useQuizzesCollectionStore()
  const { questions, setSelectedQuestion } = useQuestionsStore()

  const getQuestions = (quiz: IQuizDetails): IQuestionDetails[] => (
    questions.length ? questions.filter(q => q.quizId === quiz.id) : []
  )

  return (
    <div>
      <h4 className='text-18 font-bold'>Questions</h4>
      <ul>
        { quizzes && quizzes.map(quiz => (
          <li
            className='text-14 mt-16 border-t-[1px] pt-16 border-t-addl'
            key={quiz.id}
          >
            <h5 className='font-16 font-bold mb-8'>{quiz.label}</h5>
            {!getQuestions(quiz).length && (
              <Button
                btnMod='accent-small'
                buttonClick={() => { quiz.id && removeQuiz(quiz.id) }}
              >
                Delete
              </Button>
            )}
            { quiz.items && quiz.items.length && (
              <ul>
                {getQuestions(quiz)
                  .map(item => (
                    <li className='flex items-center mb-8' key={item.question}>
                      <span className='font-16 mr-8'>{item.question}</span>
                      <Button
                        btnMod='accent-small'
                        buttonClick={() => setSelectedQuestion(item)}
                      >
                        Edit
                      </Button>
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
