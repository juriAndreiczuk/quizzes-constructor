import { IQuestionKind, IQuestionDetails, IQuestionAnswer } from '@/types'
import { useState, useEffect } from 'react'

const useLogic = (questionData: IQuestionDetails): {
  userAnswer: IQuestionAnswer[]
  answerKind: IQuestionKind
  changeAnswer: (answer?: IQuestionAnswer) => void
  pointsCounter: () => { percents: number, points: number }
} => {
  const [userAnswer, setUserAnswer] = useState<IQuestionAnswer[]>([])
  const [answerKind, setAnswerKind] = useState<IQuestionKind>(IQuestionKind.Swither)

  const changeAnswer = (answer?: IQuestionAnswer): void => {
    if(answerKind !== IQuestionKind.Checkbox || !answer) setUserAnswer([])

    if(!answer) return

    userAnswer.includes(answer) 
      ? setUserAnswer(prev => prev.filter(item => item !== answer))
      : setUserAnswer(prev => [...prev, answer])
  }

  const getQuestionKind = (): IQuestionKind => {
    if (questionData.answers.length <= 2) return IQuestionKind.Swither
  
    return questionData.answers.filter((answer) => answer.right).length > 1
      ? IQuestionKind.Checkbox
      : IQuestionKind.Radio
  }

  const pointsCounter = (): { percents: number, points: number } => {
    const answerCost =  Math.round(questionData.cost / questionData.answers.filter(a => a.right).length)
    const rightAnswers = Math.round(answerCost * userAnswer.filter(a => a.right).length)
    const falseAnswers = Math.round(answerCost * userAnswer.filter(a => !a.right).length)

    const points = rightAnswers - falseAnswers 
    const percents = Math.round(points / questionData.cost * 100)

    return {
      percents: percents < 0 ? 0 : percents,
      points: points < 0 ? 0 : points
    }
  }

  useEffect(() => {
    setAnswerKind(getQuestionKind())
  }, [questionData.answers])

  return { userAnswer, answerKind, changeAnswer, pointsCounter }
}

export default useLogic
