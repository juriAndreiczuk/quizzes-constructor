import { IQuestionDetails } from '@/types'
import useUsersStore from '@/store/users.store'
import useLogic from '@/app/dashboard/quizes/[id]/components/QuestionPanel/useLogic'
import ContentCard from '@/app/components/layout/ContentCard'
import QuestionControls from '@/app/dashboard/quizes/[id]/components/QuestionPanel/QuestionControls'
import QuestionButton from '@/app/dashboard/quizes/[id]/components/QuestionPanel/QuestionButton'
import QuestionSwitcher from '@/app/dashboard/quizes/[id]/components/QuestionPanel/QuestionSwitcher'
import { useState } from 'react'

const QuestionPanel = ({ questionData }: { questionData: IQuestionDetails }) => {
  const [result, setResult] = useState<null | { amount: number | string, show: boolean }>(null)

  const { updateUserProgres } = useUsersStore()
  const { userAnswer, answerKind, changeAnswer, pointsCounter } = useLogic(questionData)

  const sendAnswers = (questionID: string | undefined): void => {
    if (!questionID) return
  
    const { points: answerPoints, percents } =  pointsCounter()
    setResult({ show: true, amount: percents })

    setTimeout(() => {
      updateUserProgres({ [questionID]: userAnswer }, answerPoints)
      changeAnswer()
      setResult(null)
    }, 2000)
  }

  return (
    <ContentCard key={questionData.id} cardClasses='my-16'>
      <div className='flex items-center mb-32 sm:mb-16 fle-col flex-wrap sm:flex-row sm:justify-between'>
        <h2 className='text-20 w-3/4 font-bold text-white mr-16'>{ questionData.question }</h2>
        <small className='text-14 font-bold text-dark block mt-16 sm:mt-0 py-8 px-16 bg-white border-[1px] border-accent shadow-accent rounded-md'>{questionData.cost} points</small>
      </div>
      <div className={questionData.answers.length > 2 ? 'block' : 'sm:flex flex-wrap'}>
        { questionData.answers && questionData.answers.map((answer, index) => {
          const Component = questionData.answers.length > 2 ? QuestionButton : QuestionSwitcher
          return (
            <Component
              key={answer.answer}
              buttonClick={() => { changeAnswer(answer) }}
              isSelected={userAnswer.includes(answer)}
              buttonIndex={index}
              answerData={{ info: answer, kind: answerKind }}
              isRight={result?.show && answer.right}
            />
          )
        })}
      </div>
      <QuestionControls
        pointsAmount={result?.amount}
        showAlert={result?.show}
        isDisabled={userAnswer.length === 0 || result?.show}
        onClick={() => { sendAnswers(questionData.id) }}
      />
    </ContentCard>
  )
}

export default QuestionPanel
