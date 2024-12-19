import UserProfile from '@/app/components/UserProfile'
import TeamsPanel from '@/app/admin/components/TeamsPanel'
import TestsPanel from '@/app/admin/components/QuizzesPanel'
import Tabs from '@/app/components/ui/Tabs'
import PageIntro from '@/app/components/layout/PageIntro'

const Admin = () => (
  <main className='py-32'>
    <UserProfile />
    <PageIntro introTitle='Admin panel' />
    <Tabs tabsLabels={['Users and teams', 'Quizes and questions']}>
      <TeamsPanel />
      <TestsPanel />
    </Tabs>
  </main>
)

export default Admin
