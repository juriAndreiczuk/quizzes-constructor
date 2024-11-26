'use client'

import {
  useState, useContext, useEffect, createContext, ReactNode, useMemo
} from 'react'
import { DocumentData } from 'firebase/firestore'
import { onAuthChange } from '@/services/auth.service'
import { IUserContextProps } from '@/types/user.types'
import { getUserData } from '@/services/user.service'

const UserContext = createContext<IUserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DocumentData | null>(null)
  const [loading, setLoading] = useState(true)

  const setUserData = async (uid: string) => {
    const userData = await getUserData(uid)
    setLoading(false)
    setUser(userData)
  }

  useEffect(() => {
    onAuthChange(data => {
      if(data) {
        setUserData(data.uid)
      }
    })
  }, [])

  const values = useMemo(() => ({ user, loading }), [user, loading])

  return (
    <UserContext.Provider value={values}>
      { children }
    </UserContext.Provider>
  )
}

export const useUser = (): IUserContextProps => {
  const context = useContext(UserContext)
  if (typeof context === 'undefined') {
    throw new Error('useUser must be used within an UserProvider')
  }
  return context
}
