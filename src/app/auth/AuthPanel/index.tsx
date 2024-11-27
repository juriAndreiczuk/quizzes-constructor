'use client'

import { useState, useEffect } from 'react'
import { AuthMode } from '@/types/auth.types'
import { UserTypes } from '@/types/user.types'
import formData from '@/content/auth.json'
import AuthForm from '@/app/auth/AuthForm'
import useTeams from '@/app/hooks/auth/useTeams'
import _set from 'lodash/set'
import { registrationSchema, loginSchema } from './validationSchema'

const AuthPanel = () => {
  const [currentForm, setCurrentForm] = useState(false)
  const { teams } = useTeams()
  const [content, setContent] = useState({
    login: formData.forms.login,
    registration: formData.forms.registration
  })

  useEffect(() => {
    setContent(prevContent => _set(
      { ...prevContent },
      'registration.fields.team.options',
      teams
    ))
  }, [teams])

  return (
    <>
      {
        currentForm ? (
          <AuthForm
            mode={AuthMode.Login}
            startValues={{ email: '', password: '' }}
            formContent={content.login}
            validation={loginSchema}
          />
        ) : (
          <AuthForm
            mode={AuthMode.Registration}
            startValues={{ teamId: '', userType: UserTypes[1], displayName: '', email: '', password: '' }}
            formContent={content.registration}
            validation={registrationSchema}
          />
        )
      }
      <button onClick={() => { setCurrentForm(!currentForm) }}>switch</button>
    </>
  )
}

export default AuthPanel
