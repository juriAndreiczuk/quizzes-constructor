'use client'

import { useEffect } from 'react'
import useAuthStore from '@/store/auth.store'

const UserInitialize = () => {
  const { initializeUser } = useAuthStore()

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  return null
}

export default UserInitialize
