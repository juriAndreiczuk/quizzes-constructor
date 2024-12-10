import useQuestions from '@/app/hooks/useQuestions'
import Button from '@/app/components/ui/Button'
import { IQuizDetails } from '@/types/question.types'

const QuizesBox = ({ quizData }: { quizData: IQuizDetails }) => {
  const { currentProgres } = useQuestions(quizData)

  return quizData && (
    <div className='block w-full h-full bg-light rounded-xl'>
      <div className="flex flex-col justify-between w-full p-16 h-full">
        <div>
          <p>Progres: {currentProgres}%</p>
          <h3 className='text-20 uppercase text-dark font-medium'>{ quizData.label }</h3>
          <p className='text-12 text-dark font-light my-16'>{quizData.description}</p>
        </div>
        <div className='flex justify-end'>
          <Button btnLink={`/quizzes/${quizData.id}`} btnMod='primary-small'>Show more</Button>
        </div>
      </div>
    </div>
  )
}

export default QuizesBox
