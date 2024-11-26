import { logOut } from '@/services/auth.service'
import useUserStore from '@/store/userStore'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'

const UserProfile = () => {
  const user = useUserStore(state => state.user)
  const router = useRouter()

  const handleLogOut = async () => {
    await logOut()
    router.push(Routes.Auth)
  }

  return user && (
    <div>
      <dl>
        <dt>Name</dt>
        <dd>{user.displayName}</dd>
        <dt>Team</dt>
        <dd>{user.teamId}</dd>
        <dt>Points</dt>
        <dd>{user.points}</dd>
      </dl>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default UserProfile
