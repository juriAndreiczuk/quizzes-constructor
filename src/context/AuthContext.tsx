'use client'

import {
  useState, useContext, useEffect, createContext, ReactNode, useMemo
} from 'react'
import { onAuthChange } from '@/services/auth.service'
import { IAuthContextProps, IUser } from '@/types/auth.types'

const AuthContext = createContext<IAuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthChange(data => {
      setUser(data)
      setLoading(false)
    })
  }, [])

  const values = useMemo(() => ({ user, loading }), [user, loading])

  return (
    <AuthContext.Provider value={values}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = (): IAuthContextProps => {
  const context = useContext(AuthContext)
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
