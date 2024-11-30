import { Formik, Form, FieldArray, Field } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import useQuestionsStore from '@/store/questions.strore'
import schema from '@/app/admin/components/QuizzesPanel/QuizzesQuestion/validationSchema'
import contentData from '@/content/quizzes.json'
import useQuizzesStore from '@/store/quizzes.store'
import { IQuiz } from '@/types/quiz.types'

const QuizzesQuestion = () => {
  const {
    selectedQuestion, setSelectedQuestion, updateQuestion, fetchQuestions, removeQuestion
  } = useQuestionsStore()

  const {
    fetchQuizzes, quizzes
  } = useQuizzesStore()

  const handleSubmit = (values: any) => {
    if (selectedQuestion) {
      updateQuestion(values, selectedQuestion)
      setSelectedQuestion(null)
      fetchQuestions()
      fetchQuizzes()
    }
  }

  const handleRemove = () => {
    if (selectedQuestion) {
      removeQuestion()
      setSelectedQuestion(null)
      fetchQuestions()
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
            <FormInput
              inputData={{ label: 'quiz id', name: 'quizId', type: 'select' }}
            >
              <option value="" disabled>{selectedQuestion.quizId}</option>
              { quizzes.length && quizzes.map((opt : IQuiz) => (
                <option key={`${opt.id}--option`} value={opt.id}>{opt.label}</option>
              )) }
            </FormInput>
            <FormInput
              inputData={{ label: contentData.form.questionLabel, name: 'question', type: 'text' }}
            />
            <FormInput
              inputData={{ label: contentData.form.costLabel, name: 'cost', type: 'text' }}
            />
            <p>{contentData.form.answersLabel}</p>
            <FieldArray name="answers">
              {({ push, remove }) => (
                <div>
                  {values.answers && values.answers.map((_, n) => (
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
            <button type="submit" disabled={!isValid}>{contentData.form.submit}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default QuizzesQuestion
