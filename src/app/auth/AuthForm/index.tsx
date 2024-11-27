'use client'

import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { Form, Formik, FormikProps } from 'formik'
import { userAuth } from '@/services/auth.service'
import useAlertStore from '@/store/alert.store'
import { IAuthLogin, AuthMode, IAuthRegister, IFormContent } from '@/types/auth.types'
import { AlertKind } from '@/types/alert.types'
import { UserTypes } from '@/types/user.types'
import Routes from '@/constants/routes'
import FormInput from '@/app/components/ui/FormInput'

const AuthForm = (
  { mode, startValues, formContent, validation } :
  {
    mode: AuthMode,
    startValues: IAuthLogin | IAuthRegister,
    formContent: IFormContent,
    validation: Yup.Schema
  }
) => {
  const router = useRouter()
  const setAlert = useAlertStore(state => state.setAlert)

  const handleSubmit = async (values: IAuthLogin | IAuthRegister) => {
    const userData = 'userType' in values && mode === AuthMode.Registration ? {
      ...values,
      teamId: values.userType === UserTypes[0] ? UserTypes[0] : values.teamId
    } : { ...values }
    await userAuth(userData, mode, (val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })
    router.push(Routes.Home)
  }

  return (
    <Formik
      initialValues={startValues}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<any>) => (
        <Form>
          {Object.keys(formContent.fields).map((key: string, n: number) => {
            const field = formContent.fields[key]

            return field.type !== 'select' ? (
              <FormInput key={`${field.name}--${n}`} inputData={field} />
            ) : (
              props.values.userType === UserTypes[0] && field.name === 'teamId' ? '' : (
                <FormInput key={field.name} inputData={field}>
                  <option value="" disabled>{field.label}</option>
                  { 'options' in field && field.options?.map(opt => (
                    <option key={`${opt.name}-option--${opt.id}`} value={opt.id}>{opt.name}</option>
                  )) }
                </FormInput>
              )
            )
          })}
          <button>{formContent.button}</button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthForm
