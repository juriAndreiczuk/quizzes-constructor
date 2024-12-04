'use client'

import { logOut } from '@/services/auth.service'
import useAuthStore from '@/store/auth.store'
import { useTeamsCollectionStore } from '@/store/collections.store'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'
import Button from '@/app/components/ui/Button'

const UserProfile = () => {
  const user = useAuthStore(state => state.user)
  const { items: teams } = useTeamsCollectionStore()
  const userTeam = teams.filter(team => team.id === user?.teamId)[0]

  const router = useRouter()

  const handleLogOut = async () => {
    await logOut()
    router.push(Routes.Auth)
  }

  return (
    <div className='my-32'>
      {
        user && (
          <div className='text-16 mb-16 bg-light p-16 rounded-xl'>
            <div className='flex mb-4'>
              <h3 className='font-bold '>Name</h3>
              <p className='font-light px-8'>{user.displayName}</p>
            </div>
            <div className='flex mb-4'>
              <h3 className='font-bold '>Team</h3>
              <p className='font-light px-8'>{userTeam?.name}</p>
            </div>
            <div className='flex mb-4'>
              <h3 className='font-bold '>Points</h3>
              <p className='font-light px-8'>{user.points}</p>
            </div>
          </div>
        )
      }
      <Button
        btnMod='accent'
        buttonClick={handleLogOut}
      >
        Logout
      </Button>
    </div>
  )
}

export default UserProfile
