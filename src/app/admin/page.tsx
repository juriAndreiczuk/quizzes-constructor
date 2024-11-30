import UserProfile from '@/app/components/UserProfile'
import TeamsList from '@/app/admin/components/TeamsList'
import TeamsForm from '@/app/admin/components/TeamsForm'

const Admin = () => (
  <main>
    Admin panel
    <UserProfile />
    <TeamsList />
    <TeamsForm />
  </main>
)

export default Admin
