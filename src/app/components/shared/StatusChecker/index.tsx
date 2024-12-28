'use client'

import { useEffect, ReactNode } from 'react'
import { logOut } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { useTeamsCollectionStore, useQuizzesCollectionStore } from '@/store/collections.store'
import useAuthStore from '@/store/auth.store'
import Routes from '@/constants/routes'
import Button from '@/app/components/ui/Button'

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
            <p className='text-20 font-medium mb-32 text-white'>Your account has been blocked</p>
            <Button
              buttonClick={handleLogOut}
              btnMod='accent'
            >
              Logout
            </Button>
          </div>
        )
        : children }
    </main>
  )
}

export default StatusChecker
