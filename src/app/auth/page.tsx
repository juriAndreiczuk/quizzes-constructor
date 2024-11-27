'use client'

import { useState } from 'react'
import { AuthMode } from '@/types/auth.types'
import AuthForm from './AuthForm'

const Auth = () => {
  const [currentForm, setCurrentForm] = useState(false)
  return (
    <>
      {
        currentForm ? (
          <AuthForm
            mode={AuthMode.Login}
            startValues={{ email: '', password: '' }}
            dataType="login"
          />
        ) : (
          <AuthForm
            mode={AuthMode.Registration}
            startValues={{ teamId: 'team1', userType: 'Admin', displayName: '', email: '', password: '' }}
            dataType="registration"
          />
        )
      }
      <button onClick={() => { setCurrentForm(!currentForm) }}>switch</button>
    </>
  )
}

export default Auth
