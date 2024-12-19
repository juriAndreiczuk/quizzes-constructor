import Button from '@/app/components/ui/Button'
import { IQuestionDetails, IQuestionAnswer, IQuestionKind } from '@/types/question.types'
import useUsersStore from '@/store/users.store'
import useLogic from '@/app/quizes/[id]/components/QuestionPanel/useLogic'
import ContentCard from '@/app/components/layout/ContentCard'
import { useState } from 'react'

const QuestionPanel = ({ questionData }: { questionData: IQuestionDetails }) => {
  const [data, setData] = useState<null | { result: number | string, show: boolean }>(null)

  const { updateUserProgres } = useUsersStore()
  const { userAnswer, answerKind, changeAnswer, pointsCounter } = useLogic(questionData)

  const sendAnswers = (questionID: string | undefined): void => {
    if (!questionID) return
  
    const { points: answerPoints, percents } =  pointsCounter()
    setData({ show: true, result: percents })

    setTimeout(() => {
      updateUserProgres({ [questionID]: userAnswer }, answerPoints)
      changeAnswer()
      setData(null)
    }, 2000)
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
            <p className={`text-18 ${data?.show && answer.right ? 'text-green-500' : 'text-white'  } mt-16 sm:mt-0 sm:mx-16 ${isSelected ? 'font-medium' : 'font-normal'}`}>{ answer.answer }</p>
          </button>
        )
      })}
      <div className='mt-16 flex justify-between items-center'>
        <div>
          { data?.show && (
            <div>
              <div className='bg-white py-8 px-16 rounded-xl shadow-accent animate-pulse'>
                <p className='text-16 text-main font-medium'>
                  You receive <span className='text-accent'>{data?.result}%</span> of the points.
                </p>
              </div>
              <div className='h-[.2rem] w-full mt-8 bg-gradient-to-br from-accent to-light animate-loading-line origin-left'></div>
            </div>
          ) }
        </div>
        <Button 
          btnDisabled={ userAnswer.length === 0 || data?.show }
          buttonClick={() => { sendAnswers(questionData.id) }}
        >
          Send
        </Button>
      </div>
    </ContentCard>
  )
}

export default QuestionPanel