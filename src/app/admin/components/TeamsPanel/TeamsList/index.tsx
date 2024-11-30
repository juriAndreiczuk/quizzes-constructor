'use client'

import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import { IUserDetails, ITeam } from '@/types/user.types'

const TeamsList = () => {
  const { items: teams, removeItem: removeTeam } = useTeamsCollectionStore()
  const { setSelectedUser, users } = useUsersStore()

  const getMembers = (team: ITeam): IUserDetails[] => (
    users.length ? users.filter(user => user.teamId === team.id) : []
  )

  return (
    <ul>
      { teams && teams.map(team => (
        <li key={team.id}>
          {team.name}
          {!getMembers(team).length && (
            <button
              onClick={() => { team.id && removeTeam(team.id) }}
            >
              Delete
            </button>
          )}
          { team.members && team.members.length && (
            <ul>
              {getMembers(team)
                .map(user => (
                  <li key={user.displayName}>
                    {user.displayName}
                    <button onClick={() => setSelectedUser(user)}>Edit</button>
                  </li>
                ))}
            </ul>
          )}
        </li>
      )) }
    </ul>
  )
}

export default TeamsList
