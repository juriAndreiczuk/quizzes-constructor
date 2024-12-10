import useQuestionsStore from '@/store/questions.strore'
import QuestionPanel from '@/app/quizzes/components/QuestionPanel'
import useTeamStore from '@/store/users.store'
import { IQuizDetails } from '@/types/question.types'
import { useEffect } from 'react'

const QuestionsList = ({ currentQuiz }: { currentQuiz: IQuizDetails }) => {
  const { getQuestionsByQuiz, fetchQuestions } = useQuestionsStore()
  const { currentUser } = useTeamStore()

  const allQuestions = getQuestionsByQuiz(currentQuiz)
  const newQuestions = !currentUser?.progres ? allQuestions : allQuestions.filter(item => 
    item &&  item.id && !currentUser?.progres[item.id]
  )
  const currentIndex = allQuestions.length - newQuestions.length + 1 

  useEffect(() => {
    fetchQuestions()
  }, [ currentQuiz ])

  return (
    <div>
      <h1 className='text-34 font-bold text-main'>{ currentQuiz.label }</h1>
      {
        currentIndex <= allQuestions.length && (
          <p className='text-16 font-light text-deark'>{currentIndex}/{allQuestions.length} question</p>
        )
      }
      { currentQuiz.items ? (
        newQuestions.length ? 
        <QuestionPanel
          questionData={newQuestions[0]}
        /> : <p>Quiz completed</p>
      ) : (<p>Questions not founded</p>)
      }
    </div>
  )
}

export default QuestionsList
