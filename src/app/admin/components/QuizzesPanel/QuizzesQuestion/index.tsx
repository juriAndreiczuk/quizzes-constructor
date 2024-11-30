import { Formik, Form } from 'formik'
import useQuestionsStore from '@/store/questions.strore'
import contentData from '@/content/quizzes.json'
import { IQuestionDetails } from '@/types/question.types'
import schema from './validationSchema'
import QuestionFields from './QuestionFields'
import QuestionAnswers from './QuestionAnswers'

const QuizzesQuestion = () => {
  const {
    selectedQuestion, setSelectedQuestion,
    createQuestion, updateQuestion, removeQuestion
  } = useQuestionsStore()

  const handleSubmit = (values: IQuestionDetails) => {
    if (selectedQuestion) {
      const currentOperation = selectedQuestion.id ? updateQuestion : createQuestion
      currentOperation(values)
      setSelectedQuestion(null)
    }
  }

  const handleRemove = () => {
    if (selectedQuestion) {
      removeQuestion()
      setSelectedQuestion(null)
    }
  }

  return selectedQuestion && (
    <div>
      <button onClick={() => setSelectedQuestion(null)}>Close</button>
      <button onClick={() => handleRemove()}>{contentData.form.removeQuestion}</button>
      <Formik
        validationSchema={schema}
        initialValues={{
          question: selectedQuestion.question,
          cost: selectedQuestion.cost,
          answers: selectedQuestion.answers,
          quizId: selectedQuestion.quizId
        }}
        onSubmit={handleSubmit}
      >
        {({ values, isValid }) => (
          <Form>
            <QuestionFields />
            <QuestionAnswers formValues={values} />
            <button type="submit" disabled={!isValid}>{contentData.form.submit}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default QuizzesQuestion
