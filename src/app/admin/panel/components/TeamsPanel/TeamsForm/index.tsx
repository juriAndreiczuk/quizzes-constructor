'use client'

import { useTeamsCollectionStore } from '@/store/collections.store'
import teamsData from '@/content/teams.json'
import { ITeam, IFormContent } from '@/types'
import { Form, Formik, FormikHelpers } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/admin/panel/components/TeamsPanel/TeamsForm/validationSchema'
import Button from '@/app/components/ui/Button'

const formData: IFormContent = teamsData.form

const TeamsForm = () => {
  const { createItem: createTeam } = useTeamsCollectionStore()

  const handleSubmit = async (values: ITeam, { resetForm }: FormikHelpers<ITeam>) => {
    const newTeamValues: ITeam = { ...values, members: [] }
    await createTeam(newTeamValues)

    resetForm()
  }

  return (
    <div className="mb-32">
      <h4 className='text-18 font-bold my-16 text-white'>{teamsData.title}</h4>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          { Object.keys(formData.fields).map((key: string, n: number) => {
            const field = formData.fields[key]

            return (
              <FormInput key={`${field.name}--${n}`} inputData={field} />
            )
          }) }
          <div className='mt-16'>
            <Button btnMod='primary-small'>{formData.button}</Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default TeamsForm
