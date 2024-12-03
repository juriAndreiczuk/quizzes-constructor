'use client'

import { useState, useEffect } from 'react'
import { AuthMode } from '@/types/auth.types'
import { UserTypes, ITeam } from '@/types/user.types'
import Button from '@/app/components/ui/Button'
import formData from '@/content/auth.json'
import AuthForm from '@/app/auth/AuthForm'
import useCollection from '@/app/hooks/useCollection'
import _set from 'lodash/set'
import { getAllDocuments } from '@/services/docs.service'
import { registrationSchema, loginSchema } from './validationSchema'

const AuthPanel = () => {
  const [currentForm, setCurrentForm] = useState(false)

  const teamsService = (): Promise<ITeam[]> => getAllDocuments<ITeam>('teams')

  const teams = useCollection(teamsService) as ITeam[]
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
      <div className='flex justify-center mb-32'>
        <Button
          btnMod='accent'
          buttonClick={() => { setCurrentForm(!currentForm) }}
        >
          Switch
        </Button>
      </div>
    </>
  )
}

export default AuthPanel
