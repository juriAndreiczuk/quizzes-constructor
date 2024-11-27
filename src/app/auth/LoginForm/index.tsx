'use client'

import { useRouter } from 'next/navigation'
import { Field, Form, Formik } from 'formik'
import { userAuth } from '@/services/auth.service'
import useAlertStore from '@/store/alert.store'
import { IAuthLogin, AuthMode } from '@/types/auth.types'
import { AlertKind } from '@/types/alert.types'
import Routes from '@/constants/routes'

const LoginForm = () => {
  const router = useRouter()
  const setAlert = useAlertStore(state => state.setAlert)

  const handleSubmit = async (values: IAuthLogin) => {
    await userAuth(values, AuthMode.Login, (val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })
    router.push(Routes.Home)
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          type="email"
          name="email"
          placeholder="email"
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

export default LoginForm
