import { IQuestionKind, IQuestionButton }  from '@/types'
import clsx from 'clsx'
import Image from 'next/image'

const QuestionButton = (
  { buttonClick, isSelected, buttonIndex, answerData, isRight }
  : IQuestionButton
) => (
  <button
    className='flex items-start sm:items-center mb-16 sm:mb-8 text-left'
    onClick={buttonClick}
  >
    <span className={clsx(
      'h-[2rem] sm:h-[3rem] w-[2rem] sm:w-[3rem] flex justify-center items-center mr-8',
      isSelected ? 'bg-accent shadow-accent' : 'bg-addl opacity-70',
      { 'rounded-full' : answerData.kind !== IQuestionKind.Checkbox }
    )}>
      { isSelected
        ? <Image src='/assets/check.svg' width={20} height={20} alt='check' />
        : <i className='not-italic text-white text-14 sm:text-20 font-bold'>{ buttonIndex + 1 }</i>
      }
    </span>
    <p className={clsx(
      'text-18 sm:mx-16',
      isSelected ? 'font-medium' : 'font-normal',
      isRight ? 'text-green-500' : 'text-white'
    )}>
      { answerData.info.answer }
    </p>
  </button> 
)

export default QuestionButton
