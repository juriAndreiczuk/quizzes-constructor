import Button from '@/app/components/ui/Button'
import { IQuestionDetails, IQuestionKind } from '@/types/question.types'
import useUsersStore from '@/store/users.store'
import useLogic from '@/app/quizzes/components/QuestionPanel/useLogic'
import { IUserProgres } from '@/types/user.types'

const QuestionPanel = ({ questionData }: { questionData: IQuestionDetails }) => {
  const { updateUserProgres } = useUsersStore()
  const { userAnswer, answerKind, changeAnswer } = useLogic(questionData)

  const sendAnswers = (questionID: string | undefined): void => {
    if (!questionID) return

    updateUserProgres({ questionID, answers: userAnswer } as IUserProgres)
    changeAnswer()
  }

  return (
    <div key={questionData.id} className='bg-light p-16 rounded-xl my-8'>
      <div className='flex items-center mb-16 justify-between'>
        <h2 className='text-20 font-bold text-dark'>{ questionData.question }</h2>
        <small className='text-14 font-bold text-dark block ml-16 py-8 px-16 bg-white border-[1px] border-addl rounded-3xl'>{questionData.cost} points</small>
      </div>
      { questionData.answers && questionData.answers.map((answer, index) => {
        const isSelected = userAnswer.includes(answer)
        return (
          <button
            key={`${questionData.id}-${index}`}
            className='flex items-center mb-8'
            onClick={() => { changeAnswer(answer) }}
          >
            <span className={`${isSelected ? 'bg-main' : 'bg-addl'} ${answerKind !== IQuestionKind.Checkbox ? 'rounded-full' : ''} h-[3rem] w-[3rem] flex justify-center items-center mr-8`}>
              <i className='not-italic text-white text-32 font-bold'>{ index + 1 }</i>
            </span>
            <p className={`text-16  text-dark ${isSelected ? 'font-medium' : 'font-normal'}`}>{ answer.answer }</p>
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
    </div>
  )
}

export default QuestionPanel