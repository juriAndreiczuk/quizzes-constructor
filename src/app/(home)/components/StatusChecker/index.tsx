'use client'

import { logOut } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import UserProfile from '@/app/components/UserProfile'
import useAuthStore from '@/store/auth.store'
import Routes from '@/constants/routes'

const StatusChecker = () => {
  const user = useAuthStore(state => state.user)
  const router = useRouter()

  const handleLogOut = async () => {
    await logOut()
    router.push(Routes.Auth)
  }

  return (
    <main>
      { user?.isBlocked
        ? (
          <div>
            <p>Your account has been blocked</p>
            <button onClick={handleLogOut}>Logout</button>
          </div>
        )
        : <UserProfile /> }
    </main>
  )
}

export default StatusChecker
