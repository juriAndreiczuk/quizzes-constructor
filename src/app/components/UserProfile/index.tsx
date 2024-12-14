'use client'

import { logOut } from '@/services/auth.service'
import useAuthStore from '@/store/auth.store'
import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'
import Button from '@/app/components/ui/Button'
import { useEffect } from 'react'
import ContentCard from '@/app/components/layout/ContentCard'

const UserProfile = () => {
  const user = useAuthStore(state => state.user)
  const { items: teams } = useTeamsCollectionStore()
  const { setCurrentUser } = useUsersStore()
  const userTeam = teams.filter(team => team.id === user?.teamId)[0]

  const router = useRouter()

  const handleLogOut = async () => {
    await logOut()
    router.push(Routes.Auth)
  }

  useEffect(() => { setCurrentUser(user) }, [user])

  return (
    <ContentCard cardClasses='flex'>
      {
        user && (
          <div className='text-16 w-2/3'>
            <div className='flex mb-4'>
              <h3 className='font-bold text-white'>Name</h3>
              <p className='font-light px-8 text-white'>{user.displayName}</p>
            </div>
            <div className='flex mb-4'>
              <h3 className='font-bold text-white'>Team</h3>
              <p className='font-light px-8 text-white'>{userTeam?.name}</p>
            </div>
            <div className='flex mb-4'>
              <h3 className='font-bold text-white'>Points</h3>
              <p className='font-light px-8 text-white'>{user.points}</p>
            </div>
          </div>
        )
      }
      <div className='w-1/3 flex justify-end items-start'>
        <Button
          btnMod='accent'
          buttonClick={handleLogOut}
        >
          Logout
        </Button>
      </div>
    </ContentCard>
  )
}

export default UserProfile
