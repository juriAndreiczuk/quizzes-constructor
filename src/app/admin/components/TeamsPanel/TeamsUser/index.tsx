import { Form, Formik } from 'formik'
import useTeamsStore from '@/store/teams.store'
import useUsersStore from '@/store/users.store'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/admin/components/TeamsPanel/TeamsUser/validationSchema'
import contentData from '@/content/teams.json'
import { IUserUpdate } from '@/types/user.types'

const TeamsUser = () => {
  const { teams, fetchTeams } = useTeamsStore()
  const { selectedUser, setSelectedUser, updateUser } = useUsersStore()

  const handleSubmit = async (values: IUserUpdate) => {
    if (selectedUser) {
      setSelectedUser(null)
      await updateUser(values, selectedUser)
      await fetchTeams()
    }
  }

  const content = contentData.userEdit

  return (
    selectedUser && (
      <div>
        <h3>
          {content.title}
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </h3>
        <Formik
          initialValues={{
            displayName: selectedUser.displayName,
            teamId: selectedUser.teamId,
            isBlocked: selectedUser.isBlocked || false
          }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          <Form>
            <FormInput inputData={content.form.fields.displayName} />
            <FormInput inputData={content.form.fields.isBlocked} />
            <FormInput inputData={content.form.fields.teamId}>
              <option value="" disabled>{selectedUser.teamId}</option>
              { teams.length && teams.map(opt => (
                <option key={`${opt.name}-option--${opt.id}`} value={opt.id}>{opt.name}</option>
              )) }
            </FormInput>
            <button type="submit">submit</button>
          </Form>
        </Formik>
      </div>
    )
  )
}

export default TeamsUser
