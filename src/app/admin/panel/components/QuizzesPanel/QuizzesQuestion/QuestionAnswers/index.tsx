import { FieldArray, Field } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import useQuestionsStore from '@/store/questions.strore'
import contentData from '@/content/quizzes.json'
import { IQuestionDetails } from '@/types'
import Button from '@/app/components/ui/Button'

const QuestionAnswers = ({ formValues }: { formValues: IQuestionDetails }) => {
  const { selectedQuestion } = useQuestionsStore()
  return selectedQuestion && (
    <>
      <p className='my-16 text-27 font-bold text-white'>{contentData.form.answersLabel}</p>
      <FieldArray name="answers">
        {({ push, remove }) => (
          <div className='mb-32'>
            {formValues.answers && formValues.answers.map((_, n) => (
              <div key={n} className='mb-16'>
                <FormInput
                  inputData={{
                    label: `${contentData.form.answerLabel} ${n + 1}:`,
                    name: `answers.${n}.answer`,
                    type: 'text'
                  }}
                />
                <div className='mb-8 flex items-center'>
                  <Field type="checkbox" name={`answers.${n}.right`} />
                  <span className='px-8 text-16 text-white font-medium'>{contentData.form.correctAnswer}</span>
                </div>
                <Button
                  btnMod='accent-small'
                  buttonClick={() => remove(n)}
                >
                  {contentData.form.removeAnswer}
                </Button>
              </div>
            ))}
            <Button
              btnMod='primary-small'
              buttonClick={() => push({ answer: '', right: false })}
            >
              {contentData.form.addAnswer}
            </Button>
          </div>
        )}
      </FieldArray>
    </>
  )
}

export default QuestionAnswers
