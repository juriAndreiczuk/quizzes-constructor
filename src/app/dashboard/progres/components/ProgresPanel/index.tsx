import ProgresList from '@/app/dashboard/progres/components/ProgresList'
import ProgresData from '@/app/dashboard/progres/components/ProgresData'
import Tabs from '@/app/components/ui/Tabs'
import useLogic from '@/app/dashboard/progres/components/ProgresPanel/useLogic'

const ProgresPanel = () => {
  const { filteredQuestions, completedQuestions, userData } = useLogic()

  return (
    <Tabs tabsLabels={['User data', 'Progres history']}>
      <ProgresData
        userData={userData}
      />
      <ProgresList
        completedQuestions={completedQuestions}
        filteredQuestions={filteredQuestions}
      />
    </Tabs>
  )
}

export default ProgresPanel
