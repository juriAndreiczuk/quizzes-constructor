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
import ProfileBox from '@/app/components/UserProfile/ProfileBox'

const UserProfile = () => {
  const router = useRouter()
  const user = useAuthStore(state => state.user)
  const { items: teams } = useTeamsCollectionStore()
  const userTeam = teams.filter(team => team.id === user?.teamId)[0]

  const { setCurrentUser, currentUser } = useUsersStore()

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
            <ProfileBox boxLabel='Name' boxText={currentUser?.displayName} />
            <ProfileBox boxLabel='Team' boxText={userTeam?.name || 'Admin'} />
            { userTeam?.name && (
              <ProfileBox boxLabel='Points' boxText={`${currentUser?.points}`} />
            ) }
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
