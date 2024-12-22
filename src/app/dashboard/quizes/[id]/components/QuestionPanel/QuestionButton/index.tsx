import { IQuestionKind } from '@/types/question.types'
import { IQuestionButton }  from '@/types/components.types'
import Image from 'next/image'

const QuestionButton = ({ buttonClick, isSelected, buttonIndex, answerData, isRight }: IQuestionButton) => (
  <button
    className='flex items-start sm:items-center mb-16 sm:mb-8 text-left'
    onClick={buttonClick}
  >
    <span className={`${isSelected ? 'bg-accent shadow-accent' : 'bg-addl opacity-70'} ${answerData.kind !== IQuestionKind.Checkbox ? 'rounded-full' : ''} h-[2rem] sm:h-[3rem] w-[2rem] sm:w-[3rem] flex justify-center items-center mr-8`}>
      { isSelected
        ? <Image src='/assets/check.svg' width={20} height={20} alt='check' />
        : <i className='not-italic text-white text-14 sm:text-20 font-bold'>{ buttonIndex + 1 }</i>
      }
    </span>
    <p className={`text-18 ${isRight ? 'text-green-500' : 'text-white' } sm:mx-16 ${isSelected ? 'font-medium' : 'font-normal'}`}>
      { answerData.info.answer }
    </p>
  </button> 
)

export default QuestionButton
