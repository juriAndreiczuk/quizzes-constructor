import { Form, Formik } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/components/TeamsUser/validationSchema'
import contentData from '@/content/teams.json'
import { ITeam } from '@/types/team.types'
import { IUserDetails, IUserUpdate } from '@/types/user.types'
import useUserOperations from '@/app/hooks/useUserOperations'

const TeamsUser = (
  { teamsList, userData, finishEditing }
  : { teamsList: ITeam[], userData: IUserDetails, finishEditing: () => void }
) => {
  const { updateUser } = useUserOperations()

  const handleSubmit = async (values: IUserUpdate) => {
    await updateUser(values, userData)
    finishEditing()
  }

  const content = contentData.userEdit

  return (
    <div>
      <h3>
        {content.title}
        <button onClick={() => finishEditing()}>Close</button>
      </h3>
      <Formik
        initialValues={{
          displayName: userData.displayName,
          teamId: userData.teamId,
          isBlocked: userData.isBlocked || false
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form>
          <FormInput inputData={content.form.fields.displayName} />
          <FormInput inputData={content.form.fields.isBlocked} />
          <FormInput inputData={content.form.fields.teamId}>
            <option value="" disabled>{userData.teamId}</option>
            { teamsList.length && teamsList.map(opt => (
              <option key={`${opt.name}-option--${opt.id}`} value={opt.id}>{opt.name}</option>
            )) }
          </FormInput>
          <button type="submit">submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default TeamsUser
