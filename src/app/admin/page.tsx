import UserProfile from '@/app/components/UserProfile'
import TeamsList from '@/app/components/TeamsList'
import TeamsForm from '@/app/components/TeamsForm'

const Admin = () => (
  <main>
    Admin panel
    <UserProfile />
    <TeamsList />
    <TeamsForm />
  </main>
)

export default Admin
