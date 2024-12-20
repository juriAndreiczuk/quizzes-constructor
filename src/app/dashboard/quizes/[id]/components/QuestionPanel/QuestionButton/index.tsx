import { IQuestionKind, IQuestionAnswer } from '@/types/question.types'

const QuestionButton = ({ buttonClick, isSelected, buttonIndex, answerData, isRight }: {
  buttonClick: () => void,
  isSelected: boolean,
  buttonIndex: number,
  answerData: { info: IQuestionAnswer, kind: IQuestionKind },
  isRight: boolean | undefined
}) => (
  <button
    className='sm:flex items-center mb-8 text-left'
    onClick={buttonClick}
  >
    <span className={`${isSelected ? 'bg-accent shadow-accent' : 'bg-addl opacity-50'} ${answerData.kind !== IQuestionKind.Checkbox ? 'rounded-full' : ''} h-[3rem] w-[3rem] flex justify-center items-center mr-8`}>
      <i className='not-italic text-white text-32 font-bold'>{ buttonIndex + 1 }</i>
    </span>
    <p className={`text-18 ${isRight ? 'text-green-500' : 'text-white' } mt-16 sm:mt-0 sm:mx-16 ${isSelected ? 'font-medium' : 'font-normal'}`}>
      { answerData.info.answer }
    </p>
  </button> 
)

export default QuestionButton
