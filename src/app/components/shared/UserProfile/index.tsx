'use client'

import { logOut } from '@/services/auth.service'
import useAuthStore from '@/store/auth.store'
import useUsersStore from '@/store/users.store'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'
import Button from '@/app/components/ui/Button'
import { useEffect } from 'react'
import Image from 'next/image'

const UserProfile = () => {
  const router = useRouter()
  const user = useAuthStore(state => state.user)

  const { setCurrentUser, currentUser } = useUsersStore()

  const handleLogOut = async () => {
    await logOut()
    router.push(Routes.Auth)
  }

  useEffect(() => { setCurrentUser(user) }, [user])

  return (
    <div className='w-full flex-col items-end'>
      {
        user && (
          <div className='mb-4 w-full hidden md:flex justify-end'>
            <h3 className='font-medium text-light text-18'>User:</h3>
            <p className='font-light pl-8 text-white text-18 capitalize'>{currentUser?.displayName}</p>
          </div>
        )
      }
      <div className='flex justify-end mt-8'>
        <Button
          btnMod='accent-small'
          buttonClick={handleLogOut}
        >
          <span className='hidden sm:block'>Logout</span>
          <Image
            src='/assets/user-white.svg'
            className='sm:ml-8'
            width={20}
            height={20}
            alt='user x'
          />
        </Button>
      </div>
    </div>
  )
}

export default UserProfile
