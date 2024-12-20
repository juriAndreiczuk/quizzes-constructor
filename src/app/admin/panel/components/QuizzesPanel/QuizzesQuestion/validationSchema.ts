import * as Yup from 'yup'
import messagesData from '@/content/quizzes.json'

const { required, costMin, atLeastOneRight, notAllRight } = messagesData.validation

const answerSchema = Yup.object().shape({
  answer: Yup.string()
    .required(required)
    .min(1, required),
  right: Yup.boolean().required(required),
})

const schema = Yup.object().shape({
  quizId: Yup.string(),
  question: Yup.string()
    .required(required)
    .min(1, required),
  cost: Yup.number()
    .required(required)
    .min(1, costMin),
  answers: Yup.array()
    .of(answerSchema)
    .min(1, required)
    .test('at-least-one-right', atLeastOneRight, answers => answers && answers.some(answer => answer.right))
    .test('not-all-right', notAllRight, answers => answers && answers.some(answer => !answer.right)),
})

export default schema
