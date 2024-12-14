import { Formik, Form } from 'formik'
import useQuestionsStore from '@/store/questions.strore'
import contentData from '@/content/quizzes.json'
import { IQuestionDetails } from '@/types/question.types'
import schema from './validationSchema'
import QuestionFields from './QuestionFields'
import QuestionAnswers from './QuestionAnswers'
import Button from '@/app/components/ui/Button'
import ContentCard from '@/app/components/layout/ContentCard'

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
    <div className='fixed w-full h-screen top-0 left-0 overflow-auto'>
      <div className='relative py-32'>
        <div className='absolute bg-main w-full h-full min-h-screen top-0 left-0 z-10 opacity-50'></div>
        <div className='container relative z-20'>
          <ContentCard>
            <div className='flex justify-between mb-16'>
              <Button
                btnMod='accent-small'
                buttonClick={() => handleRemove()}
              >
                {contentData.form.removeQuestion}
              </Button>
              <Button
                btnMod='primary-small'
                buttonClick={() => setSelectedQuestion(null)}
              >
                Close
              </Button>
            </div>
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
                  <Button btnDisabled={!isValid}>{contentData.form.submit}</Button>
                </Form>
              )}
            </Formik>
          </ContentCard>
        </div>
      </div>
    </div>
  )
}

export default QuizzesQuestion
