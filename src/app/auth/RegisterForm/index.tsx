'use client'

import { userAuth } from '@/services/auth.service'
import { Field, Form, Formik } from 'formik'
import { IAuthRegister, AuthMode } from '@/types/auth.types'
import { useRouter } from 'next/navigation'
import Routes from '@/constants/routes'

const RegisterForm = () => {
  const router = useRouter()
  const handleSubmit = async (values: IAuthRegister) => {
    await userAuth(values, AuthMode.Registration)
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
