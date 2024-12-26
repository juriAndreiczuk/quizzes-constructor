import useQuestions from '@/app/hooks/useQuestions'
import QuestionPanel from '@/app/dashboard/quizes/[id]/components/QuestionPanel'
import { IQuizDetails } from '@/types'
import PageIntro from '@/app/components/layout/PageIntro'

const QuestionsList = ({ currentQuiz }: { currentQuiz: IQuizDetails }) => {
  const { allQuestions, newQuestions, currentIndex, currentProgres } = useQuestions(currentQuiz)

  return (
    <div>
      <PageIntro
        introTitle={ currentQuiz.label }
        introIcon='/assets/task-list.svg'
        introButton={{ url: '/dashboard/quizes', label: 'Return to Quizes list' }}
      />
      {
        currentIndex <= allQuestions.length && (
          <>
            <p className='text-20 font-light text-white'>Progres: <span className='font-normal text-accent'>{currentProgres}%</span></p>
            <div
              style={{width: `${currentProgres}.1%` }}
              className={`h-[4px] transition-all from-white to-addl bg-gradient-to-r mt-16`}
            ></div>
          </>
        )
      }
      { currentQuiz.items ? (
        newQuestions.length ? 
        <QuestionPanel
          questionData={newQuestions[0]}
        /> : <p className='text-34 text-center text-white font-bold mt-32'>Quiz completed !</p>
      ) : (<p className='text-16 text-white font-bold mt-32'>Questions not founded</p>)
      }
    </div>
  )
}

export default QuestionsList
