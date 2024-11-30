'use client'

import { useTeamsCollectionStore } from '@/store/collections.store'
import teamsData from '@/content/teams.json'
import { ITeam } from '@/types/user.types'
import { IFormContent } from '@/types/auth.types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/admin/components/TeamsPanel/TeamsForm/validationSchema'

const formData = teamsData.form as IFormContent

const TeamsForm = () => {
  const { createItem: createTeam } = useTeamsCollectionStore()

  const handleSubmit = async (values: ITeam, { resetForm }: FormikHelpers<ITeam>) => {
    const newTeamValues: ITeam = { ...values, members: [] }
    await createTeam(newTeamValues)

    resetForm()
  }

  return (
    <div>
      <h4>{teamsData.title}</h4>
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
