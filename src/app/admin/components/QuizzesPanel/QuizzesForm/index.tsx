'use client'

import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import quizzesData from '@/content/quizzes.json'
import { IQuizDetails } from '@/types/question.types'
import { IFormContent } from '@/types/auth.types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/admin/components/QuizzesPanel/QuizzesForm/validationSchema'
import Button from '@/app/components/ui/Button'

const formData = quizzesData.createForm as IFormContent

const QuizzesForm = () => {
  const { createItem: createQuiz, items: quizzes } = useQuizzesCollectionStore()
  const { setSelectedQuestion } = useQuestionsStore()

  const handleSubmit = async (values: IQuizDetails, { resetForm }: FormikHelpers<IQuizDetails>) => {
    const newQuizValues: IQuizDetails = { ...values, items: [] }
    await createQuiz(newQuizValues)

    resetForm()
  }

  return (
    <div className='mb-16'>
      <div className='mb-16 border-b-[1px] pb-16 border-b-addl'>
        <h4 className='text-18 font-bold my-16 text-white'>Create quiz</h4>
        <Formik
          initialValues={{ label: '', description: '', items: [] }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form>
            {Object.keys(formData.fields).map((key: string, n: number) => {
              const field = formData.fields[key]

              return (
                <FormInput key={`${field.name}--${n}`} inputData={field} />
              )
            })}
            <div className='mt-16'>
              <Button btnMod='primary-small'>{formData.button}</Button>
            </div>
          </Form>
        </Formik>
      </div>
      <Button
        btnMod='primary-small'
        buttonClick={
        () => {
          quizzes.length && quizzes[0].id && setSelectedQuestion({
            quizId: quizzes[0].id, question: '', cost: 0, answers: []
          })
        }
      }
      >
        + New question
      </Button>
    </div>
  )
}

export default QuizzesForm
