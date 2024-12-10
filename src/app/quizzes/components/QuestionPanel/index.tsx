import Button from '@/app/components/ui/Button'
import { IQuestionDetails, IQuestionAnswer } from '@/types/question.types'
import { useState } from 'react'
import useUsersStore from '@/store/users.store'
import { IUserProgres } from '@/types/user.types'

const QuestionPanel = ({ questionData }: { questionData: IQuestionDetails }) => {
  const [userAnswer, setUserAnswer] = useState<IQuestionAnswer[]>([])
  const { updateUserProgres } = useUsersStore()

  const changeAnswer = (answer: IQuestionAnswer): void => {
    userAnswer.includes(answer) 
      ? setUserAnswer(prev => prev.filter(item => item !== answer))
      : setUserAnswer(prev => [...prev, answer])
  }

  const sendAnswers = (questionID: string | undefined): void => {
    if (!questionID) return

    updateUserProgres({ questionID, answers: userAnswer } as IUserProgres)
    setUserAnswer([])
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
            <span className={`${isSelected ? 'bg-main' : 'bg-addl'} rounded-full h-[3rem] w-[3rem] flex justify-center items-center mr-8`}>
              <i className='not-italic text-white text-32 font-bold'>{ index + 1 }</i>
            </span>
            <p className={`text-16  text-dark ${isSelected ? 'font-medium' : 'font-normal'}`}>{ answer.answer }</p>
          </button>
        )
      })}
      <div className='mt-16 flex justify-end'>
        <Button buttonClick={() => { sendAnswers(questionData.id) }}>Send</Button>
      </div>
    </div>
  )
}

export default QuestionPanel