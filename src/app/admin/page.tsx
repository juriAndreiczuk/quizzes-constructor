import UserProfile from '@/app/components/UserProfile'
import TeamsPanel from '@/app/admin/components/TeamsPanel'
import TestsPanel from '@/app/admin/components/QuizzesPanel'

const Admin = () => (
  <main>
    Admin panel
    <UserProfile />
    <TeamsPanel />
    <TestsPanel />
  </main>
)

export default Admin
