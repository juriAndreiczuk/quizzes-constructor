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
              className='col-span-1 block w-full bg-light rounded-xl'
            >
              <div className="flex flex-col justify-between w-full p-16 h-full">
                <div>
                  <h3 className='text-20 uppercase text-dark font-medium'>{ quizz.label }</h3>
                  <p className='text-12 text-dark font-light my-16'>{quizz.description}</p>
                </div>
                <div className='flex justify-end'>
                  <Button btnLink='#' btnMod='primary-small'>Show more</Button>
                </div>
              </div>
            </li>
          )) }
        </ul>
      )}
    </section>
  )
}

export default QuizzesLinks
