'use client'

import { useEffect } from 'react'
import useUserStore from '@/store/userStore'

const UserInitialize = () => {
  const initializeUser = useUserStore(state => state.initializeUser)

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  return null
}

export default UserInitialize
