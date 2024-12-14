import Button from '@/app/components/ui/Button'
import { IQuestionDetails, IQuestionKind } from '@/types/question.types'
import useUsersStore from '@/store/users.store'
import useLogic from '@/app/quizes/[id]/components/QuestionPanel/useLogic'
import { IUserProgres } from '@/types/user.types'
import ContentCard from '@/app/components/layout/ContentCard'
const QuestionPanel = ({ questionData }: { questionData: IQuestionDetails }) => {
  const { updateUserProgres } = useUsersStore()
  const { userAnswer, answerKind, changeAnswer } = useLogic(questionData)

  const sendAnswers = (questionID: string | undefined): void => {
    if (!questionID) return

    updateUserProgres({ questionID, answers: userAnswer } as IUserProgres)
    changeAnswer()
  }

  return (
    <ContentCard key={questionData.id} cardClasses='my-16'>
      <div className='flex items-center mb-16 fle-col flex-wrap sm:flex-row sm:justify-between'>
        <h2 className='text-20 font-bold text-white mr-16'>{ questionData.question }</h2>
        <small className='text-14 font-bold text-dark block mt-16 sm:mt-0 py-8 px-16 bg-white border-[1px] border-accent shadow-accent rounded-3xl'>{questionData.cost} points</small>
      </div>
      { questionData.answers && questionData.answers.map((answer, index) => {
        const isSelected = userAnswer.includes(answer)
        return (
          <button
            key={`${questionData.id}-${index}`}
            className='sm:flex items-center mb-8 text-left'
            onClick={() => { changeAnswer(answer) }}
          >
            <span className={`${isSelected ? 'bg-accent shadow-accent' : 'bg-addl opacity-50'} ${answerKind !== IQuestionKind.Checkbox ? 'rounded-full' : ''} h-[3rem] w-[3rem] flex justify-center items-center mr-8`}>
              <i className='not-italic text-white text-32 font-bold'>{ index + 1 }</i>
            </span>
            <p className={`text-18 text-white mt-16 sm:mt-0 sm:mx-16 ${isSelected ? 'font-medium' : 'font-normal'}`}>{ answer.answer }</p>
          </button>
        )
      })}
      <div className='mt-16 flex justify-end'>
        <Button 
          btnDisabled={ userAnswer.length === 0 }
          buttonClick={() => { sendAnswers(questionData.id) }}
        >
          Send
        </Button>
      </div>
    </ContentCard>
  )
}

export default QuestionPanel