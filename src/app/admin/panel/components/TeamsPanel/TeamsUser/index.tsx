import { Form, Formik, Field } from 'formik'
import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import FormInput from '@/app/components/ui/FormInput'
import schema from '@/app/admin/panel/components/TeamsPanel/TeamsUser/validationSchema'
import contentData from '@/content/teams.json'
import { IUserUpdate } from '@/types/user.types'
import Button from '@/app/components/ui/Button'
import ContentCard from '@/app/components/layout/ContentCard'

const TeamsUser = () => {
  const { items: teams, fetchItems: fetchTeams } = useTeamsCollectionStore()
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
      <div className='fixed w-full h-screen top-0 left-0 overflow-auto'>
        <div className='relative py-32'>
          <div className='absolute bg-main w-full h-full min-h-screen top-0 left-0 z-10 opacity-50'></div>
          <div className='container relative z-20'>
            <ContentCard>
              <div className='flex justify-between mb-16'>
                <h3 className='text-27 font-bold text-white'>
                  {content.title}
                </h3>
                <Button
                  btnMod='accent-small'
                  buttonClick={() => setSelectedUser(null)}
                >
                  Close
                </Button>
              </div>
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
                  <div className='flex my-16'>
                    <Field type="checkbox" name={content.form.fields.isBlocked.name} />
                    <span className='px-8 text-16 font-medium text-white'>{content.form.fields.isBlocked.label}</span>
                  </div>
                  <FormInput inputData={content.form.fields.teamId}>
                    <option value="" disabled>{selectedUser.teamId}</option>
                    { teams.length && teams.map(opt => (
                      <option key={`${opt.name}-option--${opt.id}`} value={opt.id}>{opt.name}</option>
                    )) }
                  </FormInput>
                  <div className='mt-32'>
                    <Button>Submit</Button>
                  </div>
                </Form>
              </Formik>
          </ContentCard>
        </div>
      </div>
    </div>
    )
  )
}

export default TeamsUser
