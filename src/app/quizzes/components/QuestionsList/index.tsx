import useQuestions from '@/app/hooks/useQuestions'
import QuestionPanel from '@/app/quizzes/components/QuestionPanel'
import { IQuizDetails } from '@/types/question.types'
import Button from '@/app/components/ui/Button'

const QuestionsList = ({ currentQuiz }: { currentQuiz: IQuizDetails }) => {
  const { allQuestions, newQuestions, currentIndex, currentProgres } = useQuestions(currentQuiz)

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='text-34 font-bold text-main'>{ currentQuiz.label }</h1>
        <Button
          btnLink='/'
          btnMod='accent-small'
        >
          Return to Quizes list
        </Button>
      </div>
      {
        currentIndex <= allQuestions.length && (
          <p className='text-16 font-light text-deark'>Progres: {currentProgres}%</p>
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
