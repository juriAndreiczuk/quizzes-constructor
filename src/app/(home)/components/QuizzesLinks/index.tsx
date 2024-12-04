import { useQuizzesCollectionStore } from '@/store/collections.store'
import Button from '@/app/components/ui/Button'

const QuizzesLinks = () => {
  const { items: quizzes } = useQuizzesCollectionStore() 

  return (
    <section>
      {quizzes && quizzes.length && (
        <ul className='grid grid-cols-4 gap-5'>
          { quizzes.map(quizz => (
            <li
              key={quizz.id}
              className='col-span-1 uppercase block w-full bg-light p-16 rounded-xl'
            >
              <h3 className='text-20 text-dark font-medium mb-16'>{ quizz.label }</h3>
              <div className='flex justify-end'>
                <Button btnLink='#' btnMod='primary-small'>Show more</Button>
              </div>
            </li>
          )) }
        </ul>
      )}
    </section>
  )
}

export default QuizzesLinks
