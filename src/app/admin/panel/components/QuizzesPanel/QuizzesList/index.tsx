'use client'

import Tabs from '@/app/components/ui/Tabs'
import { IQuestionDetails } from '@/types'
import { useQuizzesCollectionStore } from '@/store/collections.store'
import useQuestionsStore from '@/store/questions.strore'
import PanelItem from '@/app/admin/panel/components/PanelItem'

const QuestionsList = () => {
  const { items, removeItem } = useQuizzesCollectionStore()
  const { setSelectedQuestion, getQuestionsByQuiz } = useQuestionsStore()

  return (
    <div>
      { items && items.length > 0 && (
        <>
          <h4 className='text-20 font-bold text-white mb-16'>Quizes</h4>
          <Tabs tabsLabels={[...items.map(item => item.label)]}>
            { items.map(item => (
              <PanelItem<IQuestionDetails>
                key={item.id}
                listLabel={item.label}
                listItems={getQuestionsByQuiz(item).map(elt => ({ ...elt, title: elt.question }))}
                listID={item.id}
                listSubitems={item.items}
                listItemSelect={setSelectedQuestion}
                listRemove={removeItem}
              />
            )) }
          </Tabs>
        </>
      ) }
    </div>
  )
}

export default QuestionsList
