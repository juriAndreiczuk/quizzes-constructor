'use client'

import { useEffect } from 'react'
import { logOut } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { useTeamsCollectionStore, useQuizzesCollectionStore } from '@/store/collections.store'
import UserProfile from '@/app/components/UserProfile'
import QuizzesLinks from '@/app/(home)/components/QuizzesLinks'
import useAuthStore from '@/store/auth.store'
import Routes from '@/constants/routes'

const StatusChecker = () => {
  const user = useAuthStore(state => state.user)
  const router = useRouter()
  const { fetchItems: fetchQuizzes } = useQuizzesCollectionStore()
  const { fetchItems: fetchTeams } = useTeamsCollectionStore()

  const handleLogOut = async () => {
    await logOut()
    router.push(Routes.Auth)
  }

  useEffect(() => {
    fetchTeams()
    fetchQuizzes()
  }, [fetchTeams, fetchQuizzes])

  return (
    <main>
      { user?.isBlocked
        ? (
          <div>
            <p>Your account has been blocked</p>
            <button onClick={handleLogOut}>Logout</button>
          </div>
        )
        : 
        <>
          <UserProfile />
          <QuizzesLinks />
        </>
        }
    </main>
  )
}

export default StatusChecker
