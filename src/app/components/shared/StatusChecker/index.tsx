'use client'

import { useEffect, ReactNode } from 'react'
import { logOut } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { useTeamsCollectionStore, useQuizzesCollectionStore } from '@/store/collections.store'
import useAuthStore from '@/store/auth.store'
import Routes from '@/constants/routes'

const StatusChecker = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore()
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
        : children
        }
    </main>
  )
}

export default StatusChecker
