'use client'

import { useRouter } from 'next/navigation'
import { Form, Formik, FormikProps } from 'formik'
import Image from 'next/image'
import { userAuth } from '@/services/auth.service'
import {
  IAuthForm, AuthMode, UserTypes, IAuthLogin, IAuthRegister
} from '@/types'
import Routes from '@/constants/routes'
import FormInput from '@/app/components/ui/FormInput'
import Button from '@/app/components/ui/Button'
import ContentCard from '@/app/components/layout/ContentCard'

const AuthForm = (
  { mode, startValues, formContent, validation }
  : IAuthForm
) => {
  const router = useRouter()

  const handleSubmit = async (values: IAuthLogin | IAuthRegister) => {
    const userData = 'userType' in values && mode === AuthMode.Registration ? {
      ...values,
      teamId: values.userType === UserTypes[0] ? UserTypes[0] : values.teamId
    } : { ...values }
    await userAuth(userData, mode)
    router.push(Routes.Dashboard)
  }

  return (
    <>
      <div className='text-center mb-32 flex justify-center items-center'>
        <h1 className='text-34 font-medium text-light mr-16'>{ AuthMode[mode] }</h1>
        <Image src='/assets/user.svg' alt='user' width={30} height={30} />
      </div>
      <Formik
        initialValues={startValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        { (props: FormikProps<IAuthLogin | IAuthRegister>) => (
          <ContentCard cardClasses='w-full sm:w-3/5 mx-auto'>
            <Form>
              {Object.keys(formContent.fields).map((key: string, n: number) => {
                const field = formContent.fields[key]

                return field.type !== 'select' ? (
                  <FormInput key={`${field.name}--${n}`} inputData={field} />
                ) : (
                  'userType' in props.values
                  && props.values.userType === UserTypes[0]
                  && field.name === 'teamId' ? '' : (
                    <FormInput key={field.name} inputData={field}>
                      <option value="" disabled>{field.label}</option>
                      { 'options' in field && field.options?.map(opt => (
                        <option key={`${opt.name}-option--${opt.id}`} value={opt.id}>{opt.name}</option>
                      )) }
                    </FormInput>
                    )
                )
              }) }
              <div className='mt-32'>
                <Button>{formContent.button}</Button>
              </div>
            </Form>
          </ContentCard>
        )}
      </Formik>
    </>
  )
}

export default AuthForm
