'use client'

import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import Button from '@/app/components/ui/Button'

const QuestionsList = () => {
  const { items: quizzes, removeItem: removeQuiz } = useQuizzesCollectionStore()
  const { setSelectedQuestion, getQuestionsByQuiz } = useQuestionsStore()

  return (
    <div>
      <h4 className='text-20 font-bold text-white'>Quizes</h4>
      <ul>
        { quizzes && quizzes.map(quiz => (
          <li
            className='text-14 mt-16 border-t-[1px] pt-16 border-t-addl'
            key={quiz.id}
          >
            <h5 className='text-20 font-bold mb-8 text-white'>{quiz.label}</h5>
            {!getQuestionsByQuiz(quiz).length && (
              <Button
                btnMod='accent-small'
                buttonClick={() => { quiz.id && removeQuiz(quiz.id) }}
              >
                Delete
              </Button>
            )}
            { quiz.items && quiz.items.length && (
              <ul>
                {getQuestionsByQuiz(quiz)
                  .map(item => (
                    <li className='flex items-center mb-8' key={item.question}>
                      <span className='text-16 text-white mr-16'>{item.question}</span>
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
