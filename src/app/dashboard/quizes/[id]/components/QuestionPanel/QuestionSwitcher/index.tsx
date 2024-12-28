import { IQuestionButton } from '@/types'
import clsx from 'clsx'
import Image from 'next/image'

const QuestionSwitcher = (
  { buttonClick, isSelected, buttonIndex, answerData, isRight }
  : IQuestionButton
) => (
  <div className='sm:px-8 w-full sm:w-1/2'>
    <button
      className={clsx(
        'mb-8 flex flex-col h-full text-center w-full border-[1px]',
        isSelected ? 'border-accent' : 'border-addl'
      )}
      onClick={buttonClick}
    >
      <span className={clsx(
        'h-[3rem] w-full flex justify-center items-center mr-8',
        isSelected ? 'bg-accent shadow-accent' : 'bg-addl opacity-50'
      )}
      >
        { isSelected
          ? <Image src='/assets/check.svg' width={30} height={30} alt='check' />
          : <i className='not-italic text-white text-32 font-bold'>{ buttonIndex + 1 }</i> }
      </span>
      <p className={clsx(
        'text-18 px-16 py-32 w-full',
        isRight ? 'text-green-500' : 'text-white',
        isSelected ? 'font-medium' : 'font-normal'
      )}
      >
        { answerData.info.answer }
      </p>
    </button>
  </div>
)

export default QuestionSwitcher
