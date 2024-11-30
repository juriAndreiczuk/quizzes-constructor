import UserProfile from '@/app/components/UserProfile'
import TeamsPanel from '@/app/admin/components/TeamsPanel'
import TestsPanel from '@/app/admin/components/QuizzesPanel'

const Admin = () => (
  <main>
    <h1>Admin panel</h1>
    <UserProfile />
    <TeamsPanel />
    <TestsPanel />
  </main>
)

export default Admin
