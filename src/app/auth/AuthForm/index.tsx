'use client'

import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { Form, Formik, FormikProps } from 'formik'
import { userAuth } from '@/services/auth.service'
import { IAuthLogin, AuthMode, IAuthRegister, IFormContent } from '@/types/auth.types'
import { UserTypes } from '@/types/user.types'
import Routes from '@/constants/routes'
import FormInput from '@/app/components/ui/FormInput'
import Button from '@/app/components/ui/Button'

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

  const handleSubmit = async (values: IAuthLogin | IAuthRegister) => {
    const userData = 'userType' in values && mode === AuthMode.Registration ? {
      ...values,
      teamId: values.userType === UserTypes[0] ? UserTypes[0] : values.teamId
    } : { ...values }
    await userAuth(userData, mode)
    router.push(Routes.Home)
  }

  return (
    <Formik
      initialValues={startValues}
      validationSchema={validation}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<any>) => (
        <Form className='w-full sm:w-2/3 mx-auto bg-light my-32 p-16 sm:p-32 rounded-xl'>
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
          <div className='mt-16'>
            <Button>{formContent.button}</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AuthForm
