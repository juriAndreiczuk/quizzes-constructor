import { IQuestionButton }  from '@/types/components.types'
import Image from 'next/image'

const QuestionSwitcher = ({ buttonClick, isSelected, buttonIndex, answerData, isRight }: IQuestionButton) => (
  <div className='sm:px-8 w-full sm:w-1/2'>
    <button
      className={`mb-8 flex flex-col h-full text-center w-full border-[1px] ${isSelected ? 'border-accent' : 'border-addl'}`}
      onClick={buttonClick}
    >
      <span className={`${isSelected ? 'bg-accent shadow-accent' : 'bg-addl opacity-50'} h-[3rem] w-full flex justify-center items-center mr-8`}>
        { isSelected
          ? <Image src='/assets/check.svg' width={30} height={30} alt='check' />
          : <i className='not-italic text-white text-32 font-bold'>{ buttonIndex + 1 }</i>
        }
      </span>
      <p className={`text-18 ${isRight ? 'text-green-500' : 'text-white' } px-16 py-32 w-full ${isSelected ? 'font-medium' : 'font-normal'}`}>
        { answerData.info.answer }
      </p>
    </button> 
  </div>
)

export default QuestionSwitcher
