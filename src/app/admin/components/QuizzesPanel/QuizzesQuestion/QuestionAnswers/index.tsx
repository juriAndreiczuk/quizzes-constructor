import { FieldArray, Field } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import useQuestionsStore from '@/store/questions.strore'
import contentData from '@/content/quizzes.json'
import { IQuestionDetails } from '@/types/question.types'

const QuestionAnswers = ({ formValues }: { formValues: IQuestionDetails }) => {
  const { selectedQuestion } = useQuestionsStore()
  return selectedQuestion && (
    <>
      <p>{contentData.form.answersLabel}</p>
      <FieldArray name="answers">
        {({ push, remove }) => (
          <div>
            {formValues.answers && formValues.answers.map((_, n) => (
              <div key={n}>
                <FormInput
                  inputData={{
                    label: `${contentData.form.answerLabel} ${n + 1}:`,
                    name: `answers.${n}.answer`,
                    type: 'text'
                  }}
                />
                <div>
                  <Field type="checkbox" name={`answers.${n}.right`} />
                  {contentData.form.correctAnswer}
                </div>
                <button type="button" onClick={() => remove(n)}>{contentData.form.removeAnswer}</button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => push({ answer: '', right: false })}
            >
              {contentData.form.addAnswer}
            </button>
          </div>
        )}
      </FieldArray>
    </>
  )
}

export default QuestionAnswers
