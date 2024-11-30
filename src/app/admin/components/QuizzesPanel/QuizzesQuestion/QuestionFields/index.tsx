import { IQuizDetails } from '@/types/question.types'
import FormInput from '@/app/components/ui/FormInput'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import contentData from '@/content/quizzes.json'

const QuestionFields = () => {
  const { items: quizzes } = useQuizzesCollectionStore()
  const { selectedQuestion } = useQuestionsStore()
  return selectedQuestion && (
    <>
      <FormInput
        inputData={{ label: 'quiz name', name: 'quizId', type: 'select' }}
      >
        <option value="" disabled>{selectedQuestion.quizId}</option>
        { quizzes.length && quizzes.map((opt : IQuizDetails) => (
          <option key={`${opt.id}--option`} value={opt.id}>{opt.label}</option>
        )) }
      </FormInput>
      <FormInput
        inputData={{
          label: contentData.form.questionLabel,
          name: 'question',
          type: 'text'
        }}
      />
      <FormInput
        inputData={{
          label: contentData.form.costLabel,
          name: 'cost',
          type: 'text'
        }}
      />
    </>
  )
}

export default QuestionFields
