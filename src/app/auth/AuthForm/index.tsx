'use client'

import { useRouter } from 'next/navigation'
import { Form, Formik } from 'formik'
import { userAuth } from '@/services/auth.service'
import useAlertStore from '@/store/alert.store'
import { IAuthLogin, AuthMode, IAuthRegister } from '@/types/auth.types'
import { AlertKind } from '@/types/alert.types'
import Routes from '@/constants/routes'

import formData from '@/content/auth.json'
import FormInput from '@/app/components/ui/FormInput'
import validationSchema from '../validationSchema'

const AuthForm = (
  { mode, startValues, dataType } :
  { mode: AuthMode, startValues: IAuthLogin | IAuthRegister, dataType: 'login' | 'registration' }
) => {
  const router = useRouter()
  const setAlert = useAlertStore(state => state.setAlert)

  const handleSubmit = async (values: IAuthLogin) => {
    await userAuth(values, mode, (val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })
    router.push(Routes.Home)
  }

  return (
    <Formik
      initialValues={startValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        { formData.forms[dataType].fields && formData.forms[dataType].fields.map((f, n) => (
          f.type !== 'select' ? (
            <FormInput key={`${f.name}--${n}`} inputData={f} />
          ) : (
            <FormInput key={f.name} inputData={f}>
              <option value="" disabled>{f.label}</option>
              { 'options' in f && f.options?.map(o => (
                <option key={`${o.name}-option--${o.id}`} value={o.id}>{o.name}</option>
              )) }
            </FormInput>
          )))}
        <button>{formData.forms[dataType].button}</button>
      </Form>
    </Formik>
  )
}

export default AuthForm
