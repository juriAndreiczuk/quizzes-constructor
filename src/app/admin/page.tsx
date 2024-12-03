import UserProfile from '@/app/components/UserProfile'
import TeamsPanel from '@/app/admin/components/TeamsPanel'
import TestsPanel from '@/app/admin/components/QuizzesPanel'

const Admin = () => (
  <main className='py-32'>
    <h1 className="text-34 font-bold text-main">Admin panel</h1>
    <UserProfile />
    <TeamsPanel />
    <TestsPanel />
  </main>
)

export default Admin
