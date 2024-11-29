import { Form, Formik } from 'formik'
import FormInput from '@/app/components/ui/FormInput'
// import schema from '@/app/components/TeamsForm/validationSchema'
import contentData from '@/content/teams.json'
import { ITeam, IUpdateOperation } from '@/types/team.types'
import { IUserDetails } from '@/types/user.types'
import { updateDocument } from '@/services/docs.service'
import { updateTeamMembers } from '@/services/teams.service'

const TeamsUser = ({ teamsList, userData }: { teamsList: ITeam[], userData: IUserDetails }) => {
  const handleSubmit = async (values: { displayName: string, teamId: string }) => {
    if (userData.displayName !== values.displayName || userData.teamId !== values.teamId) {
      if (userData.id) {
        updateTeamMembers(userData.teamId, userData.id, IUpdateOperation.Remove)
        updateTeamMembers(values.teamId, userData.id, IUpdateOperation.Add)
        updateDocument({ ...values }, 'users', userData.id)
      }
    }
  }
  const content = contentData.userEdit

  return (
    <div>
      <h3>{content.title}</h3>
      <Formik
        initialValues={{ displayName: userData.displayName, teamId: userData.teamId }}
        onSubmit={handleSubmit}
        // validationSchema={schema}
      >
        <Form>
          <FormInput inputData={content.form.fields.displayName} />
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
