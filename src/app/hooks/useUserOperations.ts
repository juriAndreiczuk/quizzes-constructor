import { IUserDetails, IUserUpdate } from '@/types/user.types'
import { updateDocument } from '@/services/docs.service'
import { updateTeamMembers } from '@/services/teams.service'
import { IUpdateOperation } from '@/types/team.types'

const useUserOperations = () => {
  const hasUserChanged = (
    values: IUserUpdate,
    userData: IUserDetails,
    elements: (keyof IUserUpdate)[]
  )
  : boolean => elements.some(elt => values[elt] !== userData[elt])

  const updateUser = async (values: IUserUpdate, userData: IUserDetails) => {
    if (
      hasUserChanged(values, userData, ['displayName', 'teamId', 'isBlocked'])
      && userData.id
    ) {
      if (userData.id) {
        await updateTeamMembers(userData.teamId, userData.id, IUpdateOperation.Remove)
        await updateTeamMembers(values.teamId, userData.id, IUpdateOperation.Add)
        await updateDocument({ ...values }, 'users', userData.id)
      }
    }
  }

  return { updateUser }
}

export default useUserOperations
