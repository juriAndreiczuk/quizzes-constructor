import { IQuestionProgres } from '@/types'
import clsx from 'clsx'

const ProgresItem = ({ itemData, itemIndex }: { itemData: IQuestionProgres, itemIndex: number }) => (
  <li
    className={clsx(
      'my-16 sm:mx-16',
      { 'border-t-[1px] border-addl pt-16' : itemIndex }
    )}
  >
    <h2 className='text-27 text-white font-medium'>{itemData.questionData.question}</h2>
    <div className='sm:pl-32'>
      <h3 className='text-20 text-white font-normal my-8'>Your answer: </h3>
      <ul>
        { itemData.progres && itemData.progres.map(({answer}) => (
          <li
            className='text-18 text-light ml-16 pl-8 relative'
            key={answer}
          >
            <span className='absolute top-[.05rem] left-0'>&bull;</span>
            <span className='pl-8'>{answer}</span>
          </li>
        )) }
      </ul>
    </div>
  </li>
)

export default ProgresItem