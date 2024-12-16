import UserProfile from '@/app/components/UserProfile'
import TeamsPanel from '@/app/admin/components/TeamsPanel'
import TestsPanel from '@/app/admin/components/QuizzesPanel'
import Tabs from '@/app/components/ui/Tabs'

const Admin = () => (
  <main className='py-32'>
    <UserProfile />
    <h1 className="text-34 font-bold text-light my-32">Admin panel</h1>
    <Tabs tabsLabels={['Users and teams', 'Quizes and questions']}>
      <TeamsPanel />
      <TestsPanel />
    </Tabs>
  </main>
)

export default Admin
