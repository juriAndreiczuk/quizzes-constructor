'use client'

import { createTeam } from '@/services/teams.service'
import teamsData from '@/content/teams.json'
import { ITeam } from '@/types/team.types'
import { AlertKind } from '@/types/alert.types'
import { IFormContent } from '@/types/auth.types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/components/TeamsForm/validationSchema'
import useAlertStore from '@/store/alert.store'

const formData = teamsData.form as IFormContent

const TeamsForm = () => {
  const setAlert = useAlertStore(state => state.setAlert)

  const handleSubmit = async (values: ITeam, { resetForm }: FormikHelpers<ITeam>) => {
    const newTeamValues: ITeam = { ...values, members: [] }

    await createTeam(newTeamValues, (val: string) => {
      setAlert({ message: val, kind: AlertKind.Error, show: true })
    })

    resetForm()
  }

  return (
    <div>
      <h2>{teamsData.title}</h2>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          {Object.keys(formData.fields).map((key: string, n: number) => {
            const field = formData.fields[key]

            return (
              <FormInput key={`${field.name}--${n}`} inputData={field} />
            )
          })}
          <button type="submit">{formData.button}</button>
        </Form>
      </Formik>
    </div>
  )
}

export default TeamsForm
