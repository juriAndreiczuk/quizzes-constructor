'use client'

import useQuizzesStore from '@/store/quizzes.store'
import quizzesData from '@/content/quizzes.json'
import { IQuizDetails } from '@/types/quiz.types'
import { IFormContent } from '@/types/auth.types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/admin/components/QuizzesPanel/QuizzesForm/validationSchema'

const formData = quizzesData.createForm as IFormContent

const QuizzesForm = () => {
  const { createQuiz } = useQuizzesStore()

  const handleSubmit = async (values: IQuizDetails, { resetForm }: FormikHelpers<IQuizDetails>) => {
    const newQuizValues: IQuizDetails = { ...values, items: [] }
    await createQuiz(newQuizValues)

    resetForm()
  }

  return (
    <div>
      <h4>Create quiz</h4>
      <Formik
        initialValues={{ label: '', items: [] }}
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
          <button type="submit">{formData.button}</button>
        </Form>
      </Formik>
    </div>
  )
}

export default QuizzesForm
