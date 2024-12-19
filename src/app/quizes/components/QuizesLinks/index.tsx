import { useQuizzesCollectionStore } from '@/store/collections.store'
import QuizesBox from '../QuizesBox'
import Button from '@/app/components/ui/Button'

const QuizesLinks = () => {
  const { items: quizes } = useQuizzesCollectionStore() 

  return quizes && (
    <section className='pb-32'>
      { quizes && quizes.length && (
        <ul className='grid md:grid-cols-3 gap-5'>
          { quizes.map((quiz) => (
            quiz && quiz.id && (
              <li
                key={quiz.id}
                className='col-span-1'
              >
               <QuizesBox quizData={quiz} />
              </li>
            )
          )) }
        </ul>
      )}
    </section>
  )
}

export default QuizesLinks
