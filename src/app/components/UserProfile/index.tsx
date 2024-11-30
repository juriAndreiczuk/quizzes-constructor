'use client'

import { logOut } from '@/services/auth.service'
import useAuthStore from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'

const UserProfile = () => {
  const user = useAuthStore(state => state.user)
  const router = useRouter()

  const handleLogOut = async () => {
    await logOut()
    router.push(Routes.Auth)
  }

  return (
    <div>
      {
        user && (
          <dl>
            <dt>Name</dt>
            <dd>{user.displayName}</dd>
            <dt>Team</dt>
            <dd>{user.teamId}</dd>
            <dt>Points</dt>
            <dd>{user.points}</dd>
          </dl>
        )
      }
      <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default UserProfile
