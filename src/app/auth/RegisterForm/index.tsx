'use client'

import { userAuth } from '@/services/auth.service'
import { Field, Form, Formik } from 'formik'
import { IAuthRegister, AuthMode } from '@/types/auth.types'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'
import useAlertStore from '@/store/alert.store'
import { AlertKind } from '@/types/alert.types'

const RegisterForm = () => {
  const router = useRouter()
  const setAlert = useAlertStore(state => state.setAlert)

  const handleSubmit = async (values: IAuthRegister) => {
    await userAuth(values, AuthMode.Registration, (val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })
    router.push(Routes.Home)
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', displayName: '', teamId: '', userType: 'Player'}}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          type="text"
          name="displayName"
          placeholder="name"
        />
        <Field
          type="email"
          name="email"
          placeholder="email"
        />
        <Field
          type="text"
          name="teamId"
          placeholder="team"
        />
        <Field
          type="text"
          name="userType"
          placeholder="type"
        />
        <Field
          type="text"
          name="password"
          placeholder="password"
        />
        <button>Submit</button>
      </Form>
    </Formik>
  )
}

export default RegisterForm
