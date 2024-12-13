import { IQuestionDetails, IQuestionKind, IQuestionAnswer } from '@/types/question.types'
import { useState, useEffect } from 'react'

const useLogic = (questionData: IQuestionDetails): {
  userAnswer: IQuestionAnswer[]
  answerKind: IQuestionKind
  changeAnswer: (answer?: IQuestionAnswer) => void
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

  useEffect(() => {
    setAnswerKind(getQuestionKind())
  }, [questionData.answers])

  return { userAnswer, answerKind, changeAnswer }
}

export default useLogic
