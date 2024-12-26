import { IQuestionProgres } from '@/types'

const ProgresItem = ({ itemData, itemIndex }: { itemData: IQuestionProgres, itemIndex: number }) => (
  <li
    className={`my-16 ${itemIndex && 'border-t-[1px] border-addl pt-16' } sm:mx-16`}
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