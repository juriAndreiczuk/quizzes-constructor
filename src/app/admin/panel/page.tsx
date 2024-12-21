import TeamsPanel from '@/app/admin/panel/components/TeamsPanel'
import TestsPanel from '@/app/admin/panel/components/QuizzesPanel'
import Tabs from '@/app/components/ui/Tabs'
import PageIntro from '@/app/components/layout/PageIntro'

const Panel = () => (
  <main className='py-32'>
    <PageIntro
      introTitle='Admin panel'
      introButton={{ url: '/admin', label: 'Back Home' }}
    />
    <Tabs tabsLabels={['Users and teams', 'Quizes and questions']}>
      <TeamsPanel />
      <TestsPanel />
    </Tabs>
  </main>
)

export default Panel
