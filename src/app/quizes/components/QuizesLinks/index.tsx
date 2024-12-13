import { useQuizzesCollectionStore } from '@/store/collections.store'
import QuizesBox from '../QuizesBox'

const QuizesLinks = () => {
  const { items: quizes } = useQuizzesCollectionStore() 

  return quizes && (
    <section>
      { quizes && quizes.length && (
        <ul className='grid grid-cols-4 gap-5'>
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
