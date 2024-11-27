'use client'

import { useState, useEffect } from 'react'
import { AuthMode } from '@/types/auth.types'
import { UserTypes } from '@/types/user.types'
import { getAllTeams } from '@/services/teams.service'
import useAlertStore from '@/store/alert.store'
import { AlertKind } from '@/types/alert.types'
import { ITeam } from '@/types/team.types'
import formData from '@/content/auth.json'
import AuthForm from './AuthForm'

const Auth = () => {
  const [currentForm, setCurrentForm] = useState(false)
  const [content, setContent] = useState({
    login: formData.forms.login,
    registration: formData.forms.registration
  })

  const setAlert = useAlertStore(state => state.setAlert)

  const getTeams = async () => {
    const teams: ITeam[] = await getAllTeams(
      (val: string) => {
        setAlert({ message: val, kind: AlertKind.Error, show: true })
      }
    )
    if (teams.length) {
      const updContent = { ...content }
      updContent.registration.fields.team.options = teams
      setContent(updContent)
    }
  }

  useEffect(() => {
    getTeams()
  }, [])

  return (
    <>
      {
        currentForm ? (
          <AuthForm
            mode={AuthMode.Login}
            startValues={{ email: '', password: '' }}
            formContent={content.login}
          />
        ) : (
          <AuthForm
            mode={AuthMode.Registration}
            startValues={{ teamId: '', userType: UserTypes[1], displayName: '', email: '', password: '' }}
            formContent={content.registration}
          />
        )
      }
      <button onClick={() => { setCurrentForm(!currentForm) }}>switch</button>
    </>
  )
}

export default Auth
