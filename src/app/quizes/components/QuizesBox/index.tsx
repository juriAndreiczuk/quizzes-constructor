import useQuestions from '@/app/hooks/useQuestions'
import Button from '@/app/components/ui/Button'
import { IQuizDetails } from '@/types/question.types'
import ContentCard from '@/app/components/layout/ContentCard'

const QuizesBox = ({ quizData }: { quizData: IQuizDetails }) => {
  const { currentProgres } = useQuestions(quizData)

  return quizData && (
    <ContentCard cardMod='mini' cardClasses='block w-full h-full'>
      <div className="flex flex-col justify-between w-full px-8 h-full">
        <div>
          <p className='text-16 mb-8 text-white font-medium'>Progres: <span className='text-accent'>{currentProgres}%</span></p>
          <h3 className='text-20 uppercase text-light font-medium'>{ quizData.label }</h3>
          <p className='text-12 text-white font-light my-16'>{quizData.description}</p>
        </div>
        <div className='flex justify-end'>
          <Button btnLink={`/quizes/${quizData.id}`} btnMod='primary-small'>Start</Button>
        </div>
      </div>
    </ContentCard>
  )
}

export default QuizesBox
