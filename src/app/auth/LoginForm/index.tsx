'use client'

import { userAuth } from '@/services/auth.service'
import { Field, Form, Formik } from 'formik'
import { IAuthLogin, AuthMode } from '@/types/auth.types'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'

const LoginForm = () => {
  const router = useRouter()
  const handleSubmit = async (values: IAuthLogin) => {
    await userAuth(values, AuthMode.Login)
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
