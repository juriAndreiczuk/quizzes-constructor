'use client'

import { useEffect } from 'react'
import useAuthStore from '@/store/auth.store'

const UserInitialize = () => {
  const initializeUser = useAuthStore(state => state.initializeUser)

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  return null
}

export default UserInitialize
