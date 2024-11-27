'use client'

import { logOut } from '@/services/auth.service'
import useUserStore from '@/store/user.store'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'
import useAlertStore from '@/store/alert.store'
import { AlertKind } from '@/types/alert.types'

const UserProfile = () => {
  const user = useUserStore(state => state.user)
  const router = useRouter()
  const setAlert = useAlertStore(state => state.setAlert)

  const handleLogOut = async () => {
    await logOut((val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })
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
